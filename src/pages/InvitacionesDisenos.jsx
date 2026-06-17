import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Heart, ChevronRight, Sparkles, Eye } from 'lucide-react'
import WeddingPreview from '../components/invitaciones/WeddingPreview'
import { DEFAULT_SECTIONS } from '../components/invitaciones/sections'

const designs = [
  {
    id: 'clasico-eterno',
    name: 'Clásico Eterno',
    tag: 'Clásico',
    badge: 'Popular',
    colors: { primary: '#7A1A2E', secondary: '#C4956A', bg: '#FBF6F0', text: '#2C1810', light: '#F5EDE0' },
    invitation: {
      bg: 'linear-gradient(135deg, #FBF6F0, #F5EDE0)',
      border: '2px solid #C4956A',
      ornament: true,
      font: 'serif',
      layout: 'centered',
    },
    description: 'Un diseño atemporal con detalles dorados y tipografía clásica serif. Perfecto para bodas formales y tradicionales.',
  },
  {
    id: 'rustico-encanto',
    name: 'Rústico Encanto',
    tag: 'Rústico',
    badge: null,
    colors: { primary: '#8B6F47', secondary: '#A8C5A0', bg: '#FAF7F2', text: '#3D2C1A', light: '#F0EBE0' },
    invitation: {
      bg: 'linear-gradient(135deg, #FAF7F2, #F0EBE0)',
      border: '2px solid #A8C5A0',
      ornament: true,
      font: 'serif',
      layout: 'centered',
    },
    description: 'Inspirado en la naturaleza, con tonos tierra y verdes suaves. Ideal para bodas al aire libre o en el campo.',
  },
  {
    id: 'moderno-minimal',
    name: 'Moderno Minimal',
    tag: 'Moderno',
    badge: 'Nuevo',
    colors: { primary: '#1A1A2E', secondary: '#C0C0C0', bg: '#FFFFFF', text: '#1A1A2E', light: '#F8F8FA' },
    invitation: {
      bg: 'linear-gradient(135deg, #FFFFFF, #F8F8FA)',
      border: '1px solid #C0C0C0',
      ornament: false,
      font: 'sans',
      layout: 'asymmetric',
    },
    description: 'Líneas limpias y tipografía sans-serif para un look contemporáneo. Para parejas que buscan un estilo elegante y sobrio.',
  },
  {
    id: 'romance-vintage',
    name: 'Romance Vintage',
    tag: 'Vintage',
    badge: null,
    colors: { primary: '#9B5E6B', secondary: '#D4A5B5', bg: '#FDF8FA', text: '#4A2A30', light: '#F8EFF2' },
    invitation: {
      bg: 'linear-gradient(135deg, #FDF8FA, #F8EFF2)',
      border: '2px solid #D4A5B5',
      ornament: true,
      font: 'script',
      layout: 'centered',
    },
    description: 'Detalles florales y tipografía cursiva en tonos rosados. Un diseño romántico con aire nostálgico.',
  },
  {
    id: 'gold-luxury',
    name: 'Gold Luxury',
    tag: 'Lujo',
    badge: 'Premium',
    colors: { primary: '#1A1A1A', secondary: '#D4AF37', bg: '#1A1A1A', text: '#FFFFFF', light: '#2A2A2A' },
    invitation: {
      bg: 'linear-gradient(135deg, #1A1A1A, #2A2A2A)',
      border: '2px solid #D4AF37',
      ornament: true,
      font: 'serif',
      layout: 'centered',
    },
    description: 'Elegancia en oscuro con detalles dorados Art Deco. Una opción sofisticada para una boda de alta gama.',
  },
  {
    id: 'tropical-bliss',
    name: 'Tropical Bliss',
    tag: 'Tropical',
    badge: null,
    colors: { primary: '#2D6A4F', secondary: '#E8845A', bg: '#F5FBF7', text: '#1B3B2B', light: '#E8F5EE' },
    invitation: {
      bg: 'linear-gradient(135deg, #F5FBF7, #E8F5EE)',
      border: '2px solid #E8845A',
      ornament: true,
      font: 'sans',
      layout: 'centered',
    },
    description: 'Verde esmeralda y coral vibrante. Perfecto para bodas en playa o destinos tropicales.',
  },
  {
    id: 'boho-chic',
    name: 'Boho Chic',
    tag: 'Bohemio',
    badge: null,
    colors: { primary: '#C8664E', secondary: '#E8C8A0', bg: '#FDF8F0', text: '#3D2C1A', light: '#F8F0E0' },
    invitation: {
      bg: 'linear-gradient(135deg, #FDF8F0, #F8F0E0)',
      border: '2px solid #C8664E',
      ornament: true,
      font: 'script',
      layout: 'centered',
    },
    description: 'Terracota y crema con elementos naturales. Un estilo bohemio para parejas libres y auténticas.',
  },
  {
    id: 'celestial',
    name: 'Celestial Dreams',
    tag: 'Moderno',
    badge: 'Nuevo',
    colors: { primary: '#1B1B3A', secondary: '#A8B5E0', bg: '#0D0D1A', text: '#E8EAF6', light: '#1A1A35' },
    invitation: {
      bg: 'linear-gradient(135deg, #0D0D1A, #1A1A35)',
      border: '1px solid #A8B5E0',
      ornament: false,
      font: 'sans',
      layout: 'asymmetric',
    },
    description: 'Noche estrellada con detalles plateados. Un diseño celestial para una boda mágica e inolvidable.',
  },
]

