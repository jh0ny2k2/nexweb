import Ornament from './shared/Ornament'

export default function RsvpSection({ data, style }) {
  const isDark = style.id === 'gold-luxury'

  return (
    <section className="py-10 px-6" style={{ backgroundColor: isDark ? style.surface : `${style.primary}04` }}>
      <div className="text-center space-y-4 max-w-xs mx-auto">
        <Ornament color={style.secondary} />
        <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>Confirmación</p>
        <p className="text-sm leading-relaxed" style={{ color: style.textMuted }}>
          Confirma tu asistencia antes del{' '}
          <span className="font-semibold" style={{ color: style.text }}>
            {data.fecha_limite || '1 de Junio de 2026'}
          </span>
        </p>

        <div className="space-y-3 text-left">
          <input
            type="text" placeholder="Tu nombre" readOnly
            className="w-full px-4 py-2.5 rounded-xl text-xs border text-center"
            style={{ borderColor: `${style.secondary}40`, backgroundColor: isDark ? '#0A0A0A' : '#FBF6F0', color: style.text }}
          />
          <input
            type="text" placeholder="Nº de invitados" readOnly
            className="w-full px-4 py-2.5 rounded-xl text-xs border text-center"
            style={{ borderColor: `${style.secondary}40`, backgroundColor: isDark ? '#0A0A0A' : '#FBF6F0', color: style.text }}
          />
          <button
            className="w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider"
            style={{ backgroundColor: style.secondary, color: isDark ? style.primary : '#fff' }}
          >
            Confirmar asistencia
          </button>
        </div>
      </div>
    </section>
  )
}
