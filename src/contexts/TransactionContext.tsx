import { db } from '@/firebase/config'
import {
  transactionConverter,
  transactionDocumentConverter,
} from '@/firebase/converters'
import { Transaction, TransactionDocument, TransactionType } from '@/models'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useAuth } from './AuthContext'
import { getIncomeOutcomeTransaction } from '@/utils'

type CardTransactionProps = Transaction & {
  documents?: TransactionDocument[]
  type: string
}

type TransactionUpdateData = {
  transactionType?: TransactionType
  value?: number
  date?: Date
}

type TransactionFilter = {
  transactionType: TransactionType | null | undefined
  minValue: number
  maxValue: number
  date: Date
}

type TransactionContextProps = {
  transactions: CardTransactionProps[]
  fetchTransactions: () => Promise<void>
  fetchFinancialFlow: (startDate: Date, endDate: Date) => Promise<void>
  updateTransaction: (
    transactionId: string,
    data: TransactionUpdateData,
  ) => Promise<void>
  filterTransactions: (data: TransactionFilter) => Promise<void>
  removeTransaction: (transactionId: string) => Promise<void>
}

const TransactionContext = createContext<TransactionContextProps>(
  {} as TransactionContextProps,
)

export function TransactionProvider({ children }: PropsWithChildren) {
  const { user } = useAuth()
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
        throw error
      }
    },
    [],
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
      throw error
    }
  }, [user, fetchTransactionDocuments])

  const fetchFinancialFlow = async (startDate: Date, endDate: Date) => {
    try {
      const transacoesRef = collection(db, 'transactions').withConverter(
        transactionConverter,
      )

      const startTimestamp = Timestamp.fromDate(startDate)
      const endTimestamp = Timestamp.fromDate(endDate)

      const q = query(
        transacoesRef,
        where('userUid', '==', user?.uid),
        where('date', '>=', startTimestamp),
        where('date', '<=', endTimestamp),
      )

      const querySnapshot = await getDocs(q)
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
      console.error('Erro ao buscar transações:', error)
    }
  }

  const updateTransaction = async (
    transactionId: string,
    data: TransactionUpdateData,
  ) => {
    try {
      const { transactionType, value, date } = data
      const transactionRef = doc(
        db,
        'transactions',
        transactionId,
      ).withConverter(transactionConverter)
      await updateDoc(transactionRef, {
        transactionType,
        value,
        date,
      })
    } catch (error) {
      throw error
    }
  }

  const filterTransactions = async (data: TransactionFilter) => {
    try {
      const { transactionType, minValue, maxValue, date } = data
      const transactionsRef = collection(db, 'transactions')

      const startOfDay = new Date(date)
      startOfDay.setHours(0, 0, 0, 0)

      const endOfDay = new Date(date)
      endOfDay.setHours(23, 59, 59, 999)

      const filters = [
        where('userUid', '==', user!.uid),
        where('date', '>=', Timestamp.fromDate(startOfDay)),
        where('date', '<=', Timestamp.fromDate(endOfDay)),
      ]

      if (transactionType) {
        filters.push(where('transactionType', '==', transactionType))
      }

      if (minValue > 0) {
        filters.push(where('value', '>=', minValue))
      }

      if (maxValue > 0) {
        filters.push(where('value', '<=', maxValue))
      }

      const q = query(transactionsRef, ...filters).withConverter(
        transactionConverter,
      )

      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        setTransactions([])
        return
      }

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
      throw error
    }
  }

  const removeTransaction = async (transactionId: string) => {
    try {
      await deleteDoc(doc(db, 'transactions', transactionId))
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    if (!user?.uid) return

    const transactionsRef = collection(db, 'transactions').withConverter(
      transactionConverter,
    )
    const q = query(transactionsRef, where('userUid', '==', user!.uid))
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
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
    })

    return () => unsubscribe()
  }, [user, fetchTransactionDocuments])

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransactions,
        fetchFinancialFlow,
        updateTransaction,
        filterTransactions,
        removeTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransaction = () => {
  const context = useContext(TransactionContext)
  return context
}
