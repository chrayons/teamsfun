import React, { useRef, useState, useEffect, useCallback } from 'react'
import html2canvas from 'html2canvas'
import JoinScreen from './JoinScreen.jsx'
import MeetingScreen from './MeetingScreen.jsx'

// scene states: 'join' → 'capturing' → 'folding' → 'flying' → 'meeting'
export default function App() {
  const [scene, setScene] = useState('join')
  const [meetingOpacity, setMeetingOpacity] = useState(0)
  const [cameraOn, setCameraOn] = useState(false)
  const joinRef = useRef(null)
  const iframeRef = useRef(null)
  const craneLoaded = useRef(false)
  const simReady = useRef(false)
  const mediaStreamRef = useRef(null)

  const handleToggleCamera = useCallback(async () => {
    if (!cameraOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        mediaStreamRef.current = stream
        setCameraOn(true)
      } catch (e) {
        console.warn('Camera access denied', e)
      }
    } else {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(t => t.stop())
        mediaStreamRef.current = null
      }
      setCameraOn(false)
    }
  }, [cameraOn])

  // load crane SVG once on mount
  useEffect(() => {
    fetch('/simulator/assets/Origami/traditionalCrane.svg')
      .then(r => r.text())
      .then(svg => { craneLoaded.current = svg })
  }, [])

  // listen for simulator messages
  useEffect(() => {
    function onMessage(e) {
      const msg = e.data
      if (!msg || !msg.type) return

      if (msg.type === 'simulator:ready') {
        simReady.current = true
      }

      if (msg.type === 'simulator:craneLoaded') {
        // crane is built — send the screenshot texture; fold starts when textureReady fires
        const iframe = iframeRef.current
        if (!iframe) return
        iframe.contentWindow.postMessage({ type: 'applyTexture', dataURL: window.__screenshotDataURL }, '*')
      }

      if (msg.type === 'simulator:textureReady') {
        // Paper is on screen — hide join screen and start fold in the same event
        const iframe = iframeRef.current
        if (!iframe) return
        setScene('folding')
        iframe.contentWindow.postMessage({ type: 'startFold' }, '*')
      }

      if (msg.type === 'simulator:foldComplete') {
        setScene('flying')
        const iframe = iframeRef.current
        if (!iframe) return
        // start fading in the meeting screen
        setMeetingOpacity(0)
        requestAnimationFrame(() => {
          setMeetingOpacity(1)
        })
        iframe.contentWindow.postMessage({ type: 'startFlight' }, '*')
      }

      if (msg.type === 'simulator:flightComplete') {
        setScene('meeting')
        setMeetingOpacity(1)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  const handleJoin = useCallback(async () => {
    if (!joinRef.current) return
    setScene('capturing')

    const videoEl = joinRef.current.querySelector('video')

    // Capture the full join screen UI. html2canvas renders <video> as black,
    // so we composite the live camera frame on top afterwards.
    const canvas = await html2canvas(joinRef.current, {
      useCORS: true,
      scale: window.devicePixelRatio || 1,
      backgroundColor: '#f5f5f5',
      logging: false,
    })

    if (videoEl && cameraOn) {
      const containerRect = joinRef.current.getBoundingClientRect()
      const videoRect = videoEl.getBoundingClientRect()
      const scale = window.devicePixelRatio || 1
      const ctx = canvas.getContext('2d')
      const x = (videoRect.left - containerRect.left) * scale
      const y = (videoRect.top - containerRect.top) * scale
      const w = videoRect.width * scale
      const h = videoRect.height * scale
      ctx.drawImage(videoEl, x, y, w, h)
    }

    // Keep the stream alive — MeetingScreen will reuse it directly so there's no camera flash on join

    // center-crop to square
    const size = Math.min(canvas.width, canvas.height)
    const sx = Math.floor((canvas.width - size) / 2)
    const sy = Math.floor((canvas.height - size) / 2)
    const crop = document.createElement('canvas')
    crop.width = size
    crop.height = size
    crop.getContext('2d').drawImage(canvas, sx, sy, size, size, 0, 0, size, size)
    window.__screenshotDataURL = crop.toDataURL('image/jpeg', 0.92)

    // show iframe
    setScene('loading_sim')

    // wait for sim to be ready then load crane
    const tryLoad = () => {
      const iframe = iframeRef.current
      if (!iframe) return
      if (simReady.current) {
        iframe.contentWindow.postMessage({
          type: 'loadCrane',
          svg: craneLoaded.current,
        }, '*')
      } else {
        setTimeout(tryLoad, 100)
      }
    }
    // give iframe a moment to initialize if it hasn't yet
    setTimeout(tryLoad, 200)
  }, [])

  const showJoin     = scene === 'join' || scene === 'capturing' || scene === 'loading_sim'
  const showSim      = scene !== 'join' && scene !== 'capturing'
  const showMeeting  = scene === 'flying' || scene === 'meeting'

  return (
    <div style={styles.root}>
      {/* Layer 1: meeting screen (fades in during flight) */}
      {showMeeting && (
        <div style={{
          ...styles.layer,
          opacity: meetingOpacity,
          transition: 'opacity 1.2s ease',
          zIndex: 1,
        }}>
          <MeetingScreen cameraOn={cameraOn} initialStream={mediaStreamRef.current} />
        </div>
      )}

      {/* Layer 2: join screen — always at zIndex 4 so simulator never bleeds through;
           fade out gives the textured paper time to paint before it's revealed */}
      <div style={{
        ...styles.layer,
        opacity: showJoin ? 1 : 0,
        pointerEvents: showJoin ? 'auto' : 'none',
        transition: showJoin ? 'none' : 'opacity 0.25s ease',
        zIndex: 4,
      }}>
        <JoinScreen ref={joinRef} onJoin={handleJoin} cameraOn={cameraOn} onToggleCamera={handleToggleCamera} mediaStream={mediaStreamRef.current} />
      </div>

      {/* Layer 3: origami simulator iframe (transparent bg, full viewport) */}
      <div style={{
        ...styles.layer,
        opacity: showSim && scene !== 'meeting' ? 1 : 0,
        pointerEvents: 'none',
        transition: scene === 'meeting' ? 'opacity 0.6s ease' : 'none',
        zIndex: 3,
      }}>
        <iframe
          ref={iframeRef}
          src="/simulator/simulator.html"
          style={styles.iframe}
          title="Origami simulator"
        />
      </div>


    </div>
  )
}

const styles = {
  root: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    background: '#f5f5f5',
  },
  layer: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    background: 'transparent',
  },
}
