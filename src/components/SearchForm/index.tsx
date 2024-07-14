import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styles'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransactions } from '@/hooks/useTransactions'

const schema = z.object({
  query: z.string()
})

type SearchFormInputs = z.infer<typeof schema>

export function SearchForm() {
  const { fetchTransactions } = useTransactions()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(schema)
  })

  async function handleSearchTransactions({ query }: SearchFormInputs) {
    await fetchTransactions(query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type='text'
        placeholder='Buscar por transações'
        {...register('query')}
      />

      <button type='submit' disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
