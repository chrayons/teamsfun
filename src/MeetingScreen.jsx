import React from 'react'

function AvatarPlaceholder({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" style={{ borderRadius: '50%', display: 'block' }}>
      <circle cx="80" cy="80" r="80" fill="#6264a7" />
      <circle cx="80" cy="65" r="28" fill="white" opacity="0.9" />
      <ellipse cx="80" cy="130" rx="46" ry="38" fill="white" opacity="0.9" />
    </svg>
  )
}

export default function MeetingScreen() {
  return (
    <div style={styles.root}>
      {/* title bar */}
      <div style={styles.titleBar}>
        <div style={styles.trafficLights}>
          <span style={{ ...styles.dot, background: '#ff5f56' }} />
          <span style={{ ...styles.dot, background: '#ffbd2e' }} />
          <span style={{ ...styles.dot, background: '#27c93f' }} />
        </div>
        <span style={styles.titleText}>Meeting with Christina Lu</span>
      </div>

      {/* toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.timerArea}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: 6 }}>
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" stroke="white" strokeWidth="2"/>
            <path d="m12 6 0 6 4 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span style={styles.timer}>00:08</span>
        </div>
        <div style={styles.toolbarCenter}>
          {TOOLBAR_ITEMS.map(item => (
            <ToolbarButton key={item.label} icon={item.icon} label={item.label} active={item.active} danger={item.danger} />
          ))}
        </div>
        <div style={styles.toolbarRight}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 9l-7 7-7-7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* main content */}
      <div style={styles.content}>
        <div style={styles.participantTile}>
          <AvatarPlaceholder size={160} />
        </div>
        <p style={styles.waitingText}>Waiting for others to join...</p>
      </div>
    </div>
  )
}

function ToolbarButton({ icon, label, active, danger }) {
  return (
    <div style={{ ...styles.toolBtn, ...(active ? styles.toolBtnActive : {}), ...(danger ? styles.toolBtnDanger : {}) }}>
      <div style={styles.toolBtnIcon}>{icon}</div>
      <span style={styles.toolBtnLabel}>{label}</span>
    </div>
  )
}

// icon components
const RecordIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="5" fill="white"/>
    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
    <circle cx="18" cy="6" r="3" fill="#6264a7"/>
  </svg>
)
const ChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
)
const PeopleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/>
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)
const RaiseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const ReactIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="9" y1="9" x2="9.01" y2="9" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <line x1="15" y1="9" x2="15.01" y2="9" stroke="white" strokeWidth="3" strokeLinecap="round"/>
  </svg>
)
const ViewIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="2"/>
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="2"/>
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="2"/>
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="2"/>
  </svg>
)
const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="5" cy="12" r="1.5" fill="white"/>
    <circle cx="12" cy="12" r="1.5" fill="white"/>
    <circle cx="19" cy="12" r="1.5" fill="white"/>
  </svg>
)
const CameraIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M23 7l-7 5 7 5V7Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
    <rect x="1" y="5" width="15" height="14" rx="2" stroke="white" strokeWidth="2"/>
    <line x1="1" y1="1" x2="23" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)
const MicOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" stroke="white" strokeWidth="2"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="8" y1="23" x2="16" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="2" y1="2" x2="22" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)
const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <polyline points="16 6 12 2 8 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="2" x2="12" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)
const LeaveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <polyline points="16 17 21 12 16 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="21" y1="12" x2="9" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const TOOLBAR_ITEMS = [
  { label: 'Record', icon: <RecordIcon /> },
  { label: 'Chat', icon: <ChatIcon /> },
  { label: 'People', icon: <PeopleIcon /> },
  { label: 'Raise', icon: <RaiseIcon /> },
  { label: 'React', icon: <ReactIcon /> },
  { label: 'View', icon: <ViewIcon /> },
  { label: 'More', icon: <MoreIcon /> },
  { label: 'Camera', icon: <CameraIcon /> },
  { label: 'Mic', icon: <MicOffIcon />, active: true },
  { label: 'Share', icon: <ShareIcon /> },
  { label: 'Leave', icon: <LeaveIcon />, danger: true },
]

const styles = {
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#f5f5f5',
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
  toolbar: {
    height: 68,
    background: '#1f1f1f',
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    flexShrink: 0,
    position: 'relative',
  },
  timerArea: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    fontSize: 13,
    minWidth: 70,
  },
  timer: {
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 500,
  },
  toolbarCenter: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  toolbarRight: {
    minWidth: 70,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  toolBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    padding: '6px 10px',
    borderRadius: 6,
    cursor: 'pointer',
    minWidth: 52,
  },
  toolBtnActive: {
    background: 'rgba(255,255,255,0.15)',
    outline: '2px solid white',
    outlineOffset: -2,
  },
  toolBtnDanger: {
    background: '#c50f1f',
    borderRadius: 6,
  },
  toolBtnIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 22,
  },
  toolBtnLabel: {
    fontSize: 10,
    color: 'white',
    fontWeight: 500,
    letterSpacing: 0.2,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  participantTile: {
    width: 160,
    height: 160,
    borderRadius: '50%',
    overflow: 'hidden',
    boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
  },
  participantAvatar: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  waitingText: {
    fontSize: 17,
    fontWeight: 600,
    color: '#222',
  },
}
