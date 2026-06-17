import ScrollReveal from '../components/common/ScrollReveal'
import PricingPlans from '../components/pricing/PricingPlans'
import { Shield } from 'lucide-react'

export default function Pricing() {
  return (
    <div className="pt-20">
      <section className="py-20 lg:py-28 bg-gradient-dark noise-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #f5b342 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-1/4 -left-32 w-[350px] h-[350px] bg-[#f5b342]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-[350px] h-[350px] bg-[#f08a3a]/5 rounded-full blur-[100px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white leading-tight mb-6 tracking-tight">
                Precios <span className="text-gradient">claros</span>
              </h1>
              <p className="text-lg text-[#5a5652] mb-4 max-w-xl mx-auto">
                Sin sorpresas ni costes ocultos. Solo resultados.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <PricingPlans />
      <section className="py-16 bg-[#111111] border-t border-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 p-6 rounded-xl bg-[#141414] border border-[#1e1e1e] max-w-3xl mx-auto">
            <Shield className="w-6 h-6 text-[#f5b342] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-white mb-1">Garantía de satisfacción</p>
              <p className="text-sm text-[#5a5652] leading-relaxed">Si no estás 100% satisfecho con el resultado, te devolvemos tu dinero. Sin preguntas.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
