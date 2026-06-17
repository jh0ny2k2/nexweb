import { Bed } from 'lucide-react'
import Ornament from './shared/Ornament'

export default function AccommodationSection({ data, style }) {
  const hotels = data.hotels || [
    { name: 'Hotel Boutique El Jardín', address: 'Calle Principal 123', discount: '10% de descuento' },
    { name: 'Posada del Valle', address: 'Carretera Nacional km 5', discount: 'Transporte incluido' },
  ]

  return (
    <section className="px-6 py-10" style={{ backgroundColor: `${style.primary}04` }}>
      <div className="text-center space-y-4 mb-8">
        <Ornament color={style.secondary} />
        <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>Hospedaje</p>
        <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: style.textMuted }}>
          Recomendaciones para invitados que vienen de fuera
        </p>
      </div>
      <div className="max-w-xs mx-auto space-y-4">
        {hotels.map((h, i) => (
          <div key={i} className="p-4 rounded-xl" style={{ backgroundColor: style.surface, border: `1px solid ${style.secondary}15` }}>
            <p className="text-sm font-semibold" style={{ color: style.text }}>{h.name}</p>
            <p className="text-xs mt-1" style={{ color: style.textMuted }}>{h.address}</p>
            {h.discount && (
              <p className="text-[10px] mt-1 font-medium" style={{ color: style.secondary }}>{h.discount}</p>
            )}
          </div>
        ))}
      </div>
      <Bed className="w-4 h-4 mx-auto mt-6" style={{ color: style.textMuted, opacity: 0.4 }} />
    </section>
  )
}
