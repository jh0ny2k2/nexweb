import { useMemo, useEffect } from 'react'
import { SECTION_MAP, DEFAULT_SECTIONS } from './sections'

const STYLES = [
  {
    id: 'clasico-eterno', name: 'Clásico Eterno',
    primary: '#7A1A2E', secondary: '#C4956A', bg: '#FBF6F0', surface: '#fff',
    text: '#2C1810', textMuted: '#7A6A68',
  },
  {
    id: 'rustico-encanto', name: 'Rústico Encanto',
    primary: '#5C3D2E', secondary: '#8BA888', bg: '#F8F5F0', surface: '#fff',
    text: '#3D2C1A', textMuted: '#7A6A5A',
  },
  {
    id: 'moderno-minimal', name: 'Moderno Minimal',
    primary: '#1A1A2E', secondary: '#B0B0C0', bg: '#FAFAFC', surface: '#fff',
    text: '#1A1A2E', textMuted: '#7A7A8A',
  },
  {
    id: 'gold-luxury', name: 'Gold Luxury',
    primary: '#0A0A0A', secondary: '#D4AF37', bg: '#0A0A0A', surface: '#151515',
    text: '#F0EDE8', textMuted: '#8A8682',
  },
  {
    id: 'romance-vintage', name: 'Romance Vintage',
    primary: '#8B4A5E', secondary: '#D4A5B5', bg: '#FDF8FA', surface: '#fff',
    text: '#4A2A30', textMuted: '#8C7A7E',
  },
]

export default function WeddingPreview({ data, selectedStyle, sections: sectionsProp }) {
  const style = useMemo(() => STYLES.find((s) => s.id === selectedStyle) || STYLES[0], [selectedStyle])
  const sections = sectionsProp || DEFAULT_SECTIONS

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--pv-primary', style.primary)
    root.style.setProperty('--pv-secondary', style.secondary)
    root.style.setProperty('--pv-bg', style.bg)
    root.style.setProperty('--pv-surface', style.surface)
    root.style.setProperty('--pv-text', style.text)
    root.style.setProperty('--pv-text-muted', style.textMuted)
  }, [style])

  const styleObj = { ...style, isDark: style.id === 'gold-luxury' }

  return (
    <div
      className="w-full max-w-[500px] mx-auto rounded-2xl overflow-hidden shadow-2xl"
      style={{ backgroundColor: style.bg, color: style.text, fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      <div className="max-h-[620px] overflow-y-auto">
        {sections.map((id) => {
          const entry = SECTION_MAP[id]
          if (!entry) return null
          const { Component } = entry
          return <Component key={id} data={data} style={styleObj} />
        })}
      </div>
    </div>
  )
}
