'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    <div className={`relative h-full w-full bg-transparent overflow-visible ${className ?? ''}`}>
      {/* Ambient placeholder aura while initializing - zero intrusive spinners or text */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="spline-placeholder-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="h-60 w-60 rounded-full bg-[radial-gradient(circle_at_center,rgba(193,154,136,0.18)_0%,rgba(128,89,72,0.06)_50%,transparent_75%)] blur-3xl animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic emergence of the 3D robot canvas */}
      <motion.div
        className="relative h-full w-full"
        initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
        animate={
          !isLoading
            ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
            : { opacity: 0, scale: 0.92, filter: 'blur(10px)' }
        }
        transition={{
          duration: 1.25,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full block outline-none bg-transparent"
        />
      </motion.div>
    </div>
  )
}
