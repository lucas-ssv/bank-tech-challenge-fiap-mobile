import { Alert, View } from 'react-native'
import { Button, Card, HStack, Text, VStack } from '@/components/ui'
import { ModalUpdateTransaction } from './components'
import Trash from '@/assets/lixeira.svg'
import { Transaction, TransactionDocument } from '@/models'
import { formattedDateTime, formattedMoney } from '@/utils'
import { useTransaction } from '@/contexts'
import { useToast } from '@/hooks'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { useEffect } from 'react'

type Props = {
  transaction: Transaction & {
    documents?: TransactionDocument[]
    type: string
  }
  index: number
}

export function CardTransaction({ transaction, index }: Props) {
  const { removeTransaction } = useTransaction()
  const toast = useToast()

  const opacity = useSharedValue(0)
  const translateY = useSharedValue(20)

  useEffect(() => {
    opacity.value = withDelay(index * 400, withTiming(1, { duration: 500 }))
    translateY.value = withDelay(index * 400, withTiming(0, { duration: 500 }))
  }, [index, opacity, translateY])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }))

  const handleRemoveTransaction = async (transactionId: string) => {
    Alert.alert(
      'Remover transação',
      'Deseja realmente remover esta transação?',
      [
        {
          style: 'cancel',
          text: 'Cancelar',
        },
        {
          style: 'destructive',
          text: 'Remover',
          onPress: async () => {
            try {
              await removeTransaction(transactionId)
              toast('success', 'Transação removida com sucesso!')
            } catch (error) {
              toast(
                'error',
                'Ocorreu um erro ao remover a transação.',
                error.code,
              )
            }
          },
        },
      ],
    )
  }

  return (
    <Animated.View style={[animatedStyle]}>
      <Card variant="elevated">
        <HStack className="justify-between items-end gap-4">
          <VStack className="gap-2">
            <View>
              <Text size="sm" className="text-black">
                Tipo
              </Text>
              <Text className="text-md text-black font-semibold mt-1">
                {transaction.transactionType}
              </Text>
            </View>
            <View>
              <Text size="sm" className="text-black">
                Valor
              </Text>
              <Text
                className={`text-md ${transaction.type === 'income' ? 'text-custom-my-green' : 'text-custom-my-dark-red'} font-semibold mt-1`}
              >
                {transaction.type === 'outcome' ? '-' : '+'}
                {formattedMoney.format(transaction.value)}
              </Text>
            </View>
            <View>
              <Text size="sm" className="text-black">
                Data da transação
              </Text>
              <Text className="text-md text-black font-semibold mt-1">
                {formattedDateTime.format(transaction.date.toDate())}
              </Text>
            </View>
          </VStack>

          <HStack className="justify-end gap-2">
            <ModalUpdateTransaction transaction={transaction} />
            <Button
              className="h-12 w-12 bg-custom-my-dark-green rounded-full p-0"
              onPress={() => handleRemoveTransaction(transaction.id!)}
            >
              <Trash />
            </Button>
          </HStack>
        </HStack>
      </Card>
    </Animated.View>
  )
}
