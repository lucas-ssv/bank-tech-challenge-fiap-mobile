import {
  Box,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Text,
  VStack,
} from '@/components/ui'
import { BarChart } from 'react-native-chart-kit'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions } from 'react-native'
import { ComponentProps, useEffect, useState } from 'react'
import { InputDate } from '@/components'
import {
  collection,
  getDocs,
  getFirestore,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'
import { useAuth } from '@/contexts'

type Props = ComponentProps<typeof Box>

interface Transacao {
  id: string
  transactionType: string
  value: number
  date: Timestamp
}

export function FinancialFlowChart({ ...rest }: Props) {
  const { user } = useAuth()
  const screenWidth = Dimensions.get('window').width
  const [startDate, setStartDate] = useState<Date>(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })
  const [endDate, setEndDate] = useState<Date>(new Date())

  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const labels = transacoes.map((transacao) => transacao.transactionType)
  const datasets = transacoes.map((transacao) => transacao.value)

  useEffect(() => {
    const fetchTransacoes = async () => {
      try {
        const db = getFirestore()
        const transacoesRef = collection(db, 'transactions')

        const startTimestamp = Timestamp.fromDate(startDate)
        const endTimestamp = Timestamp.fromDate(endDate)

        const q = query(
          transacoesRef,
          where('userUid', '==', user?.uid),
          where('date', '>=', startTimestamp),
          where('date', '<=', endTimestamp),
        )

        const querySnapshot = await getDocs(q)
        const listaTransacoes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Transacao[]

        setTransacoes(listaTransacoes)
      } catch (error) {
        console.error('Erro ao buscar transações:', error)
      }
    }

    if (user?.uid) {
      fetchTransacoes()
    }
  }, [user?.uid, startDate, endDate])

  return (
    <Box className="flex-1 mx-auto shadow-hard-3 mt-6" {...rest}>
      <LinearGradient
        start={[-0.5, 0]}
        end={[1, 0]}
        style={{
          borderRadius: 8,
        }}
        colors={['#fb8c00', '#ffa726']}
      >
        <VStack className="px-4">
          <Text className="text-white text-xl text-center font-heading m-4">
            Fluxo Financeiro
          </Text>
          <FormControl>
            <HStack className="gap-4">
              <VStack className="flex-1">
                <FormControlLabel>
                  <FormControlLabelText className="text-white text-sm">
                    Data inicial
                  </FormControlLabelText>
                </FormControlLabel>
                <InputDate
                  className="bg-custom-my-input-orange"
                  date={startDate}
                  setDate={setStartDate}
                />
              </VStack>
              <VStack className="flex-1">
                <FormControlLabel>
                  <FormControlLabelText className="text-white text-sm">
                    Data final
                  </FormControlLabelText>
                </FormControlLabel>
                <InputDate
                  className="bg-custom-my-input-orange"
                  date={endDate}
                  setDate={setEndDate}
                />
              </VStack>
            </HStack>
          </FormControl>
        </VStack>
        <BarChart
          data={{
            labels,
            datasets: [
              {
                data: datasets,
              },
            ],
          }}
          width={screenWidth - 48}
          height={280}
          yAxisLabel="R$"
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 8,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
              fill: '#FF0000',
            },
          }}
          fromZero
          style={{
            borderRadius: 8,
            marginTop: 16,
          }}
        />
      </LinearGradient>
    </Box>
  )
}
