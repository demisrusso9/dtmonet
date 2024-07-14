import * as Dialog from '@radix-ui/react-dialog'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton
} from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransactions } from '@/hooks/useTransactions'

const schema = z.object({
  description: z.string().min(3).max(200),
  price: z.number(),
  category: z.string().min(3).max(100),
  type: z.enum(['income', 'outcome'])
})

type NewTransactionModalInputs = z.infer<typeof schema>

interface NewTransactionModalProps {
  handleTransactionModalOpenChange: (status: boolean) => void
}

export function NewTransactionModal({
  handleTransactionModalOpenChange
}: NewTransactionModalProps) {
  const { createNewTransaction } = useTransactions()

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm<NewTransactionModalInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'income'
    }
  })

  async function handleCreateNewTransaction(data: NewTransactionModalInputs) {
    const { description, category, price, type } = data

    try {
      await createNewTransaction({
        description,
        category,
        price,
        type
      })

      handleTransactionModalOpenChange(false)
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type='text'
            placeholder='Descrição'
            {...register('description')}
          />

          <input
            type='number'
            placeholder='Preço'
            {...register('price', { valueAsNumber: true })}
          />

          <input
            type='text'
            placeholder='Categoria'
            {...register('category')}
          />

          <Controller
            name='type'
            control={control}
            render={({ field }) => (
              <TransactionType
                onValueChange={field.onChange}
                value={field.value}
              >
                <TransactionTypeButton variant='income' value='income'>
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>

                <TransactionTypeButton variant='outcome' value='outcome'>
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )}
          />

          <button type='submit' disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
