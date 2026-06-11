import React, { forwardRef, useRef, useEffect } from 'react'

// Fluent / Teams brand colours
const C = {
  purple:      '#5B5FC7',
  purpleLight: '#7579EB',
  purpleDark:  '#4B53BC',
  purpleText:  '#5B5FC7',
  bg:          '#F5F5F5',
  surface:     '#FFFFFF',
  surfaceAlt:  '#FAFAFA',
  text:        '#242424',
  text2:       '#505050',
  textSub:     '#616161',
  textMuted:   '#8A8886',
  border:      '#E0E0E0',
  borderDark:  '#C8C6C4',
  borderBar:   '#E9E9E9',
}

function Avatar({ size, initials }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `linear-gradient(135deg, ${C.purpleLight}, ${C.purpleDark})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, overflow: 'hidden',
    }}>
      <span style={{
        color: 'white',
        fontSize: size * 0.38,
        fontWeight: 600,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        letterSpacing: '0.5px',
      }}>{initials}</span>
    </div>
  )
}

// Fluent-style toggle — matches 40×20px Teams join screen toggle
function Toggle({ on }) {
  return (
    <div style={{
      width: 40, height: 20,
      borderRadius: 10,
      background: on ? C.purple : 'transparent',
      border: on ? 'none' : `1px solid #605E5C`,
      position: 'relative',
      flexShrink: 0,
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: 14, height: 14,
        borderRadius: '50%',
        background: on ? 'white' : '#605E5C',
        position: 'absolute',
        top: on ? 3 : 2,
        left: on ? 23 : 3,
      }}/>
    </div>
  )
}

