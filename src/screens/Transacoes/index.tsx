import { Extract, Welcome } from '@/components'
import { Box, Heading, HStack, VStack } from '@/components/ui'
import { ScrollView } from 'react-native'
import Pixels from '@/assets/pixels-servicos.svg'
import { CardTransaction, ModalFilters } from './components'
import { useCallback, useEffect, useState } from 'react'
import { Transaction, TransactionDocument } from '@/models'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { useAuth } from '@/contexts'
import {
  transactionConverter,
  transactionDocumentConverter,
} from '@/firebase/converters'
import { useToast } from '@/hooks'
import { getIncomeOutcomeTransaction } from '@/utils'

type CardTransactionProps = Transaction & {
  documents?: TransactionDocument[]
  type: string
}

export function Transacoes() {
  const { user } = useAuth()
  const toast = useToast()
  const [transactions, setTransactions] = useState<CardTransactionProps[]>([])

  const fetchTransactionDocuments = useCallback(
    async (transactionId: string) => {
      try {
        const transactionDocumentsRef = collection(
          db,
          'transaction-documents',
        ).withConverter(transactionDocumentConverter)
        const q = query(
          transactionDocumentsRef,
          where('transactionId', '==', transactionId),
        )
        const querySnapshot = await getDocs(q)
        const transactionDocuments: TransactionDocument[] = []

        querySnapshot.forEach((doc) => {
          const document = doc.data()
          transactionDocuments.push({
            id: doc.id,
            ...document,
          })
        })

        return transactionDocuments
      } catch (error) {
        toast(
          'error',
          'Ocorreu um erro ao buscar os documentos da transação',
          error.code,
        )
        return []
      }
    },
    [toast],
  )

  const fetchTransactions = useCallback(async () => {
    try {
      const transactionsRef = collection(db, 'transactions').withConverter(
        transactionConverter,
      )
      const q = query(transactionsRef, where('userUid', '==', user!.uid))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) return

      const transactions: CardTransactionProps[] = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const transactionId = doc.id
          const transaction = doc.data()
          const type = getIncomeOutcomeTransaction(transaction.transactionType)
          const documents = await fetchTransactionDocuments(transactionId)

          return {
            id: transactionId,
            documents,
            type,
            ...transaction,
          }
        }),
      )

      setTransactions(transactions)
    } catch (error) {
      toast('error', 'Ocorreu um erro ao listar as transações.', error.code)
    }
  }, [user, toast, fetchTransactionDocuments])

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
            {transactions.map((transaction) => (
              <CardTransaction key={transaction.id} transaction={transaction} />
            ))}
          </VStack>
        </Box>
        <Extract />
      </VStack>
    </ScrollView>
  )
}
