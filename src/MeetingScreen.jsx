import React from 'react'

const C = {
  purple:   '#5B5FC7',
  bg:       '#F5F5F5',
  titleBar: '#EBEBEB',
  text:     '#242424',
  ctrl:     '#424242',
  border:   '#E0E0E0',
  leave:    '#C50F1F',
}

function UserAvatar({ size }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'linear-gradient(145deg, #7B83EB, #4B53BC)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.14)',
    }}>
      <span style={{
        color: 'white', fontSize: size * 0.3, fontWeight: 600,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        letterSpacing: '1px',
      }}>TF</span>
    </div>
  )
}

// A single toolbar button: icon + label stacked
function ToolBtn({ icon, label }) {
  return (
    <div style={s.toolBtn}>
      <div style={s.toolIcon}>{icon}</div>
      <span style={s.toolLabel}>{label}</span>
    </div>
  )
}

function Icon({ src, w = 24, h = 24 }) {
  return <img src={src} alt="" width={w} height={h} style={{ display: 'block' }}/>
}

function ChevronDown() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 24, alignSelf: 'stretch' }}>
      <Icon src="/icons/chevron-dark.svg" w={12} h={12}/>
    </div>
  )
}

// Camera group: icon+label  +  chevron
function CameraGroup() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ ...s.toolBtn, marginRight: -4 }}>
        <div style={s.toolIcon}><Icon src="/icons/video-off.svg"/></div>
        <span style={s.toolLabel}>Camera</span>
      </div>
      <ChevronDown/>
    </div>
  )
}

// Mic group: icon+label (with active border box)  +  chevron
function MicGroup() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        border: `2px solid ${C.ctrl}`, borderRadius: 4,
        padding: '4px 8px', marginRight: -4,
      }}>
        <div style={s.toolBtn}>
          <div style={s.toolIcon}><Icon src="/icons/mic-off.svg"/></div>
          <span style={s.toolLabel}>Mic</span>
        </div>
      </div>
      <ChevronDown/>
    </div>
  )
}

// Leave group: icon+label  +  chevron
function LeaveGroup() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={s.toolBtn}>
        <div style={s.toolIcon}><Icon src="/icons/call-end.svg" w={24} h={19}/></div>
        <span style={s.toolLabel}>Leave</span>
      </div>
      <ChevronDown/>
    </div>
  )
}

export default function MeetingScreen() {
  return (
    <div style={s.root}>
      {/* macOS title bar — slightly darker per Figma */}
      <div style={s.titleBar}>
        <div style={s.trafficLights}>
          <span style={{ ...s.dot, background: '#FF5F57' }}/>
          <span style={{ ...s.dot, background: '#FEBC2E' }}/>
          <span style={{ ...s.dot, background: '#28C840' }}/>
        </div>
        <span style={s.titleText}>Meeting with Reve x Design Meetup</span>
        <span style={s.ellipsis}>···</span>
      </div>

      {/* toolbar — white, with shadow; timer far left, controls pushed to right */}
      <div style={s.toolbar}>
        {/* left: shield + timer */}
        <div style={s.timerArea}>
          <Icon src="/icons/shield.svg" w={20} h={20}/>
          <span style={s.timer}>00:11</span>
        </div>

        {/* right: all controls — gap 24 between groups, Camera/Mic/Share tighter at gap 8 */}
        <div style={s.toolbarControls}>
          <ToolBtn icon={<Icon src="/icons/record.svg"/>}  label="Record"/>
          <ToolBtn icon={<Icon src="/icons/chat.svg"/>}    label="Chat"/>
          <ToolBtn icon={<Icon src="/icons/person.svg"/>}  label="People"/>
          <ToolBtn icon={<Icon src="/icons/hand.svg"/>}    label="Raise"/>
          <ToolBtn icon={<Icon src="/icons/emoji.svg"/>}   label="React"/>
          <ToolBtn icon={<Icon src="/icons/grid.svg"/>}    label="View"/>
          <ToolBtn icon={<Icon src="/icons/more.svg"/>}    label="More"/>

          <div style={s.divider}/>

          {/* Camera, Mic, Share sub-group — tighter gap */}
          <div style={s.camMicGroup}>
            <CameraGroup/>
            <MicGroup/>
            <ToolBtn icon={<Icon src="/icons/share.svg"/>} label="Share"/>
          </div>

          <div style={s.divider}/>

          <LeaveGroup/>
        </div>
      </div>

      {/* main content */}
      <div style={s.content}>
        <UserAvatar size={160}/>
        <p style={s.waitingText}>Waiting for others to join…</p>
      </div>
    </div>
  )
}

const s = {
  root: {
    width: '100%', height: '100vh',
    display: 'flex', flexDirection: 'column',
    background: C.bg,
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  titleBar: {
    height: 44, flexShrink: 0,
    display: 'flex', alignItems: 'center',
    padding: '0 16px',
    background: C.titleBar,
    borderBottom: '1px solid #E9E9E9',
    position: 'relative',
  },
  trafficLights: { display: 'flex', gap: 7, alignItems: 'center' },
  dot: { width: 12, height: 12, borderRadius: '50%', display: 'inline-block' },
  titleText: {
    marginLeft: 32,
    fontSize: 13, color: C.text, fontWeight: 500,
  },
  ellipsis: { marginLeft: 'auto', color: '#8A8886', fontSize: 16, letterSpacing: 2 },

  toolbar: {
    height: 52, flexShrink: 0,
    background: '#FFFFFF',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '8px 16px',
  },
  timerArea: {
    display: 'flex', alignItems: 'center', gap: 4,
    color: C.ctrl, fontSize: 13, fontWeight: 500,
  },
  timer: { fontVariantNumeric: 'tabular-nums' },

  // All controls right-aligned; gap-24 between button groups
  toolbarControls: {
    display: 'flex', alignItems: 'center', gap: 24,
  },
  // Camera + Mic + Share tighter sub-group
  camMicGroup: {
    display: 'flex', alignItems: 'center', gap: 8,
  },
  divider: {
    width: 1, height: 28, background: C.border,
  },

  toolBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: 4, cursor: 'pointer',
  },
  toolIcon: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', height: 24,
  },
  toolLabel: {
    fontSize: 12, color: C.ctrl, fontWeight: 400, whiteSpace: 'nowrap',
  },

  content: {
    flex: 1,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: 56,
  },
  waitingText: {
    fontSize: 24, fontWeight: 600, color: C.text, margin: 0,
  },
}