function DesignCard({ design, index, onSelect }) {
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setImgLoaded(true), 100 + index * 80)
    return () => clearTimeout(t)
  }, [index])

  const d = design
  const textColor = d.colors.text
  const secondaryColor = d.colors.secondary

  return (
    <div
      className={`group cursor-pointer transition-all duration-700 ${
        imgLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      onClick={() => onSelect(d)}
    >
      <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-white shadow-lg shadow-black/5 group-hover:shadow-2xl group-hover:shadow-black/10 transition-all duration-700 group-hover:-translate-y-1">
        <div style={{ background: d.invitation.bg }} className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0v40M0 20h40' stroke='%23000' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          }} />
        </div>

        {d.invitation.ornament && (
          <div className="absolute top-6 left-6 right-6 flex justify-center opacity-30">
            <svg viewBox="0 0 120 12" className="h-3" style={{ width: '120px' }}>
              <path d="M0,6 L40,6" stroke={secondaryColor} strokeWidth="0.5" opacity="0.6" />
              <circle cx="45" cy="6" r="2" fill="none" stroke={secondaryColor} strokeWidth="0.6" opacity="0.8" />
              <path d="M50,2 Q55,0 60,2 Q65,4 60,6 Q55,8 50,6 Q45,4 50,2" fill="none" stroke={secondaryColor} strokeWidth="0.6" opacity="0.6" />
              <circle cx="65" cy="6" r="2" fill="none" stroke={secondaryColor} strokeWidth="0.6" opacity="0.8" />
              <path d="M70,6 L120,6" stroke={secondaryColor} strokeWidth="0.5" opacity="0.6" />
            </svg>
          </div>
        )}

        <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: secondaryColor }}>
            Save the Date
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-center leading-tight mb-2" style={{
            color: textColor,
            fontFamily: d.invitation.font === 'script' ? "'Georgia', 'Times New Roman', serif" :
                        d.invitation.font === 'sans' ? "'Inter', system-ui, sans-serif" : "'Georgia', 'Times New Roman', serif",
            fontStyle: d.invitation.font === 'script' ? 'italic' : 'normal',
          }}>
            {d.id === 'gold-luxury' || d.id === 'celestial' ? (
              <span className="text-white">Nuestra Boda</span>
            ) : 'Nuestra Boda'}
          </h3>
          <div className="w-10 h-px my-3" style={{ backgroundColor: secondaryColor, opacity: 0.4 }} />
          <p className="text-[10px] tracking-[0.15em]" style={{ color: textColor, opacity: 0.7 }}>
            15 · Junio · 2026
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center">
                <Eye className="w-3 h-3" style={{ color: d.colors.primary }} />
              </div>
              <span className="text-white text-xs font-medium">Ver diseño</span>
            </div>
            {d.badge && (
              <span className="text-[9px] font-semibold uppercase tracking-wider text-white bg-white/20 backdrop-blur px-2.5 py-1 rounded-full">
                {d.badge}
              </span>
            )}
          </div>
        </div>

        {d.badge && (
          <div className="absolute top-4 right-4">
            <span className="text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm" style={{
              backgroundColor: d.colors.primary,
              color: d.id === 'gold-luxury' || d.id === 'celestial' ? secondaryColor : '#fff',
            }}>
              {d.badge}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 px-1">
        <h3 className="font-display font-bold text-base" style={{ color: d.colors.text }}>{d.name}</h3>
        <p className="text-xs mt-0.5" style={{ color: d.colors.secondary }}>{d.tag}</p>
      </div>
    </div>
  )
}

const SAMPLE_DATA = {
  novia: 'Ana', novio: 'Carlos', fecha: '15 de Junio de 2026',
  fecha_limite: '1 de Junio de 2026',
  hora_ceremonia: '17:00 h', lugar_ceremonia: 'Iglesia San Miguel',
  hora_recepcion: '19:30 h', lugar_recepcion: 'Hacienda Los Olivos',
  historia: 'Nos conocimos en una tarde de primavera y supimos que era para siempre.',
  dress_code: 'Formal: traje y corbata',
  registry: 'El Corte Inglés #1234',
  musica: 'Perfect — Ed Sheeran', hashtag: 'Ana&Carlos2026',
}

function DesignDetail({ design, onBack }) {
  const d = design

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onBack}>
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
        style={{ backgroundColor: '#FBF6F0' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-md hover:bg-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" style={{ color: '#7A1A2E' }} />
        </button>

        <div className="grid lg:grid-cols-5 min-h-[60vh]">
          <div className="lg:col-span-3 p-8 lg:p-12 flex items-center justify-center">
            <WeddingPreview data={SAMPLE_DATA} selectedStyle={d.id} sections={DEFAULT_SECTIONS} />
          </div>

          <div className="lg:col-span-2 p-8 lg:p-12 lg:pl-0 flex flex-col justify-center">
            <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: d.colors.secondary }}>{d.tag}</p>
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4" style={{ color: '#2C1810' }}>{d.name}</h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#8C7C7A' }}>
              {d.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {['Página web completa', 'Confirmación online', 'Galería de fotos', 'Cuenta regresiva', 'Mapa', 'Música'].map((f) => (
                <span
                  key={f}
                  className="text-[10px] font-medium uppercase tracking-wider px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: '#7A1A2E10', color: '#7A1A2E' }}
                >
                  {f}
                </span>
              ))}
            </div>

            <Link
              to={`/invitaciones/crear?design=${d.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-500 hover:shadow-xl hover:-translate-y-0.5"
              style={{ backgroundColor: '#7A1A2E', color: '#fff' }}
            >
              <Sparkles className="w-4 h-4" />
              Personalizar este diseño
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InvitacionesDisenos() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-[#FBF6F0]">
      <div className="bg-white/80 backdrop-blur border-b border-[#DFC5A8]/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/invitaciones')}
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: '#8C7C7A' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </button>
            <Link
              to="/invitaciones/crear"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all"
              style={{
                backgroundColor: '#7A1A2E',
                color: '#fff',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Crear invitación
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <p className="font-script text-[#C4956A] text-xl sm:text-2xl">Nuestros Diseños</p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C1810]">
            Plantillas que <span className="italic text-[#7A1A2E]">enamoran</span>
          </h1>
          <p className="text-[#8C7C7A] text-base max-w-2xl mx-auto">
            Cada diseño está creado con el corazón, pensando en su historia. Seleccione el suyo y personalícelo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {designs.map((d, i) => (
            <DesignCard key={d.id} design={d} index={i} onSelect={setSelected} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/invitaciones/crear"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-500 hover:shadow-2xl hover:-translate-y-0.5"
            style={{
              backgroundColor: '#7A1A2E',
              color: '#fff',
            }}
          >
            <Sparkles className="w-4 h-4" />
            Crear mi invitación personalizada
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {selected && (
        <DesignDetail design={selected} onBack={() => setSelected(null)} />
      )}
    </div>
  )
}
