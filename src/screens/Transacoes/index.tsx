import { Extract, Welcome } from '@/components'
import { Box, Heading, HStack, Text, VStack } from '@/components/ui'
import { ScrollView } from 'react-native'
import Pixels from '@/assets/pixels-servicos.svg'
import { CardTransaction, ModalFilters } from './components'
import { useTransaction } from '@/contexts'
import { useEffect } from 'react'

export function Transacoes() {
  const { transactions, fetchTransactions } = useTransaction()

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <ScrollView
      className="bg-custom-my-light-green"
      showsVerticalScrollIndicator={false}
    >
      <VStack className="flex-1 p-6">
        <Welcome />
        <Box className="bg-custom-my-gray-box py-8 px-6 rounded-lg overflow-hidden mt-6">
          <Pixels
            style={{
              position: 'absolute',
            }}
          />
          <Pixels
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              transform: [{ rotate: '180deg' }],
            }}
          />
          <HStack className="justify-between items-center">
            <Heading className="text-black text-xl font-heading">
              Transações
            </Heading>
            <ModalFilters />
          </HStack>

          <VStack className="gap-4 mt-8">
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <CardTransaction
                  key={transaction.id}
                  transaction={transaction}
                  index={index}
                />
              ))
            ) : (
              <Text className="text-center">
                Nenhuma transação para mostrar.
              </Text>
            )}
          </VStack>
        </Box>
        <Extract />
      </VStack>
    </ScrollView>
  )
}
