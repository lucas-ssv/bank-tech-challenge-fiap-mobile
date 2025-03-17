import { View } from 'react-native'
import { Button, Card, HStack, Text, VStack } from '@/components/ui'
import { ModalUpdateTransaction } from './components'
import Trash from '@/assets/lixeira.svg'
import { Transaction, TransactionDocument } from '@/models'
import { formattedDateTime, formattedMoney } from '@/utils'

type Props = {
  transaction: Transaction & {
    documents?: TransactionDocument[]
    type: string
  }
}

export function CardTransaction({ transaction }: Props) {
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
          <ModalUpdateTransaction />
          <Button className="h-12 w-12 bg-custom-my-dark-green rounded-full p-0">
            <Trash />
          </Button>
        </HStack>
      </HStack>
    </Card>
  )
}
