import { View } from 'react-native'
import { Button, Card, HStack, Text, VStack } from '@/components/ui'
import { ModalUpdateTransaction } from './components'
import Trash from '@/assets/lixeira.svg'

export function CardTransaction() {
  return (
    <Card variant="elevated">
      <HStack className="justify-between items-end">
        <VStack className="gap-2">
          <View>
            <Text size="sm" className="text-black">
              Tipo
            </Text>
            <Text className="text-md text-black font-semibold mt-1">
              Depósito
            </Text>
          </View>
          <View>
            <Text size="sm" className="text-black">
              Valor
            </Text>
            <Text className="text-md text-black font-semibold mt-1">
              R$ 45,00
            </Text>
          </View>
          <View>
            <Text size="sm" className="text-black">
              Data da transação
            </Text>
            <Text className="text-md text-black font-semibold mt-1">
              03/11/2024
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
