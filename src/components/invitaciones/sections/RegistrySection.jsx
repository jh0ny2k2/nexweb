import { Gift } from 'lucide-react'
import Ornament from './shared/Ornament'

export default function RegistrySection({ data, style }) {
  return (
    <section className="px-6 py-10 text-center space-y-4" style={{ backgroundColor: style.bg }}>
      <Ornament color={style.secondary} variant={style.ornament} />
      <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>Mesa de Regalos</p>
      <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: style.textMuted }}>
        {data.registry || 'El mejor regalo es tu presencia, pero si deseas contribuir, tendremos una mesa de regalos disponible.'}
      </p>
      <Gift className="w-5 h-5 mx-auto" style={{ color: style.secondary }} />
    </section>
  )
}
