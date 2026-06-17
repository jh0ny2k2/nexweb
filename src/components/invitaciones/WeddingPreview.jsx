import { useState, useEffect, useMemo } from 'react'
import { Heart, CalendarDays, MapPin, Music, Camera, Gift, Check } from 'lucide-react'

function Ornament({ color = '#C4956A' }) {
  return (
    <svg viewBox="0 0 160 16" className="h-4 mx-auto" style={{ width: '140px' }}>
      <path d="M0,8 L55,8" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <circle cx="60" cy="8" r="2.5" fill="none" stroke={color} strokeWidth="0.6" opacity="0.7" />
      <path d="M66,3 Q70,0 74,3 Q78,6 74,9 Q70,12 66,9 Q62,6 66,3" fill="none" stroke={color} strokeWidth="0.7" opacity="0.6" />
      <circle cx="80" cy="8" r="3" fill="none" stroke={color} strokeWidth="0.6" opacity="0.3" />
      <path d="M86,3 Q90,0 94,3 Q98,6 94,9 Q90,12 86,9 Q82,6 86,3" fill="none" stroke={color} strokeWidth="0.7" opacity="0.6" />
      <circle cx="100" cy="8" r="2.5" fill="none" stroke={color} strokeWidth="0.6" opacity="0.7" />
      <path d="M105,8 L160,8" stroke={color} strokeWidth="0.5" opacity="0.4" />
    </svg>
  )
}

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 })

  useEffect(() => {
    if (!targetDate) return
    const target = new Date(targetDate.split('/').reverse().join('-'))
    const tick = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) return
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
      })
    }
    tick()
    const id = setInterval(tick, 60000)
    return () => clearInterval(id)
  }, [targetDate])

  return (
    <div className="flex gap-6 justify-center">
      {[
        { label: 'Días', value: timeLeft.days },
        { label: 'Horas', value: timeLeft.hours },
        { label: 'Minutos', value: timeLeft.minutes },
      ].map((t) => (
        <div key={t.label} className="text-center">
          <div className="text-2xl sm:text-3xl font-bold tracking-wider" style={{ color: '#fff' }}>
            {String(t.value).padStart(2, '0')}
          </div>
          <div className="text-[9px] uppercase tracking-[0.2em] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {t.label}
          </div>
        </div>
      ))}
    </div>
  )
}

const GALLERY_PHOTOS = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&q=80',
  'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400&q=80',
  'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=400&q=80',
]

const STYLES = [
  {
    id: 'clasico-eterno', name: 'Clásico Eterno',
    primary: '#7A1A2E', secondary: '#C4956A', bg: '#FBF6F0', surface: '#fff',
    text: '#2C1810', textMuted: '#7A6A68',
  },
  {
    id: 'rustico-encanto', name: 'Rústico Encanto',
    primary: '#5C3D2E', secondary: '#8BA888', bg: '#F8F5F0', surface: '#fff',
    text: '#3D2C1A', textMuted: '#7A6A5A',
  },
  {
    id: 'moderno-minimal', name: 'Moderno Minimal',
    primary: '#1A1A2E', secondary: '#B0B0C0', bg: '#FAFAFC', surface: '#fff',
    text: '#1A1A2E', textMuted: '#7A7A8A',
  },
  {
    id: 'gold-luxury', name: 'Gold Luxury',
    primary: '#0A0A0A', secondary: '#D4AF37', bg: '#0A0A0A', surface: '#151515',
    text: '#F0EDE8', textMuted: '#8A8682',
  },
  {
    id: 'romance-vintage', name: 'Romance Vintage',
    primary: '#8B4A5E', secondary: '#D4A5B5', bg: '#FDF8FA', surface: '#fff',
    text: '#4A2A30', textMuted: '#8C7A7E',
  },
]

