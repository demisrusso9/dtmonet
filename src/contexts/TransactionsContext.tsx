import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '@/services/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

type NewTransactionModalInputs = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createNewTransaction: (data: NewTransactionModalInputs) => Promise<void>
}

interface TransactionsContextProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsContextProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    try {
      const response = await api.get('/transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          q: query
        }
      })

      setTransactions(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function createNewTransaction(data: NewTransactionModalInputs) {
    const { description, category, price, type } = data

    try {
      const response = await api.post('/transactions', {
        description,
        category,
        price,
        type,
        createdAt: new Date().toISOString()
      })

      setTransactions(state => [response.data, ...state])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createNewTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
