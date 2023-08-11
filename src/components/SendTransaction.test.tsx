import { render, fireEvent, screen, act } from '@testing-library/react'
import {
  PROVIDER_ID,
  getActiveAddress,
  mockProviders,
  mockTransactionParams
} from '@/test/mocks'
import SendTransaction from '@/components/SendTransaction'

// Mock active provider state
const providers = mockProviders(
  [
    PROVIDER_ID.DEFLY,
    PROVIDER_ID.PERA,
    PROVIDER_ID.DAFFI,
    PROVIDER_ID.WALLETCONNECT,
    PROVIDER_ID.EXODUS
  ],
  PROVIDER_ID.DEFLY
)

// Mock active account state
let activeAddress = getActiveAddress(providers)

const mockSignTransactions = jest.fn()
const mockSendTransactions = jest.fn()

// Mock useWallet hook
jest.mock('@txnlab/use-wallet', () => ({
  useWallet: () => ({
    providers,
    activeAddress,
    signTransactions: mockSignTransactions,
    sendTransactions: mockSendTransactions
  })
}))

// Mock algosdk
jest.mock('algosdk', () => {
  const mockUint8Array = new Uint8Array([1, 2, 3, 4, 5])

  return {
    Algodv2: jest.fn().mockImplementation(() => {
      return {
        getTransactionParams: jest.fn().mockReturnValue({
          do: jest.fn().mockResolvedValue(mockTransactionParams)
        })
      }
    }),
    encodeUnsignedTransaction: jest.fn().mockReturnValue(mockUint8Array),
    makePaymentTxnWithSuggestedParamsFromObject: jest.fn().mockReturnValue({
      id: 'mock_transaction_id'
    })
  }
})

describe('SendTransaction', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('successfully sends a transaction', async () => {
    mockSignTransactions.mockResolvedValueOnce({ txId: 'mock_transaction_id' })
    mockSendTransactions.mockResolvedValueOnce({ id: 'mock_transaction_id' })

    render(<SendTransaction />)

    const button = screen.getByText('Send Transaction')
    await act(async () => {
      fireEvent.click(button)
    })

    const successMessage = await screen.findByText('Transaction sent!')
    expect(successMessage).toBeInTheDocument()

    const confetti = await screen.findByTestId('confetti')
    expect(confetti).toBeInTheDocument()
  })

  it('handles transaction sign failure', async () => {
    // Suppress console.error
    const originalError = console.error
    console.error = jest.fn()

    mockSignTransactions.mockRejectedValueOnce(new Error('Mock sign failure'))

    render(<SendTransaction />)

    const button = screen.getByText('Send Transaction')
    await act(async () => {
      fireEvent.click(button)
    })

    const errorMessage = await screen.findByText('Transaction failed')
    expect(errorMessage).toBeInTheDocument()

    // Restore console.error
    console.error = originalError
  })

  it('handles transaction send failure', async () => {
    // Suppress console.error
    const originalError = console.error
    console.error = jest.fn()

    mockSignTransactions.mockResolvedValueOnce({ txId: 'mock_transaction_id' })
    mockSendTransactions.mockRejectedValueOnce(new Error('Mock send failure'))

    render(<SendTransaction />)

    const button = screen.getByText('Send Transaction')
    await act(async () => {
      fireEvent.click(button)
    })

    const errorMessage = await screen.findByText('Transaction failed')
    expect(errorMessage).toBeInTheDocument()

    // Restore console.error
    console.error = originalError
  })

  it('does not render without an active address', () => {
    activeAddress = undefined

    render(<SendTransaction />)

    const button = screen.queryByText('Send Transaction')
    expect(button).not.toBeInTheDocument()
  })
})
