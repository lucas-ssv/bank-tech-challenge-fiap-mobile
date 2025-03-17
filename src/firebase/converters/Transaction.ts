import { Transaction } from '@/models'
import { DocumentData, FirestoreDataConverter } from 'firebase/firestore'

export const transactionConverter: FirestoreDataConverter<Transaction> = {
  toFirestore: (transaction: Transaction): DocumentData => {
    return {
      userUid: transaction.userUid,
      transactionType: transaction.transactionType,
      date: transaction.date,
      value: transaction.value,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt
    }
  },
  fromFirestore: (snapshot, options): Transaction => {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      ...data
    } as Transaction
  }
}
