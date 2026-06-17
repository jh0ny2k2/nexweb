import { MessageCircle } from 'lucide-react'
import Ornament from './shared/Ornament'

const SAMPLE_MESSAGES = [
  { name: 'Lucía M.', message: '¡Felicidades! Estoy muy feliz por ustedes 💕', date: 'Hace 2 días' },
  { name: 'Carlos G.', message: 'Que hermoso amor. Nos vemos en la boda 🥂', date: 'Hace 5 días' },
  { name: 'Ana R.', message: 'Son el uno para el otro. Bendiciones 🙏', date: 'Hace 1 semana' },
]

export default function GuestMessagesSection({ data, style }) {
  const isDark = style.id === 'gold-luxury'

  return (
    <section className="px-6 py-10" style={{ backgroundColor: isDark ? style.surface : `${style.primary}04` }}>
      <div className="text-center space-y-4 mb-6">
        <Ornament color={style.secondary} variant={style.ornament} />
        <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>Dedicatorias</p>
        <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: style.textMuted }}>
          Deja un mensaje para los novios
        </p>
      </div>
      <div className="max-w-xs mx-auto space-y-3 mb-4">
        {SAMPLE_MESSAGES.map((m, i) => (
          <div key={i} className="p-3 rounded-xl" style={{ backgroundColor: isDark ? '#0A0A0A' : '#FBF6F0' }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold" style={{ color: style.text }}>{m.name}</span>
              <span className="text-[9px]" style={{ color: style.textMuted }}>{m.date}</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: style.textMuted }}>{m.message}</p>
          </div>
        ))}
      </div>
      <div className="max-w-xs mx-auto">
        <textarea
          placeholder="Escribe tu mensaje..." readOnly
          rows={2}
          className="w-full px-4 py-2.5 rounded-xl text-xs border resize-none"
          style={{ borderColor: `${style.secondary}30`, backgroundColor: isDark ? '#0A0A0A' : '#FBF6F0', color: style.text }}
        />
        <button
          className="w-full mt-2 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider"
          style={{ backgroundColor: style.secondary, color: isDark ? style.primary : '#fff' }}
        >
          Enviar mensaje
        </button>
      </div>
      <MessageCircle className="w-4 h-4 mx-auto mt-6" style={{ color: style.textMuted, opacity: 0.4 }} />
    </section>
  )
}
