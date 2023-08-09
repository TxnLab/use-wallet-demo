import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import UserThumbnail from '@/components/UserThumbnail'

interface MenuHeaderProps {
  activeAddress?: string
  setOpen: (open: boolean) => void
  title: string
  subtitle: string
}

export default function MenuHeader({
  activeAddress,
  setOpen,
  title,
  subtitle
}: MenuHeaderProps) {
  return (
    <div className="bg-teal-700 px-4 py-6 sm:px-6">
      <div className="flex items-start justify-between">
        <Dialog.Title className="text-base font-semibold leading-6 text-white">
          {!activeAddress ? title : <UserThumbnail address={activeAddress} />}
        </Dialog.Title>
        <div className="ml-3 flex h-7 items-center">
          <button
            type="button"
            className="relative rounded-md bg-teal-700 text-teal-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setOpen(false)}
          >
            <span className="absolute -inset-2.5" />
            <span className="sr-only">Close panel</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {!activeAddress && (
        <div className="mt-1">
          <p className="text-sm text-teal-300">{subtitle}</p>
        </div>
      )}
    </div>
  )
}
