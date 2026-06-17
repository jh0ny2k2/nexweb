import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Heart, Sparkles, Share2, Palette,
  CheckCircle, ArrowRight, Star,
  Smartphone, Camera, Calendar,
  MapPin, Music, MessageCircle, ChevronRight,
  Menu, X, Mail, Phone, Globe, Heart as HeartIcon
} from 'lucide-react'
import InvitationScene3D from '../components/invitaciones/InvitationScene3D'

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function Rings() {
  return (
    <div className="relative w-56 h-56 sm:w-72 sm:h-72 mx-auto">
      <svg viewBox="0 0 300 300" className="w-full h-full animate-ring-spin" style={{ transformOrigin: 'center' }}>
        <circle cx="130" cy="150" r="70" fill="none" stroke="#DFC5A8" strokeWidth="1.5" opacity="0.3" />
        <circle cx="130" cy="150" r="55" fill="none" stroke="#DFC5A8" strokeWidth="1" strokeDasharray="3 6" opacity="0.4" />
        <circle cx="170" cy="150" r="70" fill="none" stroke="#DFC5A8" strokeWidth="1.5" opacity="0.3" />
        <circle cx="170" cy="150" r="55" fill="none" stroke="#DFC5A8" strokeWidth="1" strokeDasharray="3 6" opacity="0.4" />
      </svg>
      <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full animate-ring-spin-reverse" style={{ transformOrigin: 'center' }}>
        <circle cx="130" cy="135" r="35" fill="none" stroke="#C4956A" strokeWidth="1" opacity="0.5" />
        <circle cx="170" cy="135" r="35" fill="none" stroke="#C4956A" strokeWidth="1" opacity="0.5" />
        <circle cx="150" cy="155" r="12" fill="none" stroke="#C4956A" strokeWidth="2" opacity="0.4" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Heart className="w-8 h-8 text-[#C4956A] opacity-30 animate-pulse-soft" />
      </div>
    </div>
  )
}

function Ornament({ className = '' }) {
  return (
    <svg viewBox="0 0 240 24" className={`h-6 ${className}`} style={{ width: '240px' }}>
      <path d="M0,12 L100,12" stroke="#C4956A" strokeWidth="0.5" opacity="0.4" />
      <circle cx="108" cy="12" r="3" fill="none" stroke="#C4956A" strokeWidth="0.8" opacity="0.6" />
      <path d="M114,5 Q120,0 126,5 Q132,10 126,15 Q120,20 114,15 Q108,10 114,5" fill="none" stroke="#C4956A" strokeWidth="0.8" opacity="0.5" />
      <circle cx="132" cy="12" r="3" fill="none" stroke="#C4956A" strokeWidth="0.8" opacity="0.6" />
      <path d="M140,12 L240,12" stroke="#C4956A" strokeWidth="0.5" opacity="0.4" />
    </svg>
  )
}

