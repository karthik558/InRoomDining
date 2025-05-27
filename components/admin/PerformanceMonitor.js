'use client'
import { useState, useEffect } from 'react'

export default function PerformanceMonitor({
  enabled = true,
  threshold = 16, // Display warnings for frames taking longer than 16ms (60fps)
  sampleSize = 100, // Number of frames to analyze
  warningCallback
}) {
  const [isActive, setIsActive] = useState(enabled)
  const [metrics, setMetrics] = useState({
    frameDrops: 0,
    longFrames: [],
    averageFrameTime: 0,
    totalSamples: 0
  })

  // Start/stop monitoring
  const toggleMonitoring = () => {
    setIsActive(prev => !prev)
  }

  // Get performance metrics for debugging
  const getPerformanceMetrics = () => {
    return metrics
  }

  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || typeof performance === 'undefined') return

    let frameTimes = []
    let lastFrameTime = performance.now()
    let rafId

    // Function to measure frame time
    const measureFrame = (timestamp) => {
      const currentFrameTime = timestamp
      const frameDuration = currentFrameTime - lastFrameTime
      lastFrameTime = currentFrameTime
      
      // Store frame time
      frameTimes.push(frameDuration)
      
      // If we've collected enough samples, analyze them
      if (frameTimes.length >= sampleSize) {
        analyzeFrameTimes(frameTimes)
        frameTimes = [] // Reset for next batch
      }
      
      // Continue monitoring
      if (isActive) {
        rafId = requestAnimationFrame(measureFrame)
      }
    }

    // Analyze collected frame times
    const analyzeFrameTimes = (times) => {
      // Count frames that exceed the threshold
      const longFrames = times.filter(time => time > threshold)
      const totalLongFrames = longFrames.length
      
      // Calculate average frame time
      const sum = times.reduce((acc, time) => acc + time, 0)
      const avg = sum / times.length
      
      // Update metrics
      setMetrics(prev => ({
        frameDrops: prev.frameDrops + totalLongFrames,
        longFrames: [...prev.longFrames, ...longFrames].slice(-20), // Keep last 20 long frames
        averageFrameTime: (prev.averageFrameTime * prev.totalSamples + avg * times.length) / 
                          (prev.totalSamples + times.length),
        totalSamples: prev.totalSamples + times.length
      }))
      
      // Call the warning callback if provided and if there are long frames
      if (warningCallback && totalLongFrames > 0) {
        warningCallback({
          longFrames: totalLongFrames,
          averageFrameTime: avg,
          worstFrame: Math.max(...times),
          timestamp: new Date().toISOString()
        })
      }
      
      // Log to console if significant issues
      if (totalLongFrames > times.length * 0.1) { // More than 10% frames are slow
        console.warn(`Performance issue detected: ${totalLongFrames} slow frames out of ${times.length}. Average: ${avg.toFixed(2)}ms`)
      }
    }

    // Start monitoring
    if (isActive) {
      rafId = requestAnimationFrame(measureFrame)
    }

    // Cleanup
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [enabled, isActive, threshold, sampleSize, warningCallback])

  return null // This component doesn't render anything
}

// Export a function to add to troublesome pages
export function monitorPagePerformance(pageName) {
  if (typeof window === 'undefined' || typeof performance === 'undefined') return
  
  const startTime = performance.now()
  let scrollEvents = 0
  let renderTime = 0
  
  // Record initial render time
  window.addEventListener('load', () => {
    renderTime = performance.now() - startTime
    console.info(`[Performance] ${pageName} initial render: ${renderTime.toFixed(2)}ms`)
  }, { once: true })
  
  // Monitor scroll performance
  const handleScroll = () => {
    scrollEvents++
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Report scroll stats before unload
  window.addEventListener('beforeunload', () => {
    console.info(`[Performance] ${pageName} handled ${scrollEvents} scroll events`)
    
    // Check if navigation timing API is available
    if (performance.getEntriesByType) {
      const paintTimings = performance.getEntriesByType('paint')
      const navigationTiming = performance.getEntriesByType('navigation')[0]
      
      if (paintTimings && paintTimings.length) {
        paintTimings.forEach(timing => {
          console.info(`[Performance] ${timing.name}: ${timing.startTime.toFixed(2)}ms`)
        })
      }
      
      if (navigationTiming) {
        console.info(`[Performance] DOM Complete: ${navigationTiming.domComplete.toFixed(2)}ms`)
        console.info(`[Performance] Load Event: ${navigationTiming.loadEventEnd.toFixed(2)}ms`)
      }
    }
  }, { once: true })
  
  // Clean up
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}
