import React, { forwardRef } from 'react'

function AvatarPlaceholder({ size, initials }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ borderRadius: '50%', flexShrink: 0 }}>
      <circle cx="20" cy="20" r="20" fill="#6264a7" />
      <text x="20" y="25" textAnchor="middle" fill="white" fontSize="14" fontFamily="-apple-system,sans-serif" fontWeight="600">
        {initials}
      </text>
    </svg>
  )
}

const JoinScreen = forwardRef(function JoinScreen({ onJoin }, ref) {
  return (
    <div ref={ref} style={styles.root}>
      {/* title bar */}
      <div style={styles.titleBar}>
        <div style={styles.trafficLights}>
          <span style={{ ...styles.dot, background: '#ff5f56' }} />
          <span style={{ ...styles.dot, background: '#ffbd2e' }} />
          <span style={{ ...styles.dot, background: '#27c93f' }} />
        </div>
        <span style={styles.titleText}>Meeting with Christina Lu</span>
        <span style={styles.ellipsis}>···</span>
      </div>

      {/* content */}
      <div style={styles.body}>
        {/* identity card */}
        <div style={styles.identityCard}>
          <AvatarPlaceholder size={36} initials="CL" />
          <div style={styles.identityInfo}>
            <span style={styles.identityName}>Christina Lu</span>
            <span style={styles.identityEmail}>christina.tn.lu@gma…</span>
          </div>
          <button style={styles.changeBtn}>Change</button>
        </div>

        {/* Teams logo + meeting name */}
        <div style={styles.meetingHeader}>
          <TeamsIcon />
          <h2 style={styles.meetingTitle}>Meeting with Christina Lu</h2>
        </div>

        {/* two-column layout */}
        <div style={styles.columns}>
          {/* left: camera preview */}
          <div style={styles.cameraPanel}>
            <div style={styles.cameraPreview}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M21 7.5L15 12l6 4.5V7.5Z" fill="#888"/>
                <rect x="3" y="6" width="13" height="12" rx="2" fill="#888"/>
                <line x1="2" y1="2" x2="22" y2="22" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p style={styles.cameraOffText}>Your camera is turned off</p>
            </div>
            <div style={styles.cameraControls}>
              <div style={styles.cameraLeft}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 7.5L15 12l6 4.5V7.5Z" fill="#555"/>
                  <rect x="3" y="6" width="13" height="12" rx="2" fill="#555"/>
                  <line x1="2" y1="2" x2="22" y2="22" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#555" style={{ marginLeft: 2 }}>
                  <path d="M7 10l5 5 5-5H7z"/>
                </svg>
                <div style={styles.toggleTrack}>
                  <div style={styles.toggleThumb} />
                </div>
              </div>
              <span style={styles.bgFilters}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: 6 }}>
                  <circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="2"/>
                  <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Background filters
              </span>
            </div>
          </div>

          {/* right: audio settings */}
          <div style={styles.audioPanel}>
            <AudioOption label="Computer audio" selected />
            <div style={styles.audioDivider} />
            <div style={styles.deviceRow}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" stroke="#555" strokeWidth="2"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="19" x2="12" y2="23" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
                <line x1="8" y1="23" x2="16" y2="23" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span style={styles.deviceLabel}>MacBook Pro Microphone</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#555"><path d="M7 10l5 5 5-5H7z"/></svg>
              <div style={{ ...styles.toggleTrack, marginLeft: 'auto', background: '#6264a7' }}>
                <div style={{ ...styles.toggleThumb, left: 18 }} />
              </div>
            </div>
            <div style={styles.deviceRow}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="#555" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span style={styles.deviceLabel}>MacBook Pro Speakers</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#555"><path d="M7 10l5 5 5-5H7z"/></svg>
            </div>
            <div style={styles.audioDivider} />
            <AudioOption label="Phone audio" />
            <div style={styles.audioDivider} />
            <AudioOption label="Don't use audio" />
          </div>
        </div>

        {/* footer */}
        <div style={styles.footer}>
          <a href="#" style={styles.helpLink}>Need help?</a>
          <div style={styles.footerButtons}>
            <button style={styles.cancelBtn}>Cancel</button>
            <button style={styles.joinBtn} onClick={onJoin}>Join now</button>
          </div>
        </div>
      </div>
    </div>
  )
})

