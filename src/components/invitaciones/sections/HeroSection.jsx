import Countdown from './shared/Countdown'

export default function HeroSection({ data, style }) {
  const isDark = style.id === 'gold-luxury'

  return (
    <section
      className="relative min-h-[400px] flex flex-col items-center justify-center text-center px-8 py-16"
      style={{
        background: isDark
          ? `linear-gradient(180deg, ${style.primary} 0%, #1A0A0A 100%)`
          : `linear-gradient(180deg, ${style.primary} 0%, ${style.primary}DD 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 space-y-6">
        <p className="text-xs tracking-[0.25em] uppercase" style={{ color: style.secondary, opacity: 0.8 }}>
          Save the Date
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: '#fff' }}>
          {data.novia || 'Ana'}
          {(data.novia || data.novio) && <><span className="block text-sm font-normal mt-2 tracking-[0.2em]" style={{ color: style.secondary }}>&#10022;</span></>}
          {data.novio || 'Carlos'}
        </h1>

        <div className="w-12 h-px mx-auto" style={{ backgroundColor: style.secondary, opacity: 0.4 }} />

        <p className="text-sm tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.7)' }}>
          {data.fecha || '15 de Junio de 2026'}
        </p>

        {data.fecha && (
          <div className="pt-2">
            <Countdown targetDate={data.fecha} />
          </div>
        )}
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center" style={{ animation: 'bounce 3s infinite' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M8 13l4-4M8 13l-4-4" stroke={style.secondary} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        </svg>
      </div>
    </section>
  )
}
