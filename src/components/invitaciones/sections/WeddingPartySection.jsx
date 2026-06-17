import { Users } from 'lucide-react'
import Ornament from './shared/Ornament'

export default function WeddingPartySection({ data, style }) {
  const members = data.weddingParty || [
    { name: 'María & Juan', role: 'Padrinos de Velación' },
    { name: 'Laura & Pedro', role: 'Padrinos de Arras' },
    { name: 'Sofía & Diego', role: 'Damas de Honor' },
  ]

  return (
    <section className="px-6 py-10 text-center space-y-6" style={{ backgroundColor: style.bg }}>
      <Ornament color={style.secondary} />
      <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>Cortejo</p>
      <div className="max-w-xs mx-auto space-y-4">
        {members.map((m, i) => (
          <div key={i} className="p-3 rounded-xl" style={{ backgroundColor: `${style.primary}06`, border: `1px solid ${style.secondary}15` }}>
            <p className="text-sm font-semibold" style={{ color: style.text }}>{m.name}</p>
            <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: style.secondary }}>{m.role}</p>
          </div>
        ))}
      </div>
      <Users className="w-4 h-4 mx-auto" style={{ color: style.textMuted, opacity: 0.4 }} />
    </section>
  )
}
