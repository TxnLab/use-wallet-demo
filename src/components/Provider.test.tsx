import { render, screen, fireEvent } from '@testing-library/react'
import Provider from '@/components/Provider'
import { PROVIDER_ID, mockAccount, mockProvider } from '@/test/mocks'

describe('Provider', () => {
  const { metadata, accounts } = mockProvider(PROVIDER_ID.DEFLY, [
    mockAccount(PROVIDER_ID.DEFLY, 'mock-account-1'),
    mockAccount(PROVIDER_ID.DEFLY, 'mock-account-2')
  ])

  const id = metadata.id
  const name = metadata.name
  const icon = metadata.icon

  const defaultProps = {
    id,
    name,
    icon,
    onConnect: jest.fn(),
    onDisconnect: jest.fn(),
    onSetActive: jest.fn(),
    onChangeAccount: jest.fn()
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders provider name', () => {
    render(<Provider {...defaultProps} />)
    expect(screen.getByText(name)).toBeInTheDocument()
  })

  it('renders provider icon', () => {
    render(<Provider {...defaultProps} />)
    expect(screen.getByAltText(`Icon for ${name} provider`)).toHaveAttribute(
      'src',
      icon
    )
  })

  it('invokes onConnect when not connected', () => {
    render(<Provider {...defaultProps} />)
    fireEvent.click(screen.getByText(name))
    expect(defaultProps.onConnect).toHaveBeenCalled()
  })

  it('invokes onSetActive when connected but not active', () => {
    render(<Provider {...defaultProps} isConnected={true} />)
    fireEvent.click(screen.getByText(name))
    expect(defaultProps.onSetActive).toHaveBeenCalled()
  })

  it('invokes onDisconnect for active provider', () => {
    render(<Provider {...defaultProps} isActive={true} />)
    fireEvent.click(screen.getByLabelText(`Disconnect ${name} provider`))
    expect(defaultProps.onDisconnect).toHaveBeenCalled()
  })

  it('triggers onChangeAccount when changing the active account', () => {
    render(<Provider {...defaultProps} isActive={true} accounts={accounts} />)
    fireEvent.change(screen.getByTestId('active-account-menu'), {
      target: { value: accounts[1].address }
    })
    expect(defaultProps.onChangeAccount).toHaveBeenCalledWith(
      accounts[1].address
    )
  })

  it('renders active account dropdown when provider is active and has accounts', () => {
    render(<Provider {...defaultProps} isActive={true} accounts={accounts} />)
    expect(screen.getByTestId('active-account-menu')).toBeInTheDocument()
  })

  // Edge case, should not happen
  it('does not render the active account dropdown when no accounts are provided', () => {
    render(<Provider {...defaultProps} isActive={true} />)
    expect(screen.queryByTestId('active-account-menu')).toBeNull()
  })

  it('renders connected badge for connected providers', () => {
    render(<Provider {...defaultProps} isConnected={true} />)
    expect(
      screen.getByLabelText(`${name} provider is connected`)
    ).toBeInTheDocument()
  })

  it('renders active badge for active providers', () => {
    render(<Provider {...defaultProps} isActive={true} />)
    expect(
      screen.getByLabelText(`${name} provider is active`)
    ).toBeInTheDocument()
  })
})
