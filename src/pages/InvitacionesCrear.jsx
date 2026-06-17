import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft, Heart, Sparkles, Download, Share2,
  Palette, Type, MapPin, Calendar, Music, MessageCircle,
  ChevronRight, Check,
} from 'lucide-react'

const STYLES = [
  {
    id: 'clasico-eterno', name: 'Clásico Eterno',
    primary: '#7A1A2E', secondary: '#C4956A', bg: '#FBF6F0', text: '#2C1810',
    ornament: true, font: 'serif', border: '2px solid #C4956A',
  },
  {
    id: 'rustico-encanto', name: 'Rústico Encanto',
    primary: '#8B6F47', secondary: '#6B8F5E', bg: '#FAF7F2', text: '#3D2C1A',
    ornament: true, font: 'serif', border: '2px solid #6B8F5E',
  },
  {
    id: 'moderno-minimal', name: 'Moderno Minimal',
    primary: '#1A1A2E', secondary: '#888888', bg: '#FFFFFF', text: '#1A1A2E',
    ornament: false, font: 'sans', border: '1px solid #CCCCCC',
  },
  {
    id: 'gold-luxury', name: 'Gold Luxury',
    primary: '#1A1A1A', secondary: '#D4AF37', bg: '#1A1A1A', text: '#FFFFFF',
    ornament: true, font: 'serif', border: '2px solid #D4AF37',
  },
  {
    id: 'romance-vintage', name: 'Romance Vintage',
    primary: '#9B5E6B', secondary: '#D4A5B5', bg: '#FDF8FA', text: '#4A2A30',
    ornament: true, font: 'script', border: '2px solid #D4A5B5',
  },
  {
    id: 'celestial', name: 'Celestial Dreams',
    primary: '#1B1B3A', secondary: '#A8B5E0', bg: '#0D0D1A', text: '#E8EAF6',
    ornament: false, font: 'sans', border: '1px solid #3A3A6A',
  },
]

const MUSIC_OPTIONS = [
  'Canon in D — Pachelbel',
  'Here Comes the Sun — Beatles',
  'All You Need Is Love — Beatles',
  'Perfect — Ed Sheeran',
  'A Thousand Years — Christina Perri',
  'Marry You — Bruno Mars',
  'Thinking Out Loud — Ed Sheeran',
  'Ninguna',
]

function OrnamentSmall({ color, className = '' }) {
  return (
    <svg viewBox="0 0 120 12" className={`h-3 ${className}`} style={{ width: '100px' }}>
      <path d="M0,6 L40,6" stroke={color} strokeWidth="0.4" opacity="0.5" />
      <circle cx="44" cy="6" r="1.5" fill="none" stroke={color} strokeWidth="0.5" opacity="0.7" />
      <path d="M48,2.5 Q52,0.5 56,2.5 Q60,4.5 56,6.5 Q52,8.5 48,6.5 Q44,4.5 48,2.5" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
      <circle cx="60" cy="6" r="1.5" fill="none" stroke={color} strokeWidth="0.5" opacity="0.7" />
      <path d="M64,6 L120,6" stroke={color} strokeWidth="0.4" opacity="0.5" />
    </svg>
  )
}

