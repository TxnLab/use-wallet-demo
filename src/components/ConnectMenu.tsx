import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import ConnectButton from '@/components/ConnectButton'
import MenuHeader from '@/components/MenuHeader'
import Provider from '@/components/Provider'

export default function ConnectMenu() {
  const [open, setOpen] = useState(false)

  // useWallet hook

  const renderProviders = () => {
    // Map providers
    return (
      <>
        <Provider id="defly" name="Defly" />
        <Provider id="pera" name="Pera" />
        <Provider id="daffi" name="Daffi" />
        <Provider id="walletconnect" name="WalletConnect" />
        <Provider id="exodus" name="Exodus" />
      </>
    )
  }

  return (
    <>
      {/* Pass active address */}
      <ConnectButton setOpen={setOpen} activeAddress={undefined} />

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
                    <div className="flex h-full flex-col overflow-y-scroll bg-zinc-900 shadow-xl">
                      <MenuHeader
                        // Pass active address
                        activeAddress={undefined}
                        setOpen={setOpen}
                        title="Connect a wallet to get started"
                        subtitle="Select the wallet provider you would like to connect to from the options below."
                      />
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
