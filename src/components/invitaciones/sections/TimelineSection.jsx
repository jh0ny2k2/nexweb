import Ornament from './shared/Ornament'

export default function TimelineSection({ data, style }) {
  const events = data.timeline || [
    { date: 'Enero 2020', title: 'Primer Encuentro', desc: 'Nos conocimos en casa de amigos en común.' },
    { date: 'Marzo 2020', title: 'Primera Cita', desc: 'Nuestra primera cita fue en un café del centro.' },
    { date: 'Julio 2022', title: 'Primer Viaje', desc: 'Viajamos juntos por primera vez a la playa.' },
    { date: 'Diciembre 2024', title: 'Compromiso', desc: 'Dijo que sí en el lugar donde nos conocimos.' },
  ]

  return (
    <section className="px-6 py-10" style={{ backgroundColor: `${style.primary}04` }}>
      <div className="text-center space-y-4 mb-8">
        <Ornament color={style.secondary} />
        <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>Línea de Tiempo</p>
      </div>
      <div className="relative max-w-xs mx-auto">
        <div className="absolute left-[11px] top-2 bottom-2 w-px" style={{ backgroundColor: style.secondary, opacity: 0.3 }} />
        {events.map((evt, i) => (
          <div key={i} className="flex gap-4 pb-6 last:pb-0 relative">
            <div className="shrink-0 w-[24px] flex justify-center pt-0.5">
              <div className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: style.secondary, backgroundColor: style.bg }} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: style.secondary }}>{evt.date}</p>
              <p className="text-sm font-semibold mt-0.5" style={{ color: style.text }}>{evt.title}</p>
              {evt.desc && <p className="text-xs mt-0.5" style={{ color: style.textMuted }}>{evt.desc}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