function InvitationPreview({ data, style }) {
  const isDark = style.id === 'gold-luxury' || style.id === 'celestial'
  const textColor = isDark ? style.text : style.text
  const secondaryColor = style.secondary

  const headingFont = style.font === 'script'
    ? "'Georgia', 'Times New Roman', serif"
    : style.font === 'sans'
    ? "'Inter', 'Helvetica', sans-serif"
    : "'Georgia', 'Times New Roman', serif"

  return (
    <div
      className="relative w-full max-w-sm mx-auto aspect-[3/4] rounded-2xl shadow-2xl overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${style.bg}, ${isDark ? '#1A1A2A' : '#F0E8E0'})`, border: style.border }}
    >
      {style.ornament && (
        <div className="absolute top-5 left-5 right-5 flex justify-center opacity-40">
          <OrnamentSmall color={secondaryColor} />
        </div>
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 sm:px-10">
        <p className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: secondaryColor, opacity: 0.8 }}>
          Save the Date
        </p>

        {data.novia || data.novio ? (
          <h2 className="text-2xl sm:text-3xl font-bold text-center leading-tight mb-2" style={{
            color: textColor, fontFamily: headingFont,
            fontStyle: style.font === 'script' ? 'italic' : 'normal',
          }}>
            {data.novia || 'Ana'}{data.novia && data.novio ? <><br /><span className="text-xs font-normal tracking-[0.2em]" style={{ color: secondaryColor, opacity: 0.7 }}>&amp;</span><br /></> : ''}{data.novio || 'Carlos'}
          </h2>
        ) : (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-center leading-tight mb-1" style={{ color: textColor, fontFamily: headingFont }}>
              <span style={{ fontStyle: style.font === 'script' ? 'italic' : 'normal' }}>Tu Nombre</span>
            </h2>
            <p className="text-xs tracking-[0.2em] my-1" style={{ color: secondaryColor, opacity: 0.6 }}>y</p>
            <h2 className="text-xl sm:text-2xl font-bold text-center leading-tight" style={{ color: textColor, fontFamily: headingFont }}>
              <span style={{ fontStyle: style.font === 'script' ? 'italic' : 'normal' }}>Su Nombre</span>
            </h2>
          </>
        )}

        <div className="w-10 h-px my-3" style={{ backgroundColor: secondaryColor, opacity: 0.4 }} />

        {data.fecha ? (
          <p className="text-xs tracking-[0.15em] mb-1" style={{ color: textColor, opacity: 0.7 }}>
            {data.fecha}
          </p>
        ) : (
          <p className="text-xs tracking-[0.15em] mb-1" style={{ color: textColor, opacity: 0.5 }}>
            15 de Junio de 2026
          </p>
        )}

        {data.hora && (
          <p className="text-[10px] tracking-[0.15em]" style={{ color: textColor, opacity: 0.5 }}>
            A las {data.hora}
          </p>
        )}

        {data.lugar && (
          <p className="text-[10px] tracking-[0.15em] mt-3 text-center max-w-[200px] leading-relaxed" style={{ color: textColor, opacity: 0.5 }}>
            {data.lugar}
          </p>
        )}

        {data.mensaje && (
          <p className="text-[9px] italic text-center max-w-[200px] mt-4 leading-relaxed" style={{ color: textColor, opacity: 0.45 }}>
            &ldquo;{data.mensaje}&rdquo;
          </p>
        )}

        <div className="mt-auto mb-6">
          <Heart className="w-3.5 h-3.5" style={{ color: secondaryColor, opacity: 0.4 }} />
        </div>
      </div>

      {style.ornament && (
        <div className="absolute bottom-5 left-5 right-5 flex justify-center opacity-40">
          <OrnamentSmall color={secondaryColor} />
        </div>
      )}
    </div>
  )
}

