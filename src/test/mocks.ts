import type { Account, Metadata, Provider } from '@txnlab/use-wallet'

// Prevent circular dependency in useWallet mock
export enum PROVIDER_ID {
  ALGOSIGNER = 'algosigner',
  DAFFI = 'daffi',
  DEFLY = 'defly',
  EXODUS = 'exodus',
  KMD = 'kmd',
  MNEMONIC = 'mnemonic',
  MYALGO = 'myalgo',
  PERA = 'pera',
  WALLETCONNECT = 'walletconnect'
}

const providerNameMap: Record<PROVIDER_ID, string> = {
  algosigner: 'AlgoSigner',
  daffi: 'Daffi',
  defly: 'Defly',
  exodus: 'Exodus',
  kmd: 'KMD',
  mnemonic: 'Mnemonic',
  myalgo: 'MyAlgo',
  pera: 'Pera',
  walletconnect: 'WalletConnect'
}

const walletConnectProviders = [
  PROVIDER_ID.DAFFI,
  PROVIDER_ID.DEFLY,
  PROVIDER_ID.PERA,
  PROVIDER_ID.WALLETCONNECT
]

// Base Types (Metadata, Account)
export const mockMetadata = (id: PROVIDER_ID): Metadata => ({
  id,
  name: providerNameMap[id],
  icon: 'data:image/svg+xml;base64,mockIcon',
  isWalletConnect: walletConnectProviders.includes(id)
})

export const mockAccount = (
  providerId: PROVIDER_ID,
  address?: string,
  i = 0
): Account => ({
  providerId,
  name: `${providerNameMap[providerId]} Wallet ${i + 1}`,
  address: address || `mock-address-${i + 1}`
})

// Composable Wallet Provider
export const mockProvider = (
  id: PROVIDER_ID,
  accounts: Account[] = [],
  isActive: boolean = false,
  isConnected: boolean = false
): Provider => ({
  metadata: mockMetadata(id),
  accounts,
  isActive,
  isConnected,
  connect: jest.fn(),
  disconnect: jest.fn(),
  reconnect: jest.fn(),
  setActiveProvider: jest.fn(),
  setActiveAccount: jest.fn()
})

/**
 * Generates an array of mock providers for testing purposes
 *
 * @param providerIds - An array of provider IDs
 * @param activeId - Optional. ID of the provider that should be set as "active"
 * @param connectedIds - Optional. Array of provider IDs that are "connected" (but *not* active)
 *
 * @returns Array of provider objects with specified properties
 */
export const mockProviders = (
  providerIds: PROVIDER_ID[],
  activeId?: PROVIDER_ID,
  connectedIds?: PROVIDER_ID[]
): Provider[] => {
  const providers: Provider[] = []

  providerIds.forEach((providerId) => {
    const isActive = providerId === activeId
    const isConnected =
      isActive || connectedIds?.includes(providerId as any) || false
    const accounts: Account[] = []

    if (isActive || isConnected) {
      accounts.push(mockAccount(providerId))
    }

    providers.push(mockProvider(providerId, accounts, isActive, isConnected))
  })

  return providers
}

/**
 * Retrieves the address of the first account from the active provider
 *
 * @param providers - Array of mock provider objects (see `mockProviders`)
 *
 * @returns The address of the first account of the active provider, or undefined if not found
 */
export const getActiveAddress = (providers: Provider[]): string | undefined => {
  const activeProvider = providers.find((provider) => provider.isActive)

  return activeProvider?.accounts[0]?.address
}

export const mockAccountInfoResponse = {
  data: {
    address: 'mock-active-address',
    amount: 1000000
  }
}

export const mockNfdLookupResponse = {
  data: {
    name: 'mock.algo',
    properties: {
      verified: {
        avatar: 'mock-avatar'
      }
    }
  }
}

export const mockTransactionParams = {
  'consensus-version':
    'https://github.com/algorandfoundation/specs/tree/abd3d4823c6f77349fc04c3af7b1e99fe4df699f',
  fee: 0,
  'genesis-hash': 'wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=',
  'genesis-id': 'mainnet-v1.0',
  'last-round': 31212800,
  'min-fee': 1000
}
