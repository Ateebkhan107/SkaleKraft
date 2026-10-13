'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
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
  const onLoadRef = useRef(onLoad)
  onLoadRef.current = onLoad

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
          htmlContentMode: 'none',
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

        // Blend robot seamlessly into transparent background
        try {
          app.setBackgroundColor('transparent')
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const anyApp = app as any

          if (anyApp._scene?.activePage) {
            if (anyApp._scene.activePage.bgColor) {
              anyApp._scene.activePage.bgColor.r = 0
              anyApp._scene.activePage.bgColor.g = 0
              anyApp._scene.activePage.bgColor.b = 0
              anyApp._scene.activePage.bgColor.a = 0
              if (typeof anyApp._scene.activePage.bgColor.setRGBA === 'function') {
                anyApp._scene.activePage.bgColor.setRGBA(0, 0, 0, 0)
              }
            }
            anyApp._scene.activePage.fog = null
            if (anyApp._scene.activePage.backupFog) {
              anyApp._scene.activePage.backupFog = null
            }
          }
          // Post-processing (vignette, noise, bloom...) composites into an opaque
          // buffer, which paints a visible box behind the robot. Turn it all off.
          const pp = anyApp._scene?.activePage?.data?.postprocessing
          if (pp && typeof pp === 'object') {
            if ('enabled' in pp) pp.enabled = false
            for (const key of Object.keys(pp)) {
              const effect = pp[key]
              if (effect && typeof effect === 'object' && 'enabled' in effect) {
                effect.enabled = false
              }
            }
          }

          if (anyApp._renderer) {
            try {
              if (typeof anyApp._renderer.setClearColor === 'function') {
                const origSetClearColor = anyApp._renderer.setClearColor.bind(anyApp._renderer)
                anyApp._renderer.setClearColor = (color: unknown) => {
                  origSetClearColor(color, 0)
                }
              }
              anyApp._renderer.setClearAlpha?.(0)
              anyApp._renderer.setClearColor?.(0x000000, 0)
              if (anyApp._renderer.domElement) {
                anyApp._renderer.domElement.style.background = 'transparent'
              }
            } catch {}
          }

          if (typeof anyApp._requestRenderAutoMode === 'function') {
            anyApp._requestRenderAutoMode()
          }
        } catch (bgError) {
          console.warn('Could not set Spline background transparency:', bgError)
        }

        if (isMounted) {
          setIsLoading(false)
          onLoadRef.current?.(app)
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
  }, [scene])

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
