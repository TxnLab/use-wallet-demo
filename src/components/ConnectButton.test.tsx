import { render, screen } from '@testing-library/react'
import ConnectButton from '@/components/ConnectButton'
import { truncateAddress } from '@/utils'

describe('ConnectButton', () => {
  it('renders default state', () => {
    render(<ConnectButton setOpen={jest.fn()} activeAddress={undefined} />)

    expect(screen.getByText('Connect wallet')).toBeInTheDocument()
  })

  it('renders connected state', () => {
    const activeAddress = 'mock-active-address'
    const truncatedAddress = truncateAddress(activeAddress) as string

    render(<ConnectButton setOpen={jest.fn()} activeAddress={activeAddress} />)

    expect(screen.getByText(truncatedAddress)).toBeInTheDocument()
  })
})
