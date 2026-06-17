import { HelpCircle } from 'lucide-react'
import Ornament from './shared/Ornament'

const DEFAULT_FAQS = [
  { q: '¿Puedo llevar acompañante?', a: 'Sí, siempre que lo hayas indicado en la confirmación de asistencia.' },
  { q: '¿Hay estacionamiento?', a: 'Sí, contamos con estacionamiento privado con cupo limitado.' },
  { q: '¿La ceremonia será al aire libre?', a: 'La ceremonia será en el jardín principal. Recomendamos llevar calzado cómodo.' },
  { q: '¿A qué hora termina la fiesta?', a: 'La fiesta termina a las 2:00 AM.' },
  { q: '¿Pueden asistir niños?', a: 'Sí, habrá zona infantil con cuidado y actividades.' },
]

export default function FaqSection({ data, style }) {
  const faqs = data.faqs || DEFAULT_FAQS
  const isDark = style.id === 'gold-luxury'

  return (
    <section className="px-6 py-10" style={{ backgroundColor: isDark ? style.surface : `${style.primary}04` }}>
      <div className="text-center space-y-4 mb-8">
        <Ornament color={style.secondary} variant={style.ornament} />
        <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>Preguntas Frecuentes</p>
      </div>
      <div className="max-w-xs mx-auto space-y-3">
        {faqs.map((faq, i) => (
          <details key={i} className="group rounded-xl overflow-hidden" style={{ backgroundColor: isDark ? '#0A0A0A' : style.surface }}>
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-xs font-medium list-none" style={{ color: style.text }}>
              {faq.q}
              <HelpCircle className="w-3 h-3 shrink-0 ml-2 transition-transform group-open:rotate-180" style={{ color: style.secondary }} />
            </summary>
            <div className="px-4 pb-3 text-xs leading-relaxed" style={{ color: style.textMuted }}>
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