function ColorPicker({ label, value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-xs font-medium" style={{ color: '#8C7C7A', minWidth: '80px' }}>{label}</label>
      <div className="flex items-center gap-2">
        {['#7A1A2E', '#1A1A2E', '#2D6A4F', '#9B5E6B', '#C8664E', '#8B6F47', '#1B1B3A'].map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className="w-6 h-6 rounded-full transition-all duration-200"
            style={{
              backgroundColor: c,
              boxShadow: value === c ? `0 0 0 2px #fff, 0 0 0 4px ${c}` : 'none',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function InvitacionesCrear() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialDesign = searchParams.get('design') || 'clasico-eterno'

  const [data, setData] = useState({
    novia: '',
    novio: '',
    fecha: '',
    hora: '',
    lugar: '',
    mensaje: '',
    musica: 'Canon in D — Pachelbel',
  })
  const [selectedStyle, setSelectedStyle] = useState(
    () => STYLES.find((s) => s.id === initialDesign) || STYLES[0],
  )
  const [showCopied, setShowCopied] = useState(false)
  const previewRef = useRef(null)

  const update = (key, value) => setData((prev) => ({ ...prev, [key]: value }))

  const handleShare = async () => {
    const text = `🌟 Te invito a nuestra boda\n\n${data.novia || 'Ana'} & ${data.novio || 'Carlos'}\n${data.fecha || '15 Junio 2026'}${data.lugar ? `\n📍 ${data.lugar}` : ''}\n\n✨ Creado con Eterno`

    if (navigator.share) {
      await navigator.share({ title: 'Nuestra Invitación de Boda', text })
    } else {
      await navigator.clipboard.writeText(text)
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[#FBF6F0]">
      <div className="bg-white/80 backdrop-blur border-b border-[#DFC5A8]/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/invitaciones')}
                className="w-9 h-9 rounded-full bg-[#7A1A2E]/5 flex items-center justify-center hover:bg-[#7A1A2E]/10 transition-all"
              >
                <ArrowLeft className="w-4 h-4" style={{ color: '#7A1A2E' }} />
              </button>
              <div>
                <h1 className="text-sm font-bold" style={{ color: '#2C1810' }}>Creador de invitaciones</h1>
                <p className="text-[10px]" style={{ color: '#8C7C7A' }}>Personaliza cada detalle</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                style={{ backgroundColor: '#7A1A2E/5', color: '#7A1A2E' }}
              >
                {showCopied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                {showCopied ? 'Copiado' : 'Compartir'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#DFC5A8]/20">
                <h3 className="text-sm font-bold mb-5 flex items-center gap-2" style={{ color: '#7A1A2E' }}>
                  <Heart className="w-4 h-4" />
                  Los novios
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#8C7C7A' }}>Nombre de ella</label>
                    <input
                      type="text" value={data.novia}
                      onChange={(e) => update('novia', e.target.value)}
                      placeholder="Ana"
                      className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all"
                      style={{ borderColor: '#DFC5A8', backgroundColor: '#FBF6F0', color: '#2C1810' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#8C7C7A' }}>Nombre de él</label>
                    <input
                      type="text" value={data.novio}
                      onChange={(e) => update('novio', e.target.value)}
                      placeholder="Carlos"
                      className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all"
                      style={{ borderColor: '#DFC5A8', backgroundColor: '#FBF6F0', color: '#2C1810' }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#DFC5A8]/20">
                <h3 className="text-sm font-bold mb-5 flex items-center gap-2" style={{ color: '#7A1A2E' }}>
                  <Calendar className="w-4 h-4" />
                  Fecha y lugar
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#8C7C7A' }}>Fecha</label>
                    <input
                      type="text" value={data.fecha}
                      onChange={(e) => update('fecha', e.target.value)}
                      placeholder="15 de Junio de 2026"
                      className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all"
                      style={{ borderColor: '#DFC5A8', backgroundColor: '#FBF6F0', color: '#2C1810' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#8C7C7A' }}>Hora</label>
                    <input
                      type="text" value={data.hora}
                      onChange={(e) => update('hora', e.target.value)}
                      placeholder="17:00 h"
                      className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all"
                      style={{ borderColor: '#DFC5A8', backgroundColor: '#FBF6F0', color: '#2C1810' }}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#8C7C7A' }}>Lugar</label>
                    <input
                      type="text" value={data.lugar}
                      onChange={(e) => update('lugar', e.target.value)}
                      placeholder="Hacienda Los Olivos, Madrid"
                      className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all"
                      style={{ borderColor: '#DFC5A8', backgroundColor: '#FBF6F0', color: '#2C1810' }}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#8C7C7A' }}>
                      Mensaje personalizado
                    </label>
                    <textarea
                      value={data.mensaje}
                      onChange={(e) => update('mensaje', e.target.value)}
                      placeholder="&ldquo;Nos hace mucha ilusión compartir este día con vosotros&rdquo;"
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all resize-none"
                      style={{ borderColor: '#DFC5A8', backgroundColor: '#FBF6F0', color: '#2C1810' }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#DFC5A8]/20">
                <h3 className="text-sm font-bold mb-5 flex items-center gap-2" style={{ color: '#7A1A2E' }}>
                  <Palette className="w-4 h-4" />
                  Estilo
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {STYLES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStyle(s)}
                      className="relative p-2 rounded-xl transition-all duration-300"
                      style={{
                        backgroundColor: selectedStyle.id === s.id ? s.primary + '15' : 'transparent',
                        border: selectedStyle.id === s.id ? `2px solid ${s.primary}` : '2px solid transparent',
                      }}
                    >
                      <div
                        className="w-full aspect-[3/4] rounded-lg overflow-hidden flex items-center justify-center"
                        style={{ background: s.bg, border: s.border.replace('2px', '1px').replace('1px', '1px') }}
                      >
                        <div className="text-center">
                          <div className="w-4 h-0.5 mx-auto mb-1" style={{ backgroundColor: s.secondary, opacity: 0.4 }} />
                          <p className="text-[5px] font-bold leading-tight" style={{ color: s.id === 'gold-luxity' || s.id === 'celestial' ? s.text : s.text }}>
                            {s.name.split(' ')[0]}
                          </p>
                          <div className="w-4 h-0.5 mx-auto mt-1" style={{ backgroundColor: s.secondary, opacity: 0.4 }} />
                        </div>
                      </div>
                      <p className="text-[8px] text-center mt-1 font-medium truncate" style={{ color: selectedStyle.id === s.id ? s.primary : '#8C7C7A' }}>
                        {s.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#DFC5A8]/20">
                <h3 className="text-sm font-bold mb-5 flex items-center gap-2" style={{ color: '#7A1A2E' }}>
                  <Music className="w-4 h-4" />
                  Música ambiental
                </h3>
                <select
                  value={data.musica}
                  onChange={(e) => update('musica', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all"
                  style={{ borderColor: '#DFC5A8', backgroundColor: '#FBF6F0', color: '#2C1810' }}
                >
                  {MUSIC_OPTIONS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#DFC5A8]/20">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: '#7A1A2E' }}>
                  <MessageCircle className="w-4 h-4" />
                  Compartir
                </h3>
                <p className="text-xs mb-4" style={{ color: '#8C7C7A' }}>
                  Comparta su invitación con sus invitados a través de cualquier medio.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all"
                    style={{ backgroundColor: '#25D366', color: '#fff' }}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp
                  </button>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all"
                    style={{ backgroundColor: '#7A1A2E', color: '#fff' }}
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Copiar texto
                  </button>
                </div>
              </div>

              <div className="text-center py-4">
                <a
                  href="/invitaciones/disenos"
                  className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
                  style={{ color: '#C4956A' }}
                >
                  Ver todos los diseños
                  <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <div className="text-center mb-6">
                <h2 className="text-sm font-bold" style={{ color: '#2C1810' }}>Previsualización</h2>
                <p className="text-[10px]" style={{ color: '#8C7C7A' }}>Así se verá su invitación</p>
              </div>

              <div ref={previewRef} className="transition-all duration-300">
                <InvitationPreview data={data} style={selectedStyle} />
              </div>

              <div className="mt-6 text-center space-y-3">
                <p className="text-[10px]" style={{ color: '#8C7C7A' }}>
                  Los cambios se actualizan automáticamente
                </p>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-500 hover:shadow-xl hover:-translate-y-0.5 w-full justify-center"
                  style={{ backgroundColor: selectedStyle.primary, color: selectedStyle.id === 'gold-luxury' || selectedStyle.id === 'celestial' ? selectedStyle.secondary : '#fff' }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Compartir invitación
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
