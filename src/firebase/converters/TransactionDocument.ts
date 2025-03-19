import { TransactionDocument } from '@/models'
import { DocumentData, FirestoreDataConverter } from 'firebase/firestore'

export const transactionDocumentConverter: FirestoreDataConverter<TransactionDocument> =
  {
    toFirestore: (transactionDocument: TransactionDocument): DocumentData => {
      return {
        transactionId: transactionDocument.transactionId,
        name: transactionDocument.name,
        uri: transactionDocument.uri,
        mimeType: transactionDocument.mimeType,
        createdAt: transactionDocument.createdAt,
        updatedAt: transactionDocument.updatedAt
      }
    },
    fromFirestore: (snapshot, options): TransactionDocument => {
      const data = snapshot.data(options)
      return {
        id: snapshot.id,
        ...data
      } as TransactionDocument
    }
  }
