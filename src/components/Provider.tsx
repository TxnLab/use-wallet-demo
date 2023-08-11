import { CheckIcon, XMarkIcon, BoltIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { classNames } from '@/utils'
import type { Account } from '@txnlab/use-wallet'

interface ProviderProps {
  id: string
  name: string
  icon?: string
  onConnect?: () => void
  onDisconnect?: () => void
  onSetActive?: () => void
  onChangeAccount?: (address: string) => void
  isConnected?: boolean
  isActive?: boolean
  accounts?: Account[]
  activeAddress?: string
}

export default function Provider({
  id,
  name,
  icon,
  onConnect,
  onDisconnect,
  onSetActive,
  onChangeAccount,
  isConnected,
  isActive,
  accounts,
  activeAddress
}: ProviderProps) {
  const handleSetActiveProvider = () => {
    if (isConnected) {
      onSetActive?.()
    } else {
      onConnect?.()
    }
  }

  const handleDisconnectProvider = () => {
    onDisconnect?.()
  }

  const handleSetActiveAccount = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onChangeAccount?.(event.target.value)
  }

  const renderProviderIcon = () => {
    if (!icon) {
      return (
        <Image
          className="object-cover opacity-10"
          src="/img/provider-icon.png"
          alt="Default icon"
          width={48}
          height={48}
        />
      )
    }

    return (
      <Image
        src={icon}
        alt={`Icon for ${name} provider`}
        className="object-cover"
        width={48}
        height={48}
      />
    )
  }

  const renderProviderName = () => {
    const textColor = isActive ? 'text-white' : 'text-white/50'

    return (
      <p
        className={classNames(
          textColor,
          'flex-1 z-10 font-beni text-4xl tracking-wide transition group-hover:text-white sm:text-5xl'
        )}
      >
        {name}
      </p>
    )
  }

  const renderActiveBadge = () => {
    return (
      <>
        <span
          aria-label={`${name} provider is active`}
          className="sm:hidden flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center z-10 rounded-full overflow-hidden text-teal-500 bg-teal-800 shadow-md shadow-zinc-800/5 transition border border-teal-600/50"
        >
          <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>

        <button
          type="button"
          onClick={handleDisconnectProvider}
          aria-label={`Disconnect ${name} provider`}
          className="hidden sm:flex group/button flex-col h-8 w-8 sm:h-10 sm:w-10 items-center z-10 rounded-full overflow-hidden bg-teal-800 shadow-md shadow-zinc-800/5 transition border border-teal-600/50 hover:bg-red-600/25 hover:border-red-500/75"
        >
          <span className="p-1.5 sm:p-2 flex items-center justify-center transition -mt-[1px] group-hover/button:-translate-y-full">
            <CheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-teal-500" />
          </span>
          <span className="p-1.5 sm:p-2 flex items-center justify-center transition group-hover/button:-translate-y-full">
            <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
          </span>
        </button>
      </>
    )
  }

  if (isActive) {
    const showAccountMenu = accounts && accounts?.length > 0

    return (
      <div className="-my-3 bg-zinc-800 py-3 sm:px-3 sm:-mx-3 sm:rounded-2xl">
        <div className="flex items-center w-full text-left gap-x-4 rounded-md px-4 py-1 sm:p-2">
          <div className="h-10 w-10 sm:h-12 sm:w-12 flex-none rounded-full bg-zinc-800 overflow-hidden">
            {renderProviderIcon()}
          </div>
          {renderProviderName()}
          {renderActiveBadge()}
        </div>

        <div className="mt-4 px-4 sm:px-2 space-y-4 pb-2">
          {showAccountMenu && (
            <div className="mt-2">
              <label htmlFor={`${id}-active-account`} className="sr-only">
                Active Account
              </label>
              <div className="mt-1">
                <select
                  id={`${id}-active-account`}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white font-mono shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  value={activeAddress}
                  onChange={handleSetActiveAccount}
                  data-testid="active-account-menu"
                >
                  {accounts?.map((account) => (
                    <option key={account.address}>{account.address}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <button
            type="button"
            className="sm:hidden w-full rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
            onClick={handleDisconnectProvider}
          >
            Disconnect
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-12 mx-2 sm:h-auto sm:mx-0" data-testid="provider">
      <button
        type="button"
        className="group relative w-full rounded-lg"
        onClick={handleSetActiveProvider}
      >
        <div className="absolute -inset-x-2 -inset-y-3 z-0 bg-zinc-800/50 scale-90 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-3 sm:rounded-2xl" />
        <div className="flex items-center w-full text-left gap-x-4 rounded-md px-2 py-1 sm:p-2">
          <div className="h-10 w-10 sm:h-12 sm:w-12 z-20 flex-none rounded-full overflow-hidden">
            {renderProviderIcon()}
          </div>
          {renderProviderName()}
          {isConnected && (
            <span
              aria-label={`${name} provider is connected`}
              className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center z-10 rounded-full overflow-hidden text-white/40 bg-white/5 shadow-md shadow-zinc-800/5 transition border border-white/10 group-hover:text-white/80 group-hover:border-white/20"
            >
              <BoltIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          )}
        </div>
      </button>
    </div>
  )
}