export default function WeddingPreview({ data, selectedStyle }) {
  const style = useMemo(() => STYLES.find((s) => s.id === selectedStyle) || STYLES[0], [selectedStyle])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--pv-primary', style.primary)
    root.style.setProperty('--pv-secondary', style.secondary)
    root.style.setProperty('--pv-bg', style.bg)
    root.style.setProperty('--pv-surface', style.surface)
    root.style.setProperty('--pv-text', style.text)
    root.style.setProperty('--pv-text-muted', style.textMuted)
  }, [style])

  const isDark = style.id === 'gold-luxury'

  return (
    <div
      className="w-full max-w-[500px] mx-auto rounded-2xl overflow-hidden shadow-2xl"
      style={{ backgroundColor: style.bg, color: style.text, fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      <div className="max-h-[620px] overflow-y-auto">
        <div
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
              {(data.novia || 'Ana')}
              {data.novia || data.novio ? <><span className="block text-sm font-normal mt-2 tracking-[0.2em]" style={{ color: style.secondary }}>&#10022;</span></> : ''}
              {(data.novio || 'Carlos')}
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

          <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-bounce" style={{ animationDuration: '3s' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M8 13l4-4M8 13l-4-4" stroke={style.secondary} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            </svg>
          </div>
        </div>

        <div className="px-6 py-10 text-center space-y-4">
          <Ornament color={style.secondary} />
          <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>Nuestra Historia</p>
          <h2 className="text-xl sm:text-2xl font-bold" style={{ color: style.text }}>
            {data.novia || 'Ana'} & {data.novio || 'Carlos'}
          </h2>
          <p className="text-sm leading-relaxed italic max-w-xs mx-auto" style={{ color: style.textMuted }}>
            &ldquo;{data.historia || 'Nos conocimos y supimos que era para siempre. Cada momento juntos ha sido el capítulo más hermoso de nuestras vidas.'}&rdquo;
          </p>
        </div>

        <div className="py-10 px-6" style={{ backgroundColor: isDark ? style.surface : `${style.primary}04` }}>
          <div className="text-center space-y-6 max-w-xs mx-auto">
            <Ornament color={style.secondary} />
            <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>La Boda</p>

            {[{
              icon: Heart, title: 'Ceremonia',
              time: data.hora_ceremonia || '17:00 h',
              location: data.lugar_ceremonia || 'Iglesia San Miguel',
            }, {
              icon: CalendarDays, title: 'Recepción',
              time: data.hora_recepcion || '19:30 h',
              location: data.lugar_recepcion || 'Hacienda Los Olivos',
            },
            ].map((evt) => (
              <div key={evt.title} className="text-center">
                <evt.icon className="w-4 h-4 mx-auto mb-2" style={{ color: style.secondary }} />
                <p className="text-xs font-bold tracking-[0.15em] uppercase mb-1" style={{ color: style.text }}>{evt.title}</p>
                <p className="text-xs" style={{ color: style.secondary }}>{evt.time}</p>
                <p className="text-xs mt-1" style={{ color: style.textMuted }}>{evt.location}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-10">
          <div className="text-center space-y-4 mb-6">
            <Ornament color={style.secondary} />
            <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>Galería</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {GALLERY_PHOTOS.slice(0, 6).map((url, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img src={url} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="py-10 px-6" style={{ backgroundColor: isDark ? style.surface : `${style.primary}04` }}>
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
                type="text" placeholder="Tu nombre"
                readOnly
                className="w-full px-4 py-2.5 rounded-xl text-xs border text-center"
                style={{ borderColor: `${style.secondary}40`, backgroundColor: isDark ? '#0A0A0A' : '#FBF6F0', color: style.text }}
                onClick={(e) => e.preventDefault()}
              />
              <input
                type="text" placeholder="Nº de invitados"
                readOnly
                className="w-full px-4 py-2.5 rounded-xl text-xs border text-center"
                style={{ borderColor: `${style.secondary}40`, backgroundColor: isDark ? '#0A0A0A' : '#FBF6F0', color: style.text }}
                onClick={(e) => e.preventDefault()}
              />
              <button
                className="w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider"
                style={{ backgroundColor: style.secondary, color: isDark ? style.primary : '#fff' }}
              >
                Confirmar asistencia
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-10 text-center space-y-4">
          <Ornament color={style.secondary} />
          <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>Ubicación</p>
          <div className="space-y-4 max-w-xs mx-auto">
            {[data.lugar_ceremonia || 'Iglesia San Miguel', data.lugar_recepcion || 'Hacienda Los Olivos'].map((l, i) => (
              <div key={i} className="flex items-start gap-3 text-left">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: style.secondary }} />
                <div>
                  <p className="text-xs font-semibold" style={{ color: style.text }}>
                    {i === 0 ? 'Ceremonia' : 'Recepción'}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: style.textMuted }}>{l}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="py-10 px-6" style={{ backgroundColor: isDark ? style.surface : `${style.primary}04` }}>
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
        </div>

        <div className="px-6 py-10 text-center space-y-4">
          <Ornament color={style.secondary} />
          <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>Mesa de Regalos</p>
          <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: style.textMuted }}>
            {data.registry || 'El mejor regalo es tu presencia, pero si deseas contribuir, tendremos una mesa de regalos disponible.'}
          </p>
          <Gift className="w-5 h-5 mx-auto" style={{ color: style.secondary }} />
        </div>

        <div className="py-10 px-6 text-center space-y-3" style={{ backgroundColor: isDark ? style.surface : `${style.primary}08` }}>
          <Music className="w-4 h-4 mx-auto" style={{ color: style.secondary }} />
          <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>Nuestra Canción</p>
          <p className="text-sm italic" style={{ color: style.text }}>
            &ldquo;{data.musica || 'Perfect — Ed Sheeran'}&rdquo;
          </p>
          <button
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium mt-2"
            style={{ backgroundColor: style.secondary + '20', color: style.secondary }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
            Escuchar
          </button>
        </div>

        <div className="py-10 px-6 text-center space-y-4"
          style={{
            background: isDark
              ? `linear-gradient(180deg, ${style.primary} 0%, #000 100%)`
              : style.primary,
          }}
        >
          <p className="text-xs tracking-[0.15em] uppercase" style={{ color: style.secondary, opacity: 0.8 }}>
            # {data.hashtag || 'Ana&Carlos2026'}
          </p>
          <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Gracias por ser parte de nuestra historia. Nos vemos en el altar.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Heart className="w-4 h-4" style={{ color: style.secondary, opacity: 0.6 }} />
          </div>
          <p className="text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Creado con Eterno
          </p>
        </div>
      </div>
    </div>
  )
}
