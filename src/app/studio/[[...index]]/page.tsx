'use client'

import dynamic from 'next/dynamic'

import config from '../../../../sanity.config'

const NextStudio = dynamic(() => import('next-sanity/studio').then((mod) => mod.NextStudio), {
  ssr: false,
  loading: () => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      fontSize: '18px',
      color: '#666'
    }}>
      Loading Studio...
    </div>
  )
})

export default function StudioPage() {
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      background: 'white'
    }}>
      <NextStudio config={config} />
    </div>
  )
}
