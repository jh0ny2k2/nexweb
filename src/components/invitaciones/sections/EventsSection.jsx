import { Heart, MapPin, CalendarDays } from 'lucide-react'
import Ornament from './shared/Ornament'

export default function EventsSection({ data, style }) {
  const isDark = style.id === 'gold-luxury'

  return (
    <section className="py-10 px-6" style={{ backgroundColor: isDark ? style.surface : `${style.primary}04` }}>
      <div className="text-center space-y-6 max-w-xs mx-auto">
        <Ornament color={style.secondary} />
        <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>La Boda</p>

        {[
          { icon: Heart, title: 'Ceremonia', time: data.hora_ceremonia || '17:00 h', location: data.lugar_ceremonia || 'Iglesia San Miguel' },
          { icon: CalendarDays, title: 'Recepción', time: data.hora_recepcion || '19:30 h', location: data.lugar_recepcion || 'Hacienda Los Olivos' },
        ].map((evt) => (
          <div key={evt.title} className="text-center">
            <evt.icon className="w-4 h-4 mx-auto mb-2" style={{ color: style.secondary }} />
            <p className="text-xs font-bold tracking-[0.15em] uppercase mb-1" style={{ color: style.text }}>{evt.title}</p>
            <p className="text-xs" style={{ color: style.secondary }}>{evt.time}</p>
            <p className="text-xs mt-1" style={{ color: style.textMuted }}>{evt.location}</p>
          </div>
        ))}

        {(data.hora_ceremonia || data.lugar_ceremonia || data.hora_recepcion || data.lugar_recepcion) && (
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(data.lugar_ceremonia || data.lugar_recepcion || '')}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider mt-2"
            style={{ color: style.secondary }}
          >
            <MapPin className="w-3 h-3" />
            Ver en mapa
          </a>
        )}
      </div>
    </section>
  )
}
