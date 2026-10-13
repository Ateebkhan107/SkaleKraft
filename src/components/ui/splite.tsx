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

        const app = new Application(canvasRef.current, { renderOnDemand: true })
        appRef.current = app

        // Try primary scene URL
        try {
          await app.load(scene)
        } catch (initialError) {
          // If remote scene was blocked (e.g., adblocker/CORS), try local bundled file
          if (scene.startsWith('http')) {
            console.warn('Remote Spline scene blocked or failed to fetch, attempting local fallback scene...')
            await app.load('/spline/robot.splinecode')
          } else {
            throw initialError
          }
        }

        if (isMounted) {
          setIsLoading(false)
          onLoad?.(app)
        }
      } catch (error) {
        console.warn('Spline 3D Scene could not be initialized:', error)
        if (isMounted) {
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
        <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#c19a88]">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#c19a88]">3D Scene Unavailable</p>
          <p className="mt-1 max-w-xs text-xs text-white/45">
            WebGL could not initialize or network blocked the 3D asset.
          </p>
          <button
            type="button"
            onClick={() => setHasError(false)}
            className="mt-3.5 rounded-full border border-[#805948]/50 bg-[#805948]/20 px-3.5 py-1 text-xs text-white transition hover:bg-[#805948]"
          >
            Retry
          </button>
        </div>
      )
    )
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${className ?? ''}`}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#090909]">
          <div className="flex flex-col items-center gap-2.5">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#805948]/30 border-t-[#c19a88]" />
            <span className="text-[11px] uppercase tracking-widest text-white/40">Loading 3D scene...</span>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="h-full w-full block outline-none"
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  )
}
