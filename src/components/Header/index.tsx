import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import logoImg from '@/assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '../NewTransactionModal'
import { useState } from 'react'

export function Header() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)

  function handleTransactionModalOpenChange(value: boolean) {
    setIsTransactionModalOpen(value)
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt='' />

        <Dialog.Root
          open={isTransactionModalOpen}
          onOpenChange={handleTransactionModalOpenChange}
        >
          <Dialog.Trigger asChild>
            <NewTransactionButton>nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal
            handleTransactionModalOpenChange={handleTransactionModalOpenChange}
          />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
