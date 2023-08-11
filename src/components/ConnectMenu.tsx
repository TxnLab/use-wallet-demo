import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useWallet } from '@txnlab/use-wallet'
import { Fragment, useState } from 'react'
import ConnectButton from '@/components/ConnectButton'
import Provider from '@/components/Provider'
import UserThumbnail from '@/components/UserThumbnail'

export default function ConnectMenu() {
  const [open, setOpen] = useState(false)

  const { providers, activeAddress } = useWallet()

  const renderProviders = () => {
    return providers?.map((provider) => (
      <Provider
        key={provider.metadata.id}
        id={provider.metadata.id}
        name={provider.metadata.name}
        icon={provider.metadata.icon}
        onConnect={provider.connect}
        onDisconnect={provider.disconnect}
        onSetActive={provider.setActiveProvider}
        onChangeAccount={provider.setActiveAccount}
        isConnected={provider.isConnected}
        isActive={provider.isActive}
        accounts={provider.accounts}
        activeAddress={activeAddress}
      />
    ))
  }

  return (
    <>
      <ConnectButton setOpen={setOpen} activeAddress={activeAddress} />

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-zinc-950 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div
                      className="flex h-full flex-col overflow-y-scroll bg-zinc-900 shadow-xl"
                      data-testid="connect-menu"
                    >
                      <div className="bg-teal-700 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-white">
                            {!activeAddress ? (
                              'Connect a wallet to get started'
                            ) : (
                              <UserThumbnail address={activeAddress} />
                            )}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-teal-700 text-teal-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setOpen(false)}
                              data-testid="close-menu"
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        {!activeAddress && (
                          <div className="mt-1">
                            <p className="text-sm text-teal-300">
                              Select the wallet provider you would like to
                              connect to from the options below.
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="relative flex-1 py-6 sm:px-6">
                        <div className="flex flex-col gap-6 sm:gap-7">
                          {renderProviders()}
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
