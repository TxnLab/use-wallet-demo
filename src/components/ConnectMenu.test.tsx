import { QueryClient } from '@tanstack/react-query'
import { render, screen, fireEvent, act } from '@testing-library/react'
import axios from 'axios'
import ConnectMenu from '@/components/ConnectMenu'
import {
  PROVIDER_ID,
  getActiveAddress,
  mockAccountInfoResponse,
  mockNfdLookupResponse,
  mockProviders
} from '@/test/mocks'
import { renderWithClient } from '@/test/utils'

// Mock default provider state (no active provider)
let providers = mockProviders([
  PROVIDER_ID.DEFLY,
  PROVIDER_ID.PERA,
  PROVIDER_ID.DAFFI,
  PROVIDER_ID.WALLETCONNECT,
  PROVIDER_ID.EXODUS
])

// Mock default account state (no active address)
let activeAddress: string | undefined = undefined

// Mock useWallet hook
jest.mock('@txnlab/use-wallet', () => ({
  useWallet: () => ({
    providers,
    activeAddress
  })
}))

// Mock axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('ConnectMenu', () => {
  it('renders the connect button only when closed', () => {
    render(<ConnectMenu />)

    expect(screen.getByTestId('connect-button')).toBeInTheDocument()
    expect(screen.queryByTestId('connect-menu')).not.toBeInTheDocument()
  })

  describe('when in default state', () => {
    beforeEach(async () => {
      render(<ConnectMenu />)

      // Open the connect menu
      await act(async () => {
        fireEvent.click(screen.getByTestId('connect-button'))
      })
    })

    it('renders the connect button and menu', () => {
      expect(screen.getByTestId('connect-button')).toBeInTheDocument()
      expect(screen.getByTestId('connect-menu')).toBeInTheDocument()
    })

    it('renders the default header', () => {
      expect(
        screen.getByText('Connect a wallet to get started')
      ).toBeInTheDocument()
    })

    it('renders the Provider components', () => {
      expect(screen.getAllByTestId('provider')).toHaveLength(providers.length)
    })

    it('closes the connect menu', async () => {
      await act(async () => {
        fireEvent.click(screen.getByTestId('close-menu'))
      })

      expect(screen.queryByTestId('connect-menu')).not.toBeInTheDocument()
    })
  })

  describe('when in connected state', () => {
    beforeEach(async () => {
      // Active state (active provider)
      providers = mockProviders(
        [
          PROVIDER_ID.DEFLY,
          PROVIDER_ID.PERA,
          PROVIDER_ID.DAFFI,
          PROVIDER_ID.WALLETCONNECT,
          PROVIDER_ID.EXODUS
        ],
        PROVIDER_ID.DEFLY // Active provider
      )

      // Active state (active address)
      activeAddress = getActiveAddress(providers)

      // Stub UserThumbnail requests
      mockedAxios.get
        .mockResolvedValueOnce(mockAccountInfoResponse)
        .mockResolvedValueOnce(mockNfdLookupResponse)

      // Wrap the component in a QueryClientProvider
      const queryClient = new QueryClient()
      renderWithClient(queryClient, <ConnectMenu />)

      // Open the connect menu
      await act(async () => {
        fireEvent.click(screen.getByTestId('connect-button'))
      })
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('renders the connected header', async () => {
      expect(screen.getByTestId('user-thumbnail')).toBeInTheDocument()
    })
  })
})
