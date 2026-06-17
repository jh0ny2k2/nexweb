import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Heart, ChevronRight, Sparkles, Eye, Star, Leaf } from 'lucide-react'
import WeddingPreview from '../components/invitaciones/WeddingPreview'
import { DEFAULT_SECTIONS } from '../components/invitaciones/sections'

const designs = [
  {
    id: 'clasico-eterno',
    name: 'Clásico Eterno',
    tag: 'Clásico',
    badge: 'Popular',
    colors: { primary: '#7A1A2E', secondary: '#C4956A', bg: '#FBF6F0', text: '#2C1810' },
    layout: 'ornate-frame',
    font: 'serif',
    description: 'Un diseño atemporal con detalles dorados y tipografía clásica serif. Perfecto para bodas formales y tradicionales.',
  },
  {
    id: 'rustico-encanto',
    name: 'Rústico Encanto',
    tag: 'Rústico',
    badge: null,
    colors: { primary: '#5C3D2E', secondary: '#8BA888', bg: '#F8F5F0', text: '#3D2C1A' },
    layout: 'botanical-wreath',
    font: 'serif',
    description: 'Inspirado en la naturaleza, con tonos tierra y verdes suaves. Ideal para bodas al aire libre o en el campo.',
  },
  {
    id: 'moderno-minimal',
    name: 'Moderno Minimal',
    tag: 'Moderno',
    badge: 'Nuevo',
    colors: { primary: '#1A1A2E', secondary: '#B0B0C0', bg: '#FAFAFC', text: '#1A1A2E' },
    layout: 'asymmetric-geo',
    font: 'sans',
    description: 'Composición asimétrica con formas geométricas. Para parejas contemporáneas que buscan un estilo elegante y sobrio.',
  },
  {
    id: 'romance-vintage',
    name: 'Romance Vintage',
    tag: 'Vintage',
    badge: null,
    colors: { primary: '#8B4A5E', secondary: '#D4A5B5', bg: '#FDF8FA', text: '#4A2A30' },
    layout: 'floral-corners',
    font: 'script',
    description: 'Detalles florales en las esquinas con tipografía cursiva. Un diseño romántico con aire nostálgico.',
  },
  {
    id: 'gold-luxury',
    name: 'Gold Luxury',
    tag: 'Lujo',
    badge: 'Premium',
    colors: { primary: '#0A0A0A', secondary: '#D4AF37', bg: '#0A0A0A', text: '#F0EDE8' },
    layout: 'art-deco-dark',
    font: 'serif',
    description: 'Elegancia en oscuro con geometría Art Decó dorada. Una opción sofisticada para una boda de alta gama.',
  },
  {
    id: 'tropical-bliss',
    name: 'Tropical Bliss',
    tag: 'Tropical',
    badge: null,
    colors: { primary: '#2D6A4F', secondary: '#E8845A', bg: '#F5FBF7', text: '#1B3B2B' },
    layout: 'split-diagonal',
    font: 'sans',
    description: 'Composición dividida con motivos de hojas tropicales. Perfecto para bodas en playa o destinos paradisíacos.',
  },
  {
    id: 'boho-chic',
    name: 'Boho Chic',
    tag: 'Bohemio',
    badge: null,
    colors: { primary: '#C8664E', secondary: '#E8C8A0', bg: '#FDF8F0', text: '#3D2C1A' },
    layout: 'mandala-sun',
    font: 'script',
    description: 'Terracota y crema con mandala solar. Un estilo bohemio para parejas libres, auténticas y soñadoras.',
  },
  {
    id: 'celestial',
    name: 'Celestial Dreams',
    tag: 'Moderno',
    badge: 'Nuevo',
    colors: { primary: '#1B1B3A', secondary: '#A8B5E0', bg: '#0D0D1A', text: '#E8EAF6' },
    layout: 'constellation',
    font: 'sans',
    description: 'Noche estrellada con constelaciones plateadas. Un diseño celestial para una boda mágica e inolvidable.',
  },
]

function getFont(font) {
  return font === 'script' ? "'Georgia', 'Times New Roman', serif"
    : font === 'sans' ? "'Inter', system-ui, sans-serif"
    : "'Georgia', 'Times New Roman', serif"
}

