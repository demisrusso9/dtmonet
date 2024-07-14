import { Header } from '@/components/Header'
import { Summary } from '@/components/Summary'
import {
  PriceHighlight,
  TableContainer,
  TransactionsContainer,
  TransactionsTable
} from './styles'
import { SearchForm } from '@/components/SearchForm'
import { useTransactions } from '@/hooks/useTransactions'
import { formatPrice } from '@/utils/formatPrice'
import { formatDate } from '@/utils/formatDate'

export function Transactions() {
  const { transactions } = useTransactions()

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TableContainer>
          <TransactionsTable>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td width='50%'>{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}

                      {formatPrice(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{formatDate(transaction.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </TransactionsTable>
        </TableContainer>
      </TransactionsContainer>
    </div>
  )
}
