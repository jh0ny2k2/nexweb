import { MapPin } from 'lucide-react'
import Ornament from './shared/Ornament'

export default function LocationSection({ data, style }) {
  return (
    <section className="px-6 py-10 text-center space-y-4" style={{ backgroundColor: style.bg }}>
      <Ornament color={style.secondary} />
      <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>Ubicación</p>
      <div className="space-y-4 max-w-xs mx-auto">
        {[
          { label: 'Ceremonia', location: data.lugar_ceremonia || 'Iglesia San Miguel' },
          { label: 'Recepción', location: data.lugar_recepcion || 'Hacienda Los Olivos' },
        ].map((l, i) => (
          <div key={i} className="flex items-start gap-3 text-left">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: style.secondary }} />
            <div>
              <p className="text-xs font-semibold" style={{ color: style.text }}>{l.label}</p>
              <p className="text-xs mt-0.5" style={{ color: style.textMuted }}>{l.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