function AudioOption({ label, selected }) {
  return (
    <div style={styles.audioOption}>
      <div style={{
        ...styles.radioOuter,
        borderColor: selected ? '#6264a7' : '#999',
      }}>
        {selected && <div style={styles.radioInner} />}
      </div>
      <span style={styles.audioLabel}>{label}</span>
    </div>
  )
}

function TeamsIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={{ marginBottom: 8 }}>
      <circle cx="28" cy="14" r="8" fill="#5059c9"/>
      <circle cx="28" cy="14" r="5" fill="white"/>
      <text x="26" y="18" fontFamily="sans-serif" fontSize="8" fill="#5059c9" fontWeight="bold">T</text>
      <circle cx="18" cy="18" r="10" fill="#6264a7"/>
      <text x="13" y="23" fontFamily="sans-serif" fontSize="12" fill="white" fontWeight="bold">T</text>
    </svg>
  )
}

const styles = {
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#f5f5f5',
    userSelect: 'none',
  },
  titleBar: {
    height: 44,
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    background: '#f5f5f5',
    position: 'relative',
    flexShrink: 0,
  },
  trafficLights: {
    display: 'flex',
    gap: 7,
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    display: 'inline-block',
  },
  titleText: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: 13,
    color: '#222',
    fontWeight: 500,
  },
  ellipsis: {
    marginLeft: 'auto',
    color: '#888',
    fontSize: 16,
    letterSpacing: 2,
  },
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 32px 32px',
    overflowY: 'auto',
  },
  identityCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 16px',
    background: 'white',
    borderRadius: 8,
    boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
    marginBottom: 24,
    marginTop: 8,
    alignSelf: 'center',
    minWidth: 280,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  identityInfo: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  identityName: {
    fontSize: 13,
    fontWeight: 600,
    color: '#111',
  },
  identityEmail: {
    fontSize: 11,
    color: '#666',
  },
  changeBtn: {
    background: 'none',
    border: 'none',
    color: '#6264a7',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    padding: 0,
  },
  meetingHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  meetingTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: '#111',
  },
  columns: {
    display: 'flex',
    gap: 12,
    width: '100%',
    maxWidth: 820,
    alignSelf: 'center',
    marginBottom: 20,
  },
  cameraPanel: {
    flex: 1,
    background: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
  },
  cameraPreview: {
    flex: 1,
    minHeight: 220,
    background: '#f0f0f0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  cameraOffText: {
    fontSize: 13,
    color: '#555',
  },
  cameraControls: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 14px',
    borderTop: '1px solid #eee',
    gap: 12,
  },
  cameraLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  toggleTrack: {
    width: 36,
    height: 20,
    background: '#ccc',
    borderRadius: 10,
    position: 'relative',
    cursor: 'pointer',
  },
  toggleThumb: {
    width: 16,
    height: 16,
    background: 'white',
    borderRadius: '50%',
    position: 'absolute',
    top: 2,
    left: 2,
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  },
  bgFilters: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
    color: '#888',
    marginLeft: 8,
  },
  audioPanel: {
    flex: 1,
    background: 'white',
    borderRadius: 8,
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    overflow: 'hidden',
  },
  audioOption: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 18px',
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: '50%',
    border: '2px solid #999',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#6264a7',
  },
  audioLabel: {
    fontSize: 14,
    color: '#222',
  },
  audioDivider: {
    height: 1,
    background: '#eee',
    margin: '0 0',
  },
  deviceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 18px',
  },
  deviceLabel: {
    fontSize: 13,
    color: '#333',
    flex: 1,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 820,
    alignSelf: 'center',
    marginTop: 4,
  },
  helpLink: {
    fontSize: 12,
    color: '#6264a7',
    textDecoration: 'underline',
  },
  footerButtons: {
    display: 'flex',
    gap: 10,
  },
  cancelBtn: {
    padding: '9px 22px',
    borderRadius: 4,
    border: '1px solid #ccc',
    background: 'white',
    fontSize: 14,
    color: '#222',
    fontWeight: 500,
  },
  joinBtn: {
    padding: '9px 22px',
    borderRadius: 4,
    background: '#6264a7',
    color: 'white',
    fontSize: 14,
    fontWeight: 600,
    boxShadow: '0 2px 6px rgba(98,100,167,0.35)',
    transition: 'background 0.15s',
  },
}

export default JoinScreen