function DesignCard({ design, index, onSelect }) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100 + index * 80)
    return () => clearTimeout(t)
  }, [index])

  const d = design
  const { primary, secondary, text } = d.colors

  const Overlay = () => (
    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  )

  const HoverBar = () => (
    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center">
            <Eye className="w-3 h-3" style={{ color: primary }} />
          </div>
          <span className="text-white text-xs font-medium">Ver diseño</span>
        </div>
      </div>
    </div>
  )

  const Badge = () => d.badge ? (
    <div className="absolute top-4 right-4 z-10">
      <span className="text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm"
        style={{ backgroundColor: primary, color: d.id === 'gold-luxury' || d.id === 'celestial' ? secondary : '#fff' }}
      >
        {d.badge}
      </span>
    </div>
  ) : null

  const cardClass = `group cursor-pointer transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`

  const renderCard = () => {
    switch (d.layout) {
      case 'ornate-frame':
        return (
          <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-white shadow-lg shadow-black/5 group-hover:shadow-2xl group-hover:shadow-black/10 transition-all duration-700 group-hover:-translate-y-1">
            <div className="absolute inset-3 rounded-[1.5rem] border-2" style={{ borderColor: secondary, opacity: 0.5 }} />
            <div className="absolute inset-4 rounded-[1.4rem] border" style={{ borderColor: secondary, opacity: 0.2 }} />
            <div style={{ background: `linear-gradient(135deg, ${d.colors.bg}, ${d.colors.bg}DD)` }} className="absolute inset-0" />
            <div className="absolute top-5 left-5 right-5 flex justify-center opacity-30">
              <svg viewBox="0 0 120 12" className="h-3" style={{ width: '100px' }}>
                <path d="M0,6 L35,6" stroke={secondary} strokeWidth="0.5" opacity="0.6" />
                <circle cx="40" cy="6" r="2" fill="none" stroke={secondary} strokeWidth="0.6" opacity="0.8" />
                <path d="M45,2 Q50,0 55,2 Q60,4 55,6 Q50,8 45,6 Q40,4 45,2" fill="none" stroke={secondary} strokeWidth="0.6" opacity="0.6" />
                <circle cx="60" cy="6" r="2" fill="none" stroke={secondary} strokeWidth="0.6" opacity="0.8" />
                <path d="M65,6 L120,6" stroke={secondary} strokeWidth="0.5" opacity="0.6" />
              </svg>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-10">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: secondary }}>Save the Date</p>
              <h3 className="text-xl sm:text-2xl font-bold text-center leading-tight mb-2" style={{ color: text, fontFamily: getFont(d.font) }}>Nuestra Boda</h3>
              <div className="w-10 h-px my-3" style={{ backgroundColor: secondary, opacity: 0.4 }} />
              <p className="text-[10px] tracking-[0.15em]" style={{ color: text, opacity: 0.7 }}>15 · Junio · 2026</p>
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex justify-center opacity-20">
              <Heart className="w-4 h-4" style={{ color: secondary }} />
            </div>
            <Overlay /><HoverBar /><Badge />
          </div>
        )

      case 'botanical-wreath':
        return (
          <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-white shadow-lg shadow-black/5 group-hover:shadow-2xl group-hover:shadow-black/10 transition-all duration-700 group-hover:-translate-y-1">
            <div style={{ background: `linear-gradient(180deg, ${d.colors.bg}, #EDE8DF)` }} className="absolute inset-0" />
            <div className="absolute inset-4 flex items-center justify-center">
              <svg viewBox="0 0 200 260" className="w-full h-full opacity-30">
                <path d="M100,10 C60,10 20,40 20,80 C20,130 60,160 100,250 C140,160 180,130 180,80 C180,40 140,10 100,10Z" fill="none" stroke={secondary} strokeWidth="1.5" opacity="0.7" />
                <path d="M100,20 C65,20 30,45 30,80 C30,125 65,150 100,230 C135,150 170,125 170,80 C170,45 135,20 100,20Z" fill="none" stroke={secondary} strokeWidth="0.8" opacity="0.4" />
                <path d="M45,65 Q70,55 100,65 Q130,55 155,65" fill="none" stroke={primary} strokeWidth="1" opacity="0.4" />
                <path d="M45,95 Q70,105 100,95 Q130,105 155,95" fill="none" stroke={primary} strokeWidth="1" opacity="0.4" />
                {[1,2,3,4,5,6,7,8].map(i => {
                  const a = i * Math.PI / 4 - Math.PI/2
                  const r = 70 + Math.sin(i*2.5)*10
                  const cx = 100 + Math.cos(a)*r
                  const cy = 130 + Math.sin(a)*r
                  return <circle key={i} cx={cx} cy={cy} r="22" fill="none" stroke={secondary} strokeWidth="0.5" opacity="0.3" />
                })}
              </svg>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: secondary }}>Save the Date</p>
              <h3 className="text-xl sm:text-2xl font-bold text-center leading-tight" style={{ color: text, fontFamily: getFont(d.font) }}>Nuestra Boda</h3>
              <div className="w-8 h-px my-3" style={{ backgroundColor: secondary, opacity: 0.5 }} />
              <p className="text-[10px] tracking-[0.15em]" style={{ color: text, opacity: 0.7 }}>15 · Junio · 2026</p>
            </div>
            <Overlay /><HoverBar /><Badge />
          </div>
        )

      case 'asymmetric-geo':
        return (
          <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-white shadow-lg shadow-black/5 group-hover:shadow-2xl group-hover:shadow-black/10 transition-all duration-700 group-hover:-translate-y-1">
            <div style={{ background: `linear-gradient(135deg, ${d.colors.bg}, #F0F0F5)` }} className="absolute inset-0" />
            <div className="absolute -top-16 -left-16 w-40 h-40 rounded-full opacity-[0.06]" style={{ backgroundColor: primary }} />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full opacity-[0.04]" style={{ backgroundColor: primary }} />
            <div className="absolute top-8 right-6">
              <div className="w-12 h-px" style={{ backgroundColor: secondary, opacity: 0.3 }} />
            </div>
            <div className="absolute inset-0 flex flex-col items-end justify-center px-8 pr-12">
              <p className="text-[9px] tracking-[0.35em] uppercase mb-2" style={{ color: secondary, opacity: 0.7 }}>Save the Date</p>
              <h3 className="text-2xl font-bold text-right leading-tight" style={{ color: text, fontFamily: getFont(d.font) }}>Nuestra<br />Boda</h3>
              <div className="w-8 h-px my-2 ml-auto" style={{ backgroundColor: primary, opacity: 0.2 }} />
              <p className="text-[9px] tracking-[0.15em] text-right" style={{ color: text, opacity: 0.6 }}>15 · Junio · 2026</p>
            </div>
            <div className="absolute bottom-8 left-6">
              <div className="w-2 h-2" style={{ backgroundColor: secondary, opacity: 0.3 }} />
            </div>
            <Overlay /><HoverBar /><Badge />
          </div>
        )

      case 'floral-corners':
        return (
          <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-white shadow-lg shadow-black/5 group-hover:shadow-2xl group-hover:shadow-black/10 transition-all duration-700 group-hover:-translate-y-1">
            <div style={{ background: `linear-gradient(135deg, ${d.colors.bg}, #F5E8EC)` }} className="absolute inset-0" />
            <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full opacity-25">
              <path d="M20,20 Q50,0 80,20 Q100,50 80,80 Q50,100 20,80 Q0,50 20,20Z" fill={secondary} />
              <path d="M280,20 Q250,0 220,20 Q200,50 220,80 Q250,100 280,80 Q300,50 280,20Z" fill={secondary} />
              <path d="M20,380 Q50,400 80,380 Q100,350 80,320 Q50,300 20,320 Q0,350 20,380Z" fill={secondary} />
              <path d="M280,380 Q250,400 220,380 Q200,350 220,320 Q250,300 280,320 Q300,350 280,380Z" fill={secondary} />
              {[20,70,120,170,220,270].map(x =>
                [20,80,140,200,260,320,380].map(y => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill={secondary} opacity="0.3" />
                ))
              )}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: secondary, opacity: 0.8 }}>Save the Date</p>
              <h3 className="text-xl sm:text-2xl text-center leading-tight italic" style={{ color: text, fontFamily: getFont(d.font) }}>Nuestra Boda</h3>
              <div className="w-12 h-px my-3" style={{ backgroundColor: secondary, opacity: 0.3 }} />
              <p className="text-[10px] tracking-[0.15em]" style={{ color: text, opacity: 0.6 }}>15 · Junio · 2026</p>
            </div>
            <Overlay /><HoverBar /><Badge />
          </div>
        )

      case 'art-deco-dark':
        return (
          <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-white shadow-lg shadow-black/5 group-hover:shadow-2xl group-hover:shadow-black/10 transition-all duration-700 group-hover:-translate-y-1">
            <div style={{ background: `linear-gradient(180deg, ${primary}, #000)` }} className="absolute inset-0" />
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L100 50 L50 100 L0 50Z' fill='none' stroke='${encodeURIComponent(secondary)}' stroke-width='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: '50px 50px',
            }} />
            <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full opacity-15">
              <path d="M0,0 L80,0 L150,40 L220,0 L300,0 L300,60 L230,100 L300,140 L300,200 L220,180 L150,220 L80,180 L0,200 L0,140 L70,100 L0,60Z" fill={secondary} opacity="0.3" />
              <path d="M0,400 L80,400 L150,360 L220,400 L300,400 L300,340 L230,300 L300,260 L300,200 L220,220 L150,180 L80,220 L0,200 L0,260 L70,300 L0,340Z" fill={secondary} opacity="0.3" />
              <line x1="150" y1="40" x2="150" y2="360" stroke={secondary} strokeWidth="0.5" opacity="0.3" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-10">
              <div className="w-16 h-px mb-4" style={{ backgroundColor: secondary, opacity: 0.5 }} />
              <p className="text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: secondary, opacity: 0.8 }}>Save the Date</p>
              <h3 className="text-xl sm:text-2xl font-bold text-center leading-tight text-white" style={{ fontFamily: getFont(d.font) }}>
                Nuestra<br />Boda
              </h3>
              <div className="w-10 h-px my-3" style={{ backgroundColor: secondary, opacity: 0.4 }} />
              <p className="text-[10px] tracking-[0.15em]" style={{ color: secondary, opacity: 0.7 }}>15 · Junio · 2026</p>
              <div className="w-16 h-px mt-4" style={{ backgroundColor: secondary, opacity: 0.5 }} />
            </div>
            <Overlay /><HoverBar />
            {d.badge && (
              <div className="absolute top-4 right-4 z-10">
                <span className="text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm"
                  style={{ backgroundColor: secondary, color: primary }}>{d.badge}</span>
              </div>
            )}
          </div>
        )

      case 'split-diagonal':
        return (
          <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-white shadow-lg shadow-black/5 group-hover:shadow-2xl group-hover:shadow-black/10 transition-all duration-700 group-hover:-translate-y-1">
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${primary} 0%, ${primary} 50%, ${secondary} 50%, ${secondary} 100%)` }} />
            <div className="absolute inset-0 opacity-[0.06]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0 L30 15 L15 30 L0 15Z' fill='white'/%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px',
            }} />
            <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full opacity-10">
              {[0,1,2,3,4].map(i => {
                const y = 50 + i * 75
                return <path key={i} d={`M0,${y} Q75,${y-15} 150,${y} Q225,${y+15} 300,${y}`} fill="none" stroke="#fff" strokeWidth="1.5" />
              })}
            </svg>
            <div className="absolute top-6 left-6">
              <Leaf className="w-5 h-5 text-white/30" />
            </div>
            <div className="absolute bottom-6 right-6">
              <Leaf className="w-5 h-5 text-white/30" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
              <p className="text-[9px] tracking-[0.3em] uppercase mb-2 text-white/70">Save the Date</p>
              <h3 className="text-xl sm:text-2xl font-bold text-center leading-tight text-white" style={{ fontFamily: getFont(d.font), textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                Nuestra Boda
              </h3>
              <div className="w-8 h-px my-3 bg-white/30" />
              <p className="text-[10px] tracking-[0.15em] text-white/70">15 · Junio · 2026</p>
            </div>
            <Overlay /><HoverBar /><Badge />
          </div>
        )

      case 'mandala-sun':
        return (
          <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-white shadow-lg shadow-black/5 group-hover:shadow-2xl group-hover:shadow-black/10 transition-all duration-700 group-hover:-translate-y-1">
            <div style={{ background: `linear-gradient(180deg, ${d.colors.bg}, #F0E8DA)` }} className="absolute inset-0" />
            <div className="absolute top-0 left-0 right-0 h-2/5 flex items-start justify-center pt-4">
              <svg viewBox="0 0 120 80" className="w-full opacity-20" preserveAspectRatio="xMidYMin meet">
                <circle cx="60" cy="30" r="15" fill="none" stroke={secondary} strokeWidth="1" />
                <circle cx="60" cy="30" r="20" fill="none" stroke={secondary} strokeWidth="0.5" opacity="0.5" />
                {[0,1,2,3,4,5,6,7].map(i => {
                  const a = i * Math.PI / 4
                  return <line key={i} x1={60 + Math.cos(a)*22} y1={30 + Math.sin(a)*22} x2={60 + Math.cos(a)*50} y2={30 + Math.sin(a)*50} stroke={secondary} strokeWidth="0.8" opacity="0.4" />
                })}
                {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
                  const a = i * Math.PI / 6
                  return <line key={`r${i}`} x1={60 + Math.cos(a)*17} y1={30 + Math.sin(a)*17} x2={60 + Math.cos(a)*28} y2={30 + Math.sin(a)*28} stroke={primary} strokeWidth="0.5" opacity="0.3" />
                })}
              </svg>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 pt-6">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: secondary, opacity: 0.8 }}>Save the Date</p>
              <h3 className="text-xl sm:text-2xl text-center leading-tight italic" style={{ color: text, fontFamily: getFont(d.font) }}>Nuestra Boda</h3>
              <div className="w-10 h-px my-3" style={{ backgroundColor: secondary, opacity: 0.4 }} />
              <p className="text-[10px] tracking-[0.15em]" style={{ color: text, opacity: 0.7 }}>15 · Junio · 2026</p>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2 opacity-15">
              {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: secondary }} />)}
            </div>
            <Overlay /><HoverBar /><Badge />
          </div>
        )

      case 'constellation':
        return (
          <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-white shadow-lg shadow-black/5 group-hover:shadow-2xl group-hover:shadow-black/10 transition-all duration-700 group-hover:-translate-y-1">
            <div style={{ background: `linear-gradient(180deg, ${primary}, #0A0A20)` }} className="absolute inset-0" />
            <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full opacity-30">
              {[[50,40,80,70],[120,60,150,90],[200,50,170,80],[50,150,90,130],[120,140,160,160],[200,150,180,120],
                [60,220,100,200],[140,210,120,240],[220,220,250,200],[80,280,110,300],[150,290,180,270],[230,300,200,280]].map(([x1,y1,x2,y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={secondary} strokeWidth="0.5" opacity="0.5" />
              ))}
              {[[50,40],[80,70],[120,60],[150,90],[200,50],[170,80],[50,150],[90,130],[120,140],[160,160],[200,150],[180,120],
                [60,220],[100,200],[140,210],[120,240],[220,220],[250,200],[80,280],[110,300],[150,290],[180,270],[230,300],[200,280]].map(([cx,cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="2.5" fill={secondary} opacity="0.8" />
              ))}
              {[[50,40],[120,60],[200,50],[50,150],[120,140],[200,150],[60,220],[140,210],[220,220],[80,280],[150,290],[230,300]].map(([cx,cy], i) => (
                <circle key={`g${i}`} cx={cx} cy={cy} r="1" fill="#fff" opacity="0.9" />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-10">
              <div className="mb-2 flex gap-1 opacity-50">
                {[1,2,3].map(i => <Star key={i} className="w-2.5 h-2.5" style={{ color: secondary }} />)}
              </div>
              <p className="text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: secondary, opacity: 0.7 }}>Save the Date</p>
              <h3 className="text-xl sm:text-2xl font-bold text-center leading-tight text-white" style={{ fontFamily: getFont(d.font), textShadow: '0 0 20px rgba(168,181,224,0.3)' }}>
                Nuestra Boda
              </h3>
              <div className="w-8 h-px my-3" style={{ backgroundColor: secondary, opacity: 0.3 }} />
              <p className="text-[10px] tracking-[0.15em]" style={{ color: secondary, opacity: 0.6 }}>15 · Junio · 2026</p>
            </div>
            <Overlay /><HoverBar />
            {d.badge && (
              <div className="absolute top-4 right-4 z-10">
                <span className="text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm"
                  style={{ backgroundColor: secondary, color: primary }}>{d.badge}</span>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={cardClass} onClick={() => onSelect(d)}>
      {renderCard()}
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
              style={{ backgroundColor: '#7A1A2E', color: '#fff' }}
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
            style={{ backgroundColor: '#7A1A2E', color: '#fff' }}
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
