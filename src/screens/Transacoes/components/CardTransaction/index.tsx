import { Alert, View } from 'react-native'
import { Button, Card, HStack, Text, VStack } from '@/components/ui'
import { ModalUpdateTransaction } from './components'
import Trash from '@/assets/lixeira.svg'
import { Transaction, TransactionDocument } from '@/models'
import { formattedDateTime, formattedMoney } from '@/utils'
import { useTransaction } from '@/contexts'
import { useToast } from '@/hooks'

type Props = {
  transaction: Transaction & {
    documents?: TransactionDocument[]
    type: string
  }
}

export function CardTransaction({ transaction }: Props) {
  const { removeTransaction } = useTransaction()
  const toast = useToast()

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
  )
}
