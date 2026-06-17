import { Check, ArrowRight } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'
import Button from '../common/Button'

const plans = [
  {
    name: 'Starter',
    price: '299',
    desc: 'Perfecto para negocios que inician su presencia digital.',
    features: ['Web corporativa', 'Diseño responsive', 'SSL incluido', 'Formulario de contacto', 'SEO básico'],
  },
  {
    name: 'Profesional',
    price: '599',
    desc: 'Para empresas que buscan una solución completa.',
    features: ['Todo lo de Starter', 'Tienda online o blog', 'SEO avanzado', 'Galería multimedia', 'Integración redes sociales', 'Google Analytics'],
    popular: true,
  },
  {
    name: 'Premium',
    price: '999',
    desc: 'Solución integral con soporte y funcionalidades avanzadas.',
    features: ['Todo lo de Profesional', 'Web + Tienda + Blog', 'Panel administrador', 'Multilingüe', 'Soporte prioritario 24/7', 'Mantenimiento 3 meses'],
  },
]

export default function PricingPlans() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold text-[#f5b342] uppercase tracking-[0.2em] font-body">Precios</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mt-4 leading-tight tracking-tight">
              Precios <span className="text-gradient">transparentes</span>, sin sorpresas
            </h2>
            <p className="mt-5 text-lg text-[#5a5652]">Elige el plan que mejor se adapte a tu negocio.</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.12}>
              <div className={`relative rounded-xl p-8 transition-all duration-500 hover:-translate-y-1.5 ${
                plan.popular
                  ? 'bg-[#1a1a1a] border border-[#f5b342]/30 shadow-2xl shadow-[#f5b342]/10 scale-105 md:scale-110'
                  : 'bg-[#141414] border border-[#1e1e1e] shadow-card hover:shadow-card-hover'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-accent px-5 py-1 rounded-full text-xs font-semibold text-[#0a0a0a] shadow-lg shadow-[#f5b342]/20">
                    Más popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-display font-semibold text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-[#5a5652] mb-4">{plan.desc}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-sm text-[#5a5652]">€</span>
                    <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                  </div>
                  <p className="text-xs text-[#5a5652] mt-1">pago único</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-[#8a8682]">
                      <div className="w-5 h-5 rounded-full bg-[#f5b342]/10 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#f5b342]" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button to="/contacto" variant={plan.popular ? 'primary' : 'ghost'} className="w-full" icon={ArrowRight}>
                  Elegir {plan.name}
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
