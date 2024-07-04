import styled from 'styled-components'

interface SummaryCardProps {
  variant?: 'green'
}

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -5rem;   
`

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${({ theme, variant }) => variant === 'green' ? theme['green-500'] : theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme['gray-300']};
  }
  
  strong {
    display: block;
    font-size: 2rem;
    margin-top: 1rem;
    color: ${({ theme }) => theme['gray-100']};
  }
`