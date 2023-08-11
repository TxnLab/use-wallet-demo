import { QueryClient } from '@tanstack/react-query'
import { screen } from '@testing-library/react'
import axios from 'axios'
import UserThumbnail from '@/components/UserThumbnail'
import { mockAccountInfoResponse, mockNfdLookupResponse } from '@/test/mocks'
import { renderWithClient } from '@/test/utils'
import { formatBalance } from '@/utils'

// Mock axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('UserThumbnail', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders NFD thumbnail when both account and NFD data are available', async () => {
    mockedAxios.get
      .mockResolvedValueOnce(mockAccountInfoResponse)
      .mockResolvedValueOnce(mockNfdLookupResponse)

    const queryClient = new QueryClient()

    renderWithClient(
      queryClient,
      <UserThumbnail address="mock-active-address" />
    )

    const userThumbnail = await screen.findByTestId('user-thumbnail')
    expect(userThumbnail).toBeInTheDocument()

    expect(
      screen.getByText(mockNfdLookupResponse.data.name)
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        formatBalance(mockAccountInfoResponse.data.amount, 6, true)
      )
    ).toBeInTheDocument()
  })

  it('renders default thumbnail when NFD data is not available', async () => {
    mockedAxios.get
      .mockResolvedValueOnce(mockAccountInfoResponse)
      .mockResolvedValueOnce({ data: null })

    const queryClient = new QueryClient()

    renderWithClient(
      queryClient,
      <UserThumbnail address="mock-active-address" />
    )

    const userThumbnail = await screen.findByTestId('user-thumbnail')
    expect(userThumbnail).toBeInTheDocument()

    expect(
      screen.queryByText(mockNfdLookupResponse.data.name)
    ).not.toBeInTheDocument()
  })

  it('shows loading dots when fetching data', async () => {
    // Don't resolve mocked request to simulate loading
    mockedAxios.get.mockImplementation(() => new Promise(() => {}))

    const queryClient = new QueryClient()

    renderWithClient(
      queryClient,
      <UserThumbnail address="mock-active-address" />
    )

    const loadingDots = await screen.findByTestId('loading-dots')
    expect(loadingDots).toBeInTheDocument()
  })
})
