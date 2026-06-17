import { Clock } from 'lucide-react'
import Ornament from './shared/Ornament'

export default function ScheduleSection({ data, style }) {
  const items = data.schedule || [
    { time: '16:00', title: 'Ceremonia', desc: 'Iglesia San Miguel' },
    { time: '17:00', title: 'Cóctel', desc: 'Jardines de la Hacienda' },
    { time: '19:00', title: 'Cena', desc: 'Salón principal' },
    { time: '21:00', title: 'Fiesta', desc: 'Pista de baile' },
  ]

  return (
    <section className="px-6 py-10" style={{ backgroundColor: style.bg }}>
      <div className="text-center space-y-4 mb-8">
        <Ornament color={style.secondary} variant={style.ornament} />
        <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>Cronograma</p>
      </div>
      <div className="max-w-xs mx-auto space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="shrink-0 w-16 text-right">
              <span className="text-xs font-bold" style={{ color: style.secondary }}>{item.time}</span>
            </div>
            <div className="w-px h-10 shrink-0" style={{ backgroundColor: style.secondary, opacity: 0.2 }} />
            <div>
              <p className="text-sm font-semibold" style={{ color: style.text }}>{item.title}</p>
              {item.desc && <p className="text-xs mt-0.5" style={{ color: style.textMuted }}>{item.desc}</p>}
            </div>
          </div>
        ))}
      </div>
      <Clock className="w-4 h-4 mx-auto mt-6" style={{ color: style.textMuted, opacity: 0.4 }} />
    </section>
  )
}
