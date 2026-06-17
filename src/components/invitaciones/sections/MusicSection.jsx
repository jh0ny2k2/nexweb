import { Music } from 'lucide-react'
import Ornament from './shared/Ornament'

export default function MusicSection({ data, style }) {
  const isDark = style.id === 'gold-luxury'

  return (
    <section className="py-10 px-6 text-center space-y-3" style={{ backgroundColor: isDark ? style.surface : `${style.primary}08` }}>
      <Music className="w-4 h-4 mx-auto" style={{ color: style.secondary }} />
      <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>Nuestra Canción</p>
      <p className="text-sm italic" style={{ color: style.text }}>
        &ldquo;{data.musica || 'Perfect — Ed Sheeran'}&rdquo;
      </p>
      <button
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium mt-2"
        style={{ backgroundColor: `${style.secondary}20`, color: style.secondary }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
        Escuchar
      </button>
    </section>
  )
}
