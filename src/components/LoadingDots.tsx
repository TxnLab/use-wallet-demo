import { classNames } from '@/utils'

export default function LoadingDots({ className = '' }) {
  return (
    <div
      className={classNames(
        'flex items-center justify-center space-x-2',
        className
      )}
      data-testid="loading-dots"
    >
      <div className="w-3 h-3 bg-white/50 rounded-full animate-loading-pulse" />
      <div className="w-3 h-3 bg-white/50 rounded-full animate-loading-pulse [animation-delay:250ms]" />
      <div className="w-3 h-3 bg-white/50 rounded-full animate-loading-pulse [animation-delay:500ms]" />
    </div>
  )
}
