import { Timestamp } from 'firebase/firestore'

export enum TransactionType {
  CAMBIO_DE_MOEDA = 'cambio',
  DOC_TED = 'doc/ted',
  EMPRESTIMO = 'emprestimo',
  DEPOSITO = 'deposito',
  DEBITO = 'debito',
  CREDITO = 'credito'
}

export interface Transaction {
  id?: string
  userUid: string
  transactionType: TransactionType
  date: Date
  value: number
  createdAt: Timestamp
  updatedAt: Timestamp
}
