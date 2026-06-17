import Ornament from './shared/Ornament'

export default function StorySection({ data, style }) {
  return (
    <section className="px-6 py-10 text-center space-y-4" style={{ backgroundColor: style.bg }}>
      <Ornament color={style.secondary} variant={style.ornament} />
      <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>Nuestra Historia</p>
      <h2 className="text-xl sm:text-2xl font-bold" style={{ color: style.text }}>
        {data.novia || 'Ana'} & {data.novio || 'Carlos'}
      </h2>
      <p className="text-sm leading-relaxed italic max-w-xs mx-auto" style={{ color: style.textMuted }}>
        &ldquo;{data.historia || 'Nos conocimos y supimos que era para siempre.'}&rdquo;
      </p>
    </section>
  )
}
