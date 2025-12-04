import React, { useEffect, useState } from 'react'

interface SuccessToastProps {
  message: string
  show: boolean
  onClose: () => void
  duration?: number
}

export default function SuccessToast({ message, show, onClose, duration = 3000 }: SuccessToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      setIsExiting(false)
      const timer = setTimeout(() => {
        setIsExiting(true)
        setTimeout(() => {
          setIsVisible(false)
          onClose()
        }, 300) // Match animation duration
      }, duration)
      return () => clearTimeout(timer)
    } else {
      setIsExiting(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 300)
    }
  }, [show, duration, onClose])

  if (!isVisible) return null

  return (
    <div className={`fixed top-4 right-4 z-[100] transition-all duration-300 ${
      isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
    }`}>
      <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-[300px] max-w-md transform transition-all duration-300 hover:scale-105">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-white animate-pulse"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsExiting(true)
            setTimeout(() => {
              setIsVisible(false)
              onClose()
            }, 300)
          }}
          className="flex-shrink-0 text-white hover:text-gray-200 transition-colors"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

