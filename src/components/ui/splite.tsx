'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { Application } from '@splinetool/runtime'

interface SplineSceneProps {
  scene: string
  className?: string
  fallback?: React.ReactNode
  onLoad?: (app: Application) => void
}

export function SplineScene({ scene, className, fallback, onLoad }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [errorDetail, setErrorDetail] = useState<string>('')
  const appRef = useRef<Application | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadSpline() {
      if (!canvasRef.current) return
      setIsLoading(true)
      setHasError(false)

      try {
        const { Application } = await import('@splinetool/runtime')
        if (!isMounted || !canvasRef.current) return

        // Dispose any existing instance before initializing a new one
        if (appRef.current) {
          try {
            appRef.current.dispose()
          } catch {
            // Ignore dispose error
          }
          appRef.current = null
        }

        const app = new Application(canvasRef.current, {
          renderOnDemand: true,
          wasmPath: '/spline',
        })
        appRef.current = app

        // Try primary scene URL
        try {
          await app.load(scene)
        } catch (initialError) {
          const fallbackUrl = scene.startsWith('http')
            ? '/spline/robot.splinecode'
            : 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'
          console.warn(`Initial Spline scene failed, trying fallback (${fallbackUrl}):`, initialError)
          await app.load(fallbackUrl)
        }

        if (isMounted) {
          setIsLoading(false)
          onLoad?.(app)
        }
      } catch (error) {
        const msg = error instanceof Error ? `${error.name}: ${error.message}` : String(error)
        console.warn('Spline 3D Scene could not be initialized:', error)
        if (isMounted) {
          setErrorDetail(msg)
          setIsLoading(false)
          setHasError(true)
        }
      }
    }

    loadSpline()

    return () => {
      isMounted = false
      if (appRef.current) {
        try {
          appRef.current.dispose()
        } catch {
          // Ignore dispose error on unmount
        }
        appRef.current = null
      }
    }
  }, [scene, onLoad])

  if (hasError) {
    return (
      fallback || (
        <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center bg-transparent">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c19a88]">3D Scene Unavailable</p>
          {errorDetail && (
            <p className="mt-1 max-w-sm text-[10px] text-white/35 font-mono break-all">{errorDetail}</p>
          )}
          <button
            type="button"
            onClick={() => {
              setHasError(false)
              setIsLoading(true)
              setErrorDetail('')
            }}
            className="mt-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-white/70 transition hover:bg-white/[0.08] hover:text-white"
          >
            Retry
          </button>
        </div>
      )
    )
  }

  return (
    <div className={`relative h-full w-full bg-transparent ${className ?? ''}`}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-transparent pointer-events-none">
          <div className="flex flex-col items-center gap-2.5">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#805948]/30 border-t-[#c19a88]" />
            <span className="text-[11px] uppercase tracking-widest text-white/30">Loading 3D...</span>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`h-full w-full block outline-none bg-transparent transition-opacity duration-700 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  )
}
