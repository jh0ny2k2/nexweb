import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft, Heart, Sparkles, Share2, Check,
  Palette, Calendar, MapPin, Music, MessageCircle, ChevronDown,
} from 'lucide-react'
import WeddingPreview from '../components/invitaciones/WeddingPreview'

const STYLE_OPTIONS = [
  { id: 'clasico-eterno', name: 'Clásico', primary: '#7A1A2E', secondary: '#C4956A' },
  { id: 'rustico-encanto', name: 'Rústico', primary: '#5C3D2E', secondary: '#8BA888' },
  { id: 'moderno-minimal', name: 'Moderno', primary: '#1A1A2E', secondary: '#B0B0C0' },
  { id: 'gold-luxury', name: 'Lujo', primary: '#0A0A0A', secondary: '#D4AF37' },
  { id: 'romance-vintage', name: 'Vintage', primary: '#8B4A5E', secondary: '#D4A5B5' },
]

export default function InvitacionesCrear() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialDesign = searchParams.get('design') || 'clasico-eterno'

  const [data, setData] = useState({
    novia: '',
    novio: '',
    fecha: '',
    fecha_limite: '',
    hora_ceremonia: '',
    lugar_ceremonia: '',
    hora_recepcion: '',
    lugar_recepcion: '',
    historia: '',
    dress_code: '',
    registry: '',
    musica: 'Perfect — Ed Sheeran',
    hashtag: '',
  })
  const [selectedStyle, setSelectedStyle] = useState(initialDesign)
  const [showCopied, setShowCopied] = useState(false)
  const [showMobilePreview, setShowMobilePreview] = useState(false)

  const update = (key, value) => setData((prev) => ({ ...prev, [key]: value }))

  const handleShare = async () => {
    const text = `🌟 ${data.novia || 'Ana'} & ${data.novio || 'Carlos'} se casan\n📅 ${data.fecha || '15 Junio 2026'}\n📍 ${data.lugar_ceremonia || 'Por confirmar'}\n✨ Creado con Eterno`
    if (navigator.share) {
      await navigator.share({ title: 'Invitación de Boda', text })
    } else {
      await navigator.clipboard.writeText(text)
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2000)
    }
  }

  const inputClass = "w-full px-4 py-2.5 rounded-xl border text-sm transition-all outline-none focus:ring-2"

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
                <ArrowLeft className="w-4 h-4 text-[#7A1A2E]" />
              </button>
              <div>
                <h1 className="text-sm font-bold text-[#2C1810]">Creador</h1>
                <p className="text-[10px] text-[#8C7C7A]">Invitación web personalizada</p>
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
            <div className="space-y-5">

              <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#DFC5A8]/20">
                <h3 className="text-sm font-bold mb-5 flex items-center gap-2 text-[#7A1A2E]">
                  <Heart className="w-4 h-4" />
                  Los novios
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Nombre de ella" value={data.novia} onChange={(v) => update('novia', v)} placeholder="Ana" />
                  <Input label="Nombre de él" value={data.novio} onChange={(v) => update('novio', v)} placeholder="Carlos" />
                </div>
              </section>

              <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#DFC5A8]/20">
                <h3 className="text-sm font-bold mb-5 flex items-center gap-2 text-[#7A1A2E]">
                  <Calendar className="w-4 h-4" />
                  Fecha y lugares
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Fecha de la boda" value={data.fecha} onChange={(v) => update('fecha', v)} placeholder="15 de Junio de 2026" />
                  <Input label="Fecha límite confirmación" value={data.fecha_limite} onChange={(v) => update('fecha_limite', v)} placeholder="1 de Junio de 2026" />
                  <Input label="Hora ceremonia" value={data.hora_ceremonia} onChange={(v) => update('hora_ceremonia', v)} placeholder="17:00 h" />
                  <Input label="Lugar ceremonia" value={data.lugar_ceremonia} onChange={(v) => update('lugar_ceremonia', v)} placeholder="Iglesia San Miguel" />
                  <Input label="Hora recepción" value={data.hora_recepcion} onChange={(v) => update('hora_recepcion', v)} placeholder="19:30 h" />
                  <Input label="Lugar recepción" value={data.lugar_recepcion} onChange={(v) => update('lugar_recepcion', v)} placeholder="Hacienda Los Olivos" />
                </div>
              </section>

              <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#DFC5A8]/20">
                <h3 className="text-sm font-bold mb-5 flex items-center gap-2 text-[#7A1A2E]">
                  <MessageCircle className="w-4 h-4" />
                  Historia y detalles
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-[#8C7C7A]">Historia de amor</label>
                    <textarea
                      value={data.historia}
                      onChange={(e) => update('historia', e.target.value)}
                      placeholder="Cuéntanos cómo se conocieron..."
                      rows={3}
                      className={`${inputClass} resize-none`}
                      style={{ borderColor: '#DFC5A8', backgroundColor: '#FBF6F0', color: '#2C1810' }}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Código de vestimenta" value={data.dress_code} onChange={(v) => update('dress_code', v)} placeholder="Formal: traje y corbata" />
                    <Input label="Mesa de regalos" value={data.registry} onChange={(v) => update('registry', v)} placeholder="El Corte Inglés #1234" />
                    <Input label="Hashtag" value={data.hashtag} onChange={(v) => update('hashtag', v)} placeholder="Ana&Carlos2026" />
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-[#8C7C7A] flex items-center gap-1.5">
                        <Music className="w-3 h-3" />
                        Canción
                      </label>
                      <select
                        value={data.musica}
                        onChange={(e) => update('musica', e.target.value)}
                        className={inputClass}
                        style={{ borderColor: '#DFC5A8', backgroundColor: '#FBF6F0', color: '#2C1810' }}
                      >
                        <option>Perfect — Ed Sheeran</option>
                        <option>A Thousand Years — Christina Perri</option>
                        <option>All of Me — John Legend</option>
                        <option>Canon in D — Pachelbel</option>
                        <option>Marry You — Bruno Mars</option>
                        <option>Thinking Out Loud — Ed Sheeran</option>
                        <option>Here Comes the Sun — Beatles</option>
                        <option>Ninguna</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#DFC5A8]/20">
                <h3 className="text-sm font-bold mb-5 flex items-center gap-2 text-[#7A1A2E]">
                  <Palette className="w-4 h-4" />
                  Estilo visual
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {STYLE_OPTIONS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStyle(s.id)}
                      className="p-2 rounded-xl transition-all duration-300 text-center"
                      style={{
                        backgroundColor: selectedStyle === s.id ? s.primary + '15' : 'transparent',
                        border: selectedStyle === s.id ? `2px solid ${s.primary}` : '2px solid transparent',
                      }}
                    >
                      <div
                        className="w-full aspect-[3/4] rounded-lg overflow-hidden flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${s.primary}, ${s.secondary}88)`,
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-white/60" />
                      </div>
                      <p className="text-[8px] text-center mt-1.5 font-medium truncate" style={{ color: selectedStyle === s.id ? s.primary : '#8C7C7A' }}>
                        {s.name}
                      </p>
                    </button>
                  ))}
                </div>
              </section>

              <div className="text-center pt-2 pb-4">
                <a href="/invitaciones/disenos" className="inline-flex items-center gap-1 text-xs font-medium text-[#C4956A] hover:text-[#B8864E] transition-colors">
                  Ver todos los diseños
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <div className="hidden lg:block text-center mb-6">
                <h2 className="text-sm font-bold text-[#2C1810]">Vista previa</h2>
                <p className="text-[10px] text-[#8C7C7A]">Así se verá la invitación web</p>
              </div>

              <button
                className="lg:hidden w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-[#DFC5A8]/20 shadow-sm mb-4"
                onClick={() => setShowMobilePreview(!showMobilePreview)}
              >
                <span className="text-sm font-medium text-[#2C1810]">
                  {showMobilePreview ? 'Ocultar' : 'Ver'} vista previa
                </span>
                <ChevronDown className={`w-4 h-4 text-[#8C7C7A] transition-transform ${showMobilePreview ? 'rotate-180' : ''}`} />
              </button>

              <div className={`${showMobilePreview ? 'block' : 'hidden'} lg:block`}>
                <WeddingPreview data={data} selectedStyle={selectedStyle} />

                <div className="mt-6 text-center space-y-3">
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8C7C7A]">
                    <Sparkles className="w-3 h-3" />
                    Actualización en vivo
                  </div>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-500 hover:shadow-xl hover:-translate-y-0.5 w-full justify-center"
                    style={{ backgroundColor: STYLE_OPTIONS.find((s) => s.id === selectedStyle)?.primary || '#7A1A2E', color: '#fff' }}
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Compartir invitación
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Input({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5 text-[#8C7C7A]">{label}</label>
      <input
        type="text" value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all outline-none focus:ring-2"
        style={{ borderColor: '#DFC5A8', backgroundColor: '#FBF6F0', color: '#2C1810' }}
      />
    </div>
  )
}
