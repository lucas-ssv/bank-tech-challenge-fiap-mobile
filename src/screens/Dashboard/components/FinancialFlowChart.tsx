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
import { ComponentProps, useState } from 'react'
import { InputDate } from '@/components'

type Props = ComponentProps<typeof Box>

export function FinancialFlowChart({ ...rest }: Props) {
  const screenWidth = Dimensions.get('window').width
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  return (
    <Box className="flex-1 mx-auto shadow-hard-3" {...rest}>
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
            labels: ['Depósito', 'DOC/TED'],
            datasets: [
              {
                data: [Math.random() * 100, Math.random() * 100],
              },
            ],
          }}
          width={screenWidth - 48}
          height={280}
          yAxisLabel="$"
          yAxisSuffix="k"
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
