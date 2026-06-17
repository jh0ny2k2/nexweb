import Ornament from './shared/Ornament'

export default function DressCodeSection({ data, style }) {
  const isDark = style.id === 'gold-luxury'

  return (
    <section className="py-10 px-6" style={{ backgroundColor: isDark ? style.surface : `${style.primary}04` }}>
      <div className="text-center space-y-4 max-w-xs mx-auto">
        <Ornament color={style.secondary} />
        <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>Código de Vestimenta</p>
        <p className="text-sm leading-relaxed" style={{ color: style.textMuted }}>
          {data.dress_code || 'Formal: Traje y corbata para ellos, vestido largo para ellas.'}
        </p>
        <div className="flex justify-center gap-3 pt-2">
          {[style.primary, style.secondary, '#8BA888', '#2C1810', '#D4A5B5'].map((c) => (
            <div key={c} className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
    </section>
  )
}
