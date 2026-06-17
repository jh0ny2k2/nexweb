import { Heart } from 'lucide-react'
import Ornament from './shared/Ornament'

export default function ThankYouSection({ data, style }) {
  const isDark = style.id === 'gold-luxury'

  return (
    <section className="py-10 px-6 text-center space-y-4"
      style={{
        background: isDark
          ? `linear-gradient(180deg, ${style.primary} 0%, #000 100%)`
          : style.primary,
      }}
    >
      <p className="text-xs tracking-[0.15em] uppercase" style={{ color: style.secondary, opacity: 0.8 }}>
        # {data.hashtag || 'Ana&Carlos2026'}
      </p>
      <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
        Gracias por ser parte de nuestra historia. Nos vemos en el altar.
      </p>
      <div className="flex justify-center gap-3 pt-2">
        <Heart className="w-4 h-4" style={{ color: style.secondary, opacity: 0.6 }} />
      </div>
      <p className="text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
        Creado con Eterno
      </p>
    </section>
  )
}