function AudioRadio({ label, selected, dimmed }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {/* radio circle */}
      <div style={{ flexShrink: 0 }}>
        <div style={{
          width: 20, height: 20, borderRadius: '50%',
          border: `1.3px solid ${selected ? C.purple : dimmed ? '#C7C7C7' : C.textSub}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: selected ? C.purple : 'transparent',
          boxSizing: 'border-box',
        }}>
          {selected && (
            <img src="/icons/radio-dot.svg" alt="" width={12} height={12}/>
          )}
        </div>
      </div>
      <span style={{
        fontSize: 14, fontWeight: selected ? 600 : 400,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        color: selected ? '#505050' : dimmed ? '#C7C7C7' : C.textSub,
      }}>
        {label}
      </span>
    </div>
  )
}

const JoinScreen = forwardRef(function JoinScreen({ onJoin, cameraOn, onToggleCamera, mediaStream }, ref) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = cameraOn && mediaStream ? mediaStream : null
    }
  }, [cameraOn, mediaStream])

  return (
    <div ref={ref} style={s.root}>
      {/* macOS title bar */}
      <div style={s.titleBar}>
        <div style={s.trafficLights}>
          <span style={{ ...s.dot, background: '#FF5F57' }}/>
          <span style={{ ...s.dot, background: '#FEBC2E' }}/>
          <span style={{ ...s.dot, background: '#28C840' }}/>
        </div>
        <span style={s.titleText}>Meeting with Reve x Design Meetup</span>
        <span style={s.ellipsis}>···</span>
      </div>

      {/* identity card — sits just below title bar, centered */}
      <div style={s.identityWrap}>
        <div style={s.identityCard}>
          <Avatar size={38} initials="TF"/>
          <div style={s.identityInfo}>
            <span style={s.identityName}>TeamsFun</span>
            <span style={s.identityEmail}>teamsfun@gma…</span>
          </div>
          <button style={s.changeBtn}>Change</button>
        </div>
      </div>

      {/* scrollable body */}
      <div style={s.body}>

        {/* Teams logo + meeting title */}
        <div style={s.meetingHeader}>
          <img src="/icons/teams-logo.png" alt="Teams" style={{ width: 38, height: 40, objectFit: 'contain' }}/>
          <h2 style={s.meetingTitle}>Meeting with TeamsFun</h2>
        </div>

        {/* two-column content */}
        <div style={s.columns}>

          {/* ── Camera panel ── */}
          <div style={s.cameraPanel}>
            <div style={s.cameraPreview}>
              {cameraOn ? (
                <video ref={videoRef} autoPlay muted playsInline style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%', objectFit: 'cover',
                  display: 'block',
                }}/>
              ) : (
                <>
                  <img src="/icons/camera-off-lg.svg" alt="" width={24} height={24} style={{ display: 'block' }}/>
                  <p style={s.cameraOffText}>Your camera is turned off</p>
                </>
              )}
            </div>
            <div style={s.cameraControls}>
              <div style={s.cameraLeft}>
                <img src={cameraOn ? "/icons/video-on.svg" : "/icons/camera-off-sm.svg"} alt="" width={20} height={20} style={{ display: 'block' }}/>
                <img src="/icons/chevron-gray.svg" alt="" width={13} height={13} style={{ display: 'block' }}/>
                <div onClick={onToggleCamera} style={{ cursor: 'pointer' }}>
                  <Toggle on={cameraOn}/>
                </div>
              </div>
              <span style={s.bgFiltersBtn}>
                <img src="/icons/bg-filter.svg" alt="" width={20} height={20} style={{ display: 'block' }}/>
                <span style={{ marginLeft: 4 }}>Background filters</span>
              </span>
            </div>
          </div>

          {/* ── Audio panel ── */}
          <div style={s.audioPanel}>
            {/* Computer audio section — white top card */}
            <div style={s.audioTopCard}>
              <AudioRadio label="Computer audio" selected/>
            </div>

            {/* Device rows — gray bg */}
            <div style={s.deviceSection}>
              <div style={s.deviceRow}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 19 }}>
                  <img src="/icons/mic-off-gray.svg" alt="" width={25} height={25} style={{ display: 'block' }}/>
                  <span style={s.deviceLabel}>MacBook Pro Microphone</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <img src="/icons/chevron-gray.svg" alt="" width={13} height={13} style={{ display: 'block' }}/>
                  <Toggle on={false}/>
                </div>
              </div>
              <div style={s.deviceRow}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 19 }}>
                  <img src="/icons/speaker.svg" alt="" width={24} height={24} style={{ display: 'block' }}/>
                  <span style={s.deviceLabel}>MacBook Pro Speakers</span>
                </div>
                <img src="/icons/chevron-gray.svg" alt="" width={13} height={13} style={{ display: 'block' }}/>
              </div>
            </div>

            {/* Phone audio — separate white card */}
            <div style={s.audioOptionCard}>
              <AudioRadio label="Phone audio" dimmed/>
            </div>

            {/* Don't use audio — separate white card */}
            <div style={s.audioOptionCard}>
              <AudioRadio label="Don't use audio"/>
            </div>
          </div>
        </div>

        {/* action buttons – right-aligned */}
        <div style={s.actionsRow}>
          <button style={s.cancelBtn}>Cancel</button>
          <button style={s.joinBtn} onClick={onJoin}>Join now</button>
        </div>

        {/* need help – bottom-center */}
        <div style={s.helpRow}>
          <a href="#" style={s.helpLink}>Need help?</a>
        </div>
      </div>
    </div>
  )
})

const s = {
  root: {
    width: '100%', height: '100vh',
    display: 'flex', flexDirection: 'column',
    background: C.bg,
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    userSelect: 'none',
  },
  titleBar: {
    height: 44, flexShrink: 0,
    display: 'flex', alignItems: 'center',
    padding: '0 16px',
    background: C.bg,
    borderBottom: `1px solid ${C.borderBar}`,
    position: 'relative',
  },
  trafficLights: { display: 'flex', gap: 7, alignItems: 'center' },
  dot: { width: 12, height: 12, borderRadius: '50%', display: 'inline-block' },
  titleText: {
    marginLeft: 32,
    fontSize: 13, color: C.text, fontWeight: 500,
  },
  ellipsis: { marginLeft: 'auto', color: C.textMuted, fontSize: 16, letterSpacing: 2 },

  identityWrap: {
    display: 'flex', justifyContent: 'center',
    paddingTop: 0, flexShrink: 0,
  },
  identityCard: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 14px',
    background: C.surface,
    borderRadius: '0 0 8px 8px',
    boxShadow: '0 1px 6px rgba(0,0,0,0.10)',
    width: 290,
  },
  identityInfo: { display: 'flex', flexDirection: 'column', flex: 1 },
  identityName: { fontSize: 13, fontWeight: 600, color: C.text },
  identityEmail: { fontSize: 11, color: C.textSub, marginTop: 1 },
  changeBtn: {
    background: 'none', border: 'none',
    color: C.purpleText, fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: 0,
  },

  body: {
    flex: 1,
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '0 32px 0',
    overflowY: 'auto',
  },

  meetingHeader: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    marginTop: 36, marginBottom: 40, gap: 24,
  },
  meetingTitle: { fontSize: 22, fontWeight: 600, color: C.text, margin: 0, textAlign: 'center' },

  columns: {
    display: 'flex', gap: 12,
    width: 908,
    flexShrink: 0,
  },

  cameraPanel: {
    width: 448, flexShrink: 0,
    background: C.surface, borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 1px 6px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.08)',
    display: 'flex', flexDirection: 'column',
  },
  cameraPreview: {
    flex: 1, minHeight: 220,
    background: C.surfaceAlt,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: 8,
    position: 'relative', overflow: 'hidden',
  },
  cameraOffText: { fontSize: 13, fontWeight: 700, color: C.textMuted, margin: 0 },
  cameraControls: {
    display: 'flex', alignItems: 'center',
    padding: '11px 16px',
    borderTop: `1px solid ${C.border}`,
    background: C.surface,
    gap: 12,
  },
  cameraLeft: { display: 'flex', alignItems: 'center', gap: 4 },
  bgFiltersBtn: {
    display: 'flex', alignItems: 'center',
    fontSize: 12, color: C.textMuted, cursor: 'pointer', marginLeft: 8,
  },

  audioPanel: {
    width: 448, flexShrink: 0,
    display: 'flex', flexDirection: 'column', gap: 8,
  },

  audioTopCard: {
    background: C.surface,
    borderRadius: '8px 8px 0 0',
    padding: '28px 22px',
    boxShadow: '0 1px 6px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.08)',
  },
  deviceSection: {
    background: C.surfaceAlt,
    borderRadius: '0 0 8px 8px',
    padding: '24px 22px',
    display: 'flex', flexDirection: 'column', gap: 16,
    boxShadow: '0 1px 6px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.08)',
  },
  deviceRow: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    width: 404,
  },
  deviceLabel: { fontSize: 14, color: C.text2, lineHeight: '25.3px' },
  audioOptionCard: {
    background: C.surface,
    borderRadius: 8,
    padding: '8px 22px',
    boxShadow: '0 1px 6px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.08)',
  },

  actionsRow: {
    display: 'flex', gap: 8, justifyContent: 'flex-end',
    width: 908, flexShrink: 0,
    marginTop: 24,
  },
  cancelBtn: {
    padding: '8px 20px', borderRadius: 4,
    border: `1px solid ${C.borderDark}`,
    background: C.surface,
    fontSize: 14, color: C.text, fontWeight: 500,
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    cursor: 'pointer',
    height: 36,
  },
  joinBtn: {
    padding: '8px 20px', borderRadius: 4,
    border: 'none',
    background: C.purple,
    color: 'white', fontSize: 14, fontWeight: 600,
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(91,95,199,0.35)',
    height: 36,
  },

  helpRow: {
    marginTop: 'auto', paddingBottom: 20, paddingTop: 16,
    display: 'flex', justifyContent: 'center', width: '100%',
  },
  helpLink: {
    fontSize: 12, color: C.purpleText,
    textDecoration: 'underline', cursor: 'pointer',
  },
}

export default JoinScreen