const navLinks = [
  { href: '#', label: 'Inicio' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#disenos', label: 'Diseños' },
  { href: '#caracteristicas', label: 'Características' },
  { href: '#contacto', label: 'Contacto' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    setIsOpen(false)
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FBF6F0]/90 backdrop-blur-xl shadow-lg shadow-[#2C1810]/5 border-b border-[#DFC5A8]/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" onClick={(e) => handleNavClick(e, '#')} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7A1A2E] to-[#4F0F1D] flex items-center justify-center shadow-lg shadow-[#7A1A2E]/20">
              <HeartIcon className="w-4 h-4 text-[#DFC5A8]" />
            </div>
            <span className="font-display text-xl font-bold">
              <span className={scrolled ? 'text-[#2C1810]' : 'text-white'}>Eter</span>
              <span className="text-[#C4956A]">no</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-2 rounded-xl text-sm font-body font-medium transition-all duration-300 ${
                  scrolled
                    ? 'text-[#8C7C7A] hover:text-[#7A1A2E] hover:bg-[#7A1A2E]/5'
                    : 'text-[#E8D5D0] hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/invitaciones/crear"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#C4956A] hover:bg-[#B8864E] text-white font-body font-semibold text-xs tracking-wider uppercase rounded-full transition-all duration-500 hover:shadow-xl hover:shadow-[#C4956A]/30 hover:-translate-y-0.5"
              >
                Crear invitación
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2.5 rounded-xl transition-all ${
              scrolled ? 'text-[#2C1810] hover:bg-[#7A1A2E]/5' : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-[#FBF6F0]/95 backdrop-blur-xl border-t border-[#DFC5A8]/20 shadow-2xl mx-4 sm:mx-6 mb-4 rounded-2xl overflow-hidden">
          <div className="py-3 px-2 space-y-0.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-4 py-3 rounded-xl text-sm font-body font-medium text-[#8C7C7A] hover:text-[#7A1A2E] hover:bg-[#7A1A2E]/5 transition-all"
              >
                {link.label}
              </a>
            ))}
            <hr className="my-2 border-[#DFC5A8]/20 mx-2" />
            <Link
              to="/invitaciones/crear"
              className="block px-4 py-3 rounded-xl text-sm font-semibold text-white bg-[#C4956A] hover:bg-[#B8864E] mx-2 mt-2 text-center transition-all"
            >
              Crear invitación
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  const footerLinks = [
    { href: '#', label: 'Inicio' },
    { href: '#como-funciona', label: 'Cómo funciona' },
    { href: '#disenos', label: 'Diseños' },
    { href: '#caracteristicas', label: 'Características' },
    { href: '#contacto', label: 'Contacto' },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-[#5C1422] to-[#3A0D14] text-[#E8D5D0] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #C4956A 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }} />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="py-16 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7A1A2E] to-[#4F0F1D] flex items-center justify-center shadow-lg shadow-[#7A1A2E]/20">
                <Heart className="w-4 h-4 text-[#DFC5A8]" />
              </div>
              <span className="font-display text-xl font-bold">
                <span className="text-white">Eter</span>
                <span className="text-[#C4956A]">no</span>
              </span>
            </a>
            <p className="text-[#D4B5B0] text-sm font-body leading-relaxed mb-6 max-w-xs">
              Invitaciones de boda online, tan únicas como su amor. Creamos momentos digitales que perduran para siempre.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#C4956A]/20 border border-white/10 flex items-center justify-center transition-all duration-300 group">
                <Globe className="w-4 h-4 text-[#D4B5B0] group-hover:text-[#C4956A] transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#C4956A]/20 border border-white/10 flex items-center justify-center transition-all duration-300 group">
                <Camera className="w-4 h-4 text-[#D4B5B0] group-hover:text-[#C4956A] transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#C4956A]/20 border border-white/10 flex items-center justify-center transition-all duration-300 group">
                <MessageCircle className="w-4 h-4 text-[#D4B5B0] group-hover:text-[#C4956A] transition-colors" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-5">Enlaces</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      const el = document.querySelector(link.href)
                      if (el) el.scrollIntoView({ behavior: 'smooth' })
                      else window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="text-sm font-body text-[#D4B5B0] hover:text-[#C4956A] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-5">Servicios</h4>
            <ul className="space-y-3">
              {['Invitaciones digitales', 'Confirmación online', 'Galería de fotos', 'Mapa interactivo', 'Música ambiental'].map((s) => (
                <li key={s}>
                  <span className="text-sm font-body text-[#D4B5B0]">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-5">Contacto</h4>
            <div className="space-y-3 text-sm font-body">
              <a href="mailto:hola@eterno.invitations" className="flex items-center gap-3 text-[#D4B5B0] hover:text-[#C4956A] transition-colors">
                <Mail className="w-4 h-4 text-[#C4956A]" />
                hola@eterno.invitations
              </a>
              <a href="tel:+34900000000" className="flex items-center gap-3 text-[#D4B5B0] hover:text-[#C4956A] transition-colors">
                <Phone className="w-4 h-4 text-[#C4956A]" />
                900 000 000
              </a>
              <div className="flex items-center gap-3 text-[#D4B5B0] mt-6 pt-4 border-t border-white/5">
                <HeartIcon className="w-4 h-4 text-[#C4956A]" />
                <span>Hecho con amor para ustedes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-body text-[#D4B5B0]/60">
          <p>&copy; {new Date().getFullYear()} Eterno. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#C4956A] transition-colors">Términos</a>
            <a href="#" className="hover:text-[#C4956A] transition-colors">Privacidad</a>
            <a href="#" className="hover:text-[#C4956A] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[#5C1422] via-[#7A1A2E] to-[#8B3A42]">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32 sm:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-2">
              <p
                className="font-script text-[#DFC5A8] text-2xl sm:text-3xl opacity-0 animate-fade-up"
                style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
              >
                Save the Date
              </p>
              <h1
                className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight opacity-0 animate-fade-up"
                style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
              >
                El primer{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DFC5A8] to-[#C4956A]">sí</span>
                ,<br />
                empieza aquí
              </h1>
            </div>

            <p
              className="text-[#E8D5D0] text-lg sm:text-xl font-body leading-relaxed max-w-lg mx-auto lg:mx-0 opacity-0 animate-fade-up"
              style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
            >
              Invitaciones de boda online, tan únicas como su amor. Cree, personalice y comparta su invitación en minutos.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start opacity-0 animate-fade-up"
              style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
            >
              <Link
                to="/invitaciones/crear"
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#C4956A] hover:bg-[#B8864E] text-white font-body font-semibold text-sm tracking-wider uppercase rounded-full transition-all duration-500 hover:shadow-2xl hover:shadow-[#C4956A]/30 hover:-translate-y-0.5"
              >
                Crear invitación
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/invitaciones/disenos"
                className="group inline-flex items-center gap-2 px-8 py-4 text-[#E8D5D0] hover:text-white font-body text-sm tracking-wider uppercase rounded-full border border-[#E8D5D0]/30 hover:border-[#E8D5D0]/60 transition-all duration-500"
              >
                Ver diseños
              </Link>
            </div>

            <div
              className="flex items-center gap-6 justify-center lg:justify-start pt-4 text-[#E8D5D0]/60 text-xs font-body opacity-0 animate-fade-up"
              style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}
            >
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#C4956A]" /> Sin descargar</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#C4956A]" /> Personalizable</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#C4956A]" /> Compartir al instante</span>
            </div>
          </div>

          <div
            className="hidden lg:flex items-center justify-center"
          >
            <div className="w-72 h-80">
              <InvitationScene3D />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#FBF6F0]" />
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Palette,
      title: 'Elige tu diseño',
      desc: 'Explore nuestra colección de plantillas exclusivas, desde lo clásico hasta lo contemporáneo.',
    },
    {
      number: '02',
      icon: Sparkles,
      title: 'Personaliza cada detalle',
      desc: 'Colores, textos, fotos y música. Haga que cada invitación refleje su historia única.',
    },
    {
      number: '03',
      icon: Share2,
      title: 'Comparte al instante',
      desc: 'Envíe por WhatsApp, email o redes sociales. Sus invitados confirman con un solo clic.',
    },
  ]

  return (
    <section id="como-funciona" className="relative bg-[#FBF6F0] py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C4956A]/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center space-y-4 mb-16 sm:mb-20">
          <p className="font-script text-[#C4956A] text-xl sm:text-2xl">How it Works</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C1810]">
            Tres pasos para un{' '}
            <span className="italic text-[#7A1A2E]">sí</span> inolvidable
          </h2>
          <p className="font-body text-[#8C7C7A] text-lg max-w-2xl mx-auto">
            Crear la invitación perfecta nunca fue tan sencillo
          </p>
          <div className="flex justify-center pt-4">
            <Ornament />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="scroll-reveal group relative text-center"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="relative inline-flex mb-8">
                  <div className="w-20 h-20 rounded-full bg-white/80 backdrop-blur border border-[#DFC5A8]/30 flex items-center justify-center shadow-lg shadow-[#C4956A]/5 group-hover:shadow-xl group-hover:shadow-[#C4956A]/10 transition-all duration-500">
                    <Icon className="w-8 h-8 text-[#7A1A2E] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#7A1A2E] text-[#DFC5A8] text-xs font-display font-bold flex items-center justify-center shadow-lg">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#2C1810] mb-3">{step.title}</h3>
                <p className="font-body text-[#8C7C7A] text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-6 text-[#C4956A]/30">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const templates = [
  { name: 'Clásico Eterno', style: 'Clásico', color: 'from-rose-100 to-rose-50', accent: '#7A1A2E', badge: 'Popular' },
  { name: 'Rústico Encanto', style: 'Rústico', color: 'from-amber-100 to-amber-50', accent: '#8B6F47', badge: null },
  { name: 'Moderno Minimal', style: 'Moderno', color: 'from-slate-100 to-slate-50', accent: '#2C1810', badge: 'Nuevo' },
  { name: 'Tropical Bliss', style: 'Tropical', color: 'from-emerald-100 to-emerald-50', accent: '#2D6A4F', badge: null },
  { name: 'Romance Vintage', style: 'Vintage', color: 'from-pink-100 to-pink-50', accent: '#9B5E6B', badge: null },
  { name: 'Gold Luxury', style: 'Lujo', color: 'from-yellow-100 to-yellow-50', accent: '#B8864E', badge: 'Premium' },
]

function Gallery() {
  return (
    <section id="disenos" className="relative bg-[#F5EDE0] py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center space-y-4 mb-16 sm:mb-20">
          <p className="font-script text-[#C4956A] text-xl sm:text-2xl">Nuestros Diseños</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C1810]">
            Plantillas que{' '}
            <span className="italic text-[#7A1A2E]">enamoran</span>
          </h2>
          <p className="font-body text-[#8C7C7A] text-lg max-w-2xl mx-auto">
            Cada diseño está creado con el corazón, pensando en su historia
          </p>
          <div className="flex justify-center pt-4">
            <Ornament />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {templates.map((t, i) => (
            <div
              key={t.name}
              className="scroll-reveal group cursor-pointer"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-white shadow-lg shadow-black/5 group-hover:shadow-2xl group-hover:shadow-black/10 transition-all duration-700">
                <div className={`absolute inset-0 bg-gradient-to-br ${t.color}`}>
                  <div className="absolute inset-0 opacity-[0.06]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0v40M0 20h40' stroke='%23000' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`
                  }} />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3 -mt-8">
                    <div className="w-16 h-16 mx-auto rounded-full border-2 border-dashed" style={{ borderColor: t.accent + '40' }} />
                    <div className="w-24 h-0.5 mx-auto rounded-full" style={{ backgroundColor: t.accent + '30' }} />
                    <div className="w-32 h-32 mx-auto rounded-full border" style={{ borderColor: t.accent + '20', borderWidth: '1px' }} />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-body text-sm font-medium">{t.style}</span>
                    {t.badge && (
                      <span className="text-[10px] font-body font-semibold uppercase tracking-wider text-white bg-white/20 backdrop-blur px-3 py-1 rounded-full">
                        {t.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
                  <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm">
                    <p className="text-xs font-body font-medium" style={{ color: t.accent }}>{t.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 scroll-reveal">
          <Link
            to="/invitaciones/disenos"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#7A1A2E] hover:bg-[#5C1422] text-white font-body font-semibold text-sm tracking-wider uppercase rounded-full transition-all duration-500 hover:shadow-2xl hover:shadow-[#7A1A2E]/30"
          >
            Ver todas las plantillas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

const features = [
  { icon: Smartphone, title: 'Diseño responsive', desc: 'Se ve perfecto en cualquier dispositivo, desde el móvil hasta la pantalla más grande.' },
  { icon: Camera, title: 'Fotos y galería', desc: 'Sube tus mejores fotos y crea una galería que cuente su historia de amor.' },
  { icon: Calendar, title: 'Confirmación online', desc: 'Sus invitados confirman asistencia con un clic. Usted ve todo desde su panel.' },
  { icon: MapPin, title: 'Mapa interactivo', desc: 'Incluya la ubicación de la ceremonia y recepción con mapas integrados.' },
  { icon: Music, title: 'Música ambiente', desc: 'Añada su canción favorita para que suene al abrir la invitación.' },
  { icon: MessageCircle, title: 'Compartir directo', desc: 'Comparta por WhatsApp, email, redes sociales o con un enlace privado.' },
]

function Features() {
  return (
    <section id="caracteristicas" className="relative bg-[#FBF6F0] py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C4956A]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center space-y-4 mb-16 sm:mb-20">
          <p className="font-script text-[#C4956A] text-xl sm:text-2xl">Características</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C1810]">
            Todo lo que necesita{' '}
            <span className="italic text-[#7A1A2E]">en un solo lugar</span>
          </h2>
          <p className="font-body text-[#8C7C7A] text-lg max-w-2xl mx-auto">
            Desde el diseño hasta la confirmación, lo tenemos cubierto
          </p>
          <div className="flex justify-center pt-4">
            <Ornament />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="scroll-reveal group p-8 rounded-2xl bg-white/70 backdrop-blur border border-[#DFC5A8]/20 hover:border-[#C4956A]/30 hover:bg-white/90 transition-all duration-500 hover:shadow-xl hover:shadow-[#C4956A]/5"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7A1A2E] to-[#5C1422] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#7A1A2E]/20 transition-all duration-500">
                  <Icon className="w-5 h-5 text-[#DFC5A8]" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#2C1810] mb-2">{f.title}</h3>
                <p className="font-body text-[#8C7C7A] text-sm leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const testimonials = [
  {
    name: 'María & Carlos',
    date: '15 marzo 2026',
    text: 'La invitación fue un éxito total. Todos nuestros invitados nos dijeron que era la invitación más bonita que habían recibido. El proceso fue muy sencillo y el resultado espectacular.',
    rating: 5,
  },
  {
    name: 'Ana & Javier',
    date: '2 febrero 2026',
    text: 'Pudimos personalizar cada detalle hasta que quedó exactamente como soñábamos. La opción de confirmación online nos salvó de tener que estar llamando a cada invitado.',
    rating: 5,
  },
  {
    name: 'Elena & Diego',
    date: '20 enero 2026',
    text: 'Compartir la invitación por WhatsApp fue tan práctico. Nuestros invitados internacionales pudieron verla al instante, y el mapa interactivo les ayudó muchísimo.',
    rating: 5,
  },
]

function Testimonials() {
  return (
    <section id="testimonios" className="relative bg-[#F5EDE0] py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #7A1A2E 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center space-y-4 mb-16 sm:mb-20">
          <p className="font-script text-[#C4956A] text-xl sm:text-2xl">Testimonios</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C1810]">
            Historias que{' '}
            <span className="italic text-[#7A1A2E]">inspiran</span>
          </h2>
          <p className="font-body text-[#8C7C7A] text-lg max-w-2xl mx-auto">
            Lo que dicen las parejas que confiaron en nosotros
          </p>
          <div className="flex justify-center pt-4">
            <Ornament />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="scroll-reveal group p-8 rounded-2xl bg-white/80 backdrop-blur border border-[#DFC5A8]/20 hover:border-[#C4956A]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#C4956A]/5 relative"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="absolute -top-3 -left-3 text-5xl font-serif text-[#C4956A]/20 leading-none">&ldquo;</div>
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#C4956A] text-[#C4956A]" />
                ))}
              </div>
              <p className="font-body text-[#4A3A38] text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-[#DFC5A8]/20">
                <p className="font-display font-bold text-[#2C1810] text-sm">{t.name}</p>
                <p className="font-body text-[#8C7C7A] text-xs">{t.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section id="contacto" className="relative bg-gradient-to-b from-[#7A1A2E] to-[#4F0F1D] py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '80px 80px'
      }} />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="space-y-2 mb-8">
          <p
            className="font-script text-[#DFC5A8] text-2xl sm:text-3xl opacity-0 animate-fade-up"
            style={{ animationFillMode: 'forwards' }}
          >
            ¡Empieza ahora!
          </p>
          <h2
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] opacity-0 animate-fade-up"
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            Comienza su historia{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DFC5A8] to-[#C4956A]">hoy</span>
          </h2>
        </div>

        <p
          className="font-body text-[#E8D5D0] text-lg sm:text-xl max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up"
          style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
        >
            Cree su invitación en minutos y comparta el amor con quienes más importan
        </p>

        <div
          className="flex flex-col sm:flex-row items-center gap-4 justify-center opacity-0 animate-fade-up"
          style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
        >
          <Link
            to="/invitaciones/crear"
            className="group inline-flex items-center gap-2.5 px-10 py-5 bg-[#C4956A] hover:bg-[#B8864E] text-white font-body font-semibold text-sm tracking-wider uppercase rounded-full transition-all duration-500 hover:shadow-2xl hover:shadow-[#C4956A]/30 hover:-translate-y-0.5"
          >
            Crear mi invitación
            <Heart className="w-4 h-4 transition-transform duration-300 group-hover:scale-125" />
          </Link>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 px-10 py-5 text-[#E8D5D0] hover:text-white font-body text-sm tracking-wider uppercase rounded-full border border-[#E8D5D0]/30 hover:border-[#E8D5D0]/60 transition-all duration-500"
          >
            Hablar con nosotros
          </Link>
        </div>

        <div
          className="flex items-center gap-6 justify-center mt-12 text-[#E8D5D0]/50 text-xs font-body opacity-0 animate-fade-up"
          style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
        >
          <span>Sin compromiso</span>
          <span className="w-1 h-1 rounded-full bg-[#C4956A]/40" />
          <span>Personalización total</span>
          <span className="w-1 h-1 rounded-full bg-[#C4956A]/40" />
          <span>Cancelación gratuita</span>
        </div>
      </div>
    </section>
  )
}

export default function Invitaciones() {
  useScrollReveal()

  return (
    <div className="noise-texture min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Gallery />
        <Features />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
