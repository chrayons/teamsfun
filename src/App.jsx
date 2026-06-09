import React, { useRef, useState, useEffect, useCallback } from 'react'
import html2canvas from 'html2canvas'
import JoinScreen from './JoinScreen.jsx'
import MeetingScreen from './MeetingScreen.jsx'

// scene states: 'join' → 'capturing' → 'folding' → 'flying' → 'meeting'
export default function App() {
  const [scene, setScene] = useState('join')
  const [meetingOpacity, setMeetingOpacity] = useState(0)
  const joinRef = useRef(null)
  const iframeRef = useRef(null)
  const craneLoaded = useRef(false)
  const simReady = useRef(false)

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
        // crane is built — now send the screenshot texture
        const iframe = iframeRef.current
        if (!iframe) return
        iframe.contentWindow.postMessage({ type: 'applyTexture', dataURL: window.__screenshotDataURL }, '*')
        // small delay so texture is applied before fold starts
        setTimeout(() => {
          iframe.contentWindow.postMessage({ type: 'startFold' }, '*')
          setScene('folding')
        }, 120)
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

    // capture the join screen
    const canvas = await html2canvas(joinRef.current, {
      useCORS: true,
      scale: window.devicePixelRatio || 1,
      backgroundColor: '#f5f5f5',
      logging: false,
    })

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

  const showJoin     = scene === 'join' || scene === 'capturing'
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
          <MeetingScreen />
        </div>
      )}

      {/* Layer 2: join screen */}
      <div style={{
        ...styles.layer,
        opacity: showJoin ? 1 : 0,
        pointerEvents: showJoin ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
        zIndex: 2,
      }}>
        <JoinScreen ref={joinRef} onJoin={handleJoin} />
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

      {/* subtle loading indicator during capture */}
      {scene === 'capturing' && (
        <div style={styles.capturingOverlay}>
          <div style={styles.capturingDot} />
        </div>
      )}
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
  capturingOverlay: {
    position: 'absolute',
    bottom: 24,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  capturingDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#6264a7',
    animation: 'pulse 0.8s ease infinite',
  },
}
