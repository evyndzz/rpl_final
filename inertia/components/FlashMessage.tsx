import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react'

export default function FlashMessage() {
  const { props } = usePage()
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const flash = (props.flash as any)
    
    if (flash?.success) {
      setMessage({ type: 'success', text: flash.success })
      setIsVisible(true)
      const timer = setTimeout(() => setIsVisible(false), 3000)
      return () => clearTimeout(timer)
    } else if (flash?.error) {
      setMessage({ type: 'error', text: flash.error })
      setIsVisible(true)
      const timer = setTimeout(() => setIsVisible(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [props.flash])

  if (!isVisible || !message) return null

  const isSuccess = message.type === 'success'
  const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500'
  const icon = isSuccess ? '✓' : '✕'

  return (
    <div className={`fixed top-4 left-1/2 z-[100] transform -translate-x-1/2 transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
    }`}>
      <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-[300px] max-w-md`}>
        <div className="flex-shrink-0 text-xl font-bold">
          {icon}
        </div>
        <div className="flex-grow">
          <p className="font-medium">{message.text}</p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
