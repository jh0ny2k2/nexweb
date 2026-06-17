import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft, Heart, Sparkles, Share2, Check,
  Palette, Calendar, MapPin, Music, MessageCircle, ChevronDown,
  Plus,
} from 'lucide-react'
import WeddingPreview from '../components/invitaciones/WeddingPreview'
import { SECTION_MAP, DEFAULT_SECTIONS } from '../components/invitaciones/sections'

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
    timeline: [{ date: 'Enero 2020', title: 'Primer Encuentro', desc: 'Nos conocimos en casa de amigos.' }],
    schedule: [{ time: '16:00', title: 'Ceremonia', desc: 'Iglesia San Miguel' }],
    hotels: [{ name: 'Hotel Boutique', address: 'Calle Principal 123', discount: '10% descuento' }],
    weddingParty: [{ name: 'María & Juan', role: 'Padrinos de Velación' }],
    faqs: [{ q: '¿Puedo llevar acompañante?', a: 'Sí, indícalo al confirmar.' }],
    galleryUrls: [],
  })
  const [selectedStyle, setSelectedStyle] = useState(initialDesign)
  const [sections, setSections] = useState([...DEFAULT_SECTIONS])
  const [editingSection, setEditingSection] = useState(null)
  const [showCopied, setShowCopied] = useState(false)
  const [showMobilePreview, setShowMobilePreview] = useState(false)

  const update = (key, value) => setData((prev) => ({ ...prev, [key]: value }))

  const updateArrayItem = (key, index, field, value) => {
    setData((prev) => {
      const arr = [...(prev[key] || [])]
      if (!arr[index]) return prev
      arr[index] = { ...arr[index], [field]: value }
      return { ...prev, [key]: arr }
    })
  }

  const addArrayItem = (key, template) => {
    setData((prev) => ({ ...prev, [key]: [...(prev[key] || []), { ...template }] }))
  }

  const removeArrayItem = (key, index) => {
    setData((prev) => {
      const arr = [...(prev[key] || [])]
      arr.splice(index, 1)
      return { ...prev, [key]: arr }
    })
  }

  const toggleSection = (id) => {
    setSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const moveSection = (id, dir) => {
    setSections((prev) => {
      const idx = prev.indexOf(id)
      if (idx === -1) return prev
      const target = idx + dir
      if (target < 0 || target >= prev.length) return prev
      const next = [...prev]
      ;[next[idx], next[target]] = [next[target], next[idx]]
      return next
    })
  }

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

              <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#DFC5A8]/20">
                <h3 className="text-sm font-bold mb-5 flex items-center gap-2 text-[#7A1A2E]">
                  <Plus className="w-4 h-4" />
                  Secciones de la página
                </h3>
                <p className="text-[10px] text-[#8C7C7A] mb-4">Activa, ordena y edita el contenido de cada sección</p>
                <div className="space-y-1">
                  {Object.entries(SECTION_MAP).map(([id, sec]) => {
                    const active = sections.includes(id)
                    const expanded = editingSection === id
                    const Icon = sec.icon
                    return (
                      <div key={id}>
                        <div
                          className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer"
                          style={{ backgroundColor: active ? '#7A1A2E08' : 'transparent' }}
                          onClick={() => active && setEditingSection(expanded ? null : id)}
                        >
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={(e) => { e.stopPropagation(); moveSection(id, -1) }}
                              className="w-4 h-4 flex items-center justify-center rounded hover:bg-black/5 transition-all"
                              disabled={!active}
                              style={{ opacity: active ? 1 : 0.2, cursor: active ? 'pointer' : 'not-allowed' }}
                            >
                              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="#8C7C7A" strokeWidth="1.5"><path d="M4 7V1M4 1L1 4M4 1L7 4"/></svg>
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); moveSection(id, 1) }}
                              className="w-4 h-4 flex items-center justify-center rounded hover:bg-black/5 transition-all"
                              disabled={!active}
                              style={{ opacity: active ? 1 : 0.2, cursor: active ? 'pointer' : 'not-allowed' }}
                            >
                              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="#8C7C7A" strokeWidth="1.5"><path d="M4 1v6M4 7l3-3M4 7L1 4"/></svg>
                            </button>
                          </div>

                          <button
                            onClick={(e) => { e.stopPropagation(); toggleSection(id) }}
                            className="flex items-center gap-2"
                          >
                            <div
                              className="w-5 h-5 rounded-md flex items-center justify-center transition-all"
                              style={{ backgroundColor: active ? '#7A1A2E' : '#DFC5A8' }}
                            >
                              {active && <Check className="w-3 h-3 text-white" />}
                            </div>
                          </button>

                          <button
                            onClick={() => { if (active) setEditingSection(expanded ? null : id) }}
                            className="flex items-center gap-2 flex-1 text-left"
                          >
                            <Icon className="w-3.5 h-3.5" style={{ color: active ? '#7A1A2E' : '#8C7C7A' }} />
                            <span className="text-xs font-medium" style={{ color: active ? '#2C1810' : '#8C7C7A' }}>
                              {sec.name}
                            </span>
                          </button>

                          <span className="text-[9px] text-[#8C7C7A]">#{sections.indexOf(id) + 1 || '-'}</span>
                        </div>

                        {active && expanded && (
                          <div className="px-3 pb-3 pt-2 space-y-3">
                            <SectionEditFields
                              sectionId={id}
                              data={data}
                              update={update}
                              updateArrayItem={updateArrayItem}
                              addArrayItem={addArrayItem}
                              removeArrayItem={removeArrayItem}
                              inputClass={inputClass}
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}
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
                <WeddingPreview data={data} selectedStyle={selectedStyle} sections={sections} />

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

function Input({ label, value, onChange, placeholder, isTextarea }) {
  if (isTextarea) {
    return (
      <div>
        <label className="block text-xs font-medium mb-1.5 text-[#8C7C7A]">{label}</label>
        <textarea
          value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} rows={2}
          className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all outline-none focus:ring-2 resize-none"
          style={{ borderColor: '#DFC5A8', backgroundColor: '#FBF6F0', color: '#2C1810' }}
        />
      </div>
    )
  }
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

function ArrayEditor({ items, keyLabel, keyField, fields, onUpdate, onAdd, onRemove, inputClass }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="p-2 rounded-lg" style={{ backgroundColor: '#F3EDE5' }}>
          <div className="grid grid-cols-1 gap-1.5">
            {fields.map((f) => (
              <div key={f.key}>
                <label className="block text-[9px] font-medium mb-0.5 text-[#8C7C7A] uppercase tracking-wider">{f.label}</label>
                {f.isTextarea ? (
                  <textarea
                    value={item[f.key] || ''} onChange={(e) => onUpdate(i, f.key, e.target.value)}
                    rows={1} placeholder={f.placeholder}
                    className={inputClass} style={{ borderColor: '#DFC5A8', backgroundColor: '#FBF6F0', color: '#2C1810', fontSize: '11px' }}
                  />
                ) : (
                  <input
                    type="text" value={item[f.key] || ''} onChange={(e) => onUpdate(i, f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className={inputClass} style={{ borderColor: '#DFC5A8', backgroundColor: '#FBF6F0', color: '#2C1810', fontSize: '11px' }}
                  />
                )}
              </div>
            ))}
          </div>
          {items.length > 1 && (
            <button onClick={() => onRemove(i)} className="mt-1 text-[9px] font-medium text-red-400 hover:text-red-500" children="Eliminar" />
          )}
        </div>
      ))}
      <button
        onClick={() => onAdd(Object.fromEntries(fields.map((f) => [f.key, ''])))} className="text-[10px] font-medium transition-colors"
        style={{ color: '#7A1A2E' }}
      >
        + Agregar {keyLabel}
      </button>
    </div>
  )
}

function SectionEditFields({ sectionId, data, update, updateArrayItem, addArrayItem, removeArrayItem, inputClass }) {
  switch (sectionId) {
    case 'hero': return <Input label="Mensaje de bienvenida (opcional)" value={''} onChange={() => {}} placeholder="Save the Date" isTextarea />;

    case 'story': return (
      <Input label="Historia de amor" value={data.historia} onChange={(v) => update('historia', v)} placeholder="Cuéntanos cómo se conocieron..." isTextarea />
    )

    case 'timeline': return (
      <div>
        <p className="text-[9px] font-medium mb-2 text-[#8C7C7A] uppercase tracking-wider">Eventos importantes</p>
        <ArrayEditor
          items={data.timeline || []} keyLabel="evento" keyField="timeline"
          fields={[
            { key: 'date', label: 'Fecha', placeholder: 'Enero 2020' },
            { key: 'title', label: 'Título', placeholder: 'Primer Encuentro' },
            { key: 'desc', label: 'Descripción', placeholder: '¿Qué pasó?', isTextarea: true },
          ]}
          onUpdate={(i, f, v) => updateArrayItem('timeline', i, f, v)}
          onAdd={() => addArrayItem('timeline', { date: '', title: '', desc: '' })}
          onRemove={(i) => removeArrayItem('timeline', i)}
          inputClass={inputClass}
        />
      </div>
    )

    case 'events': return (
      <div className="space-y-2">
        <div className="text-[9px] font-medium text-[#8C7C7A] uppercase tracking-wider">Ceremonia</div>
        <div className="grid grid-cols-2 gap-2">
          <Input label="Hora" value={data.hora_ceremonia} onChange={(v) => update('hora_ceremonia', v)} placeholder="17:00 h" />
          <Input label="Lugar" value={data.lugar_ceremonia} onChange={(v) => update('lugar_ceremonia', v)} placeholder="Iglesia San Miguel" />
        </div>
        <div className="text-[9px] font-medium text-[#8C7C7A] uppercase tracking-wider pt-1">Recepción</div>
        <div className="grid grid-cols-2 gap-2">
          <Input label="Hora" value={data.hora_recepcion} onChange={(v) => update('hora_recepcion', v)} placeholder="19:30 h" />
          <Input label="Lugar" value={data.lugar_recepcion} onChange={(v) => update('lugar_recepcion', v)} placeholder="Hacienda Los Olivos" />
        </div>
      </div>
    )

    case 'schedule': return (
      <div>
        <p className="text-[9px] font-medium mb-2 text-[#8C7C7A] uppercase tracking-wider">Horarios del día</p>
        <ArrayEditor
          items={data.schedule || []} keyLabel="horario" keyField="schedule"
          fields={[
            { key: 'time', label: 'Hora', placeholder: '16:00' },
            { key: 'title', label: 'Actividad', placeholder: 'Ceremonia' },
            { key: 'desc', label: 'Detalle', placeholder: 'Iglesia San Miguel', isTextarea: true },
          ]}
          onUpdate={(i, f, v) => updateArrayItem('schedule', i, f, v)}
          onAdd={() => addArrayItem('schedule', { time: '', title: '', desc: '' })}
          onRemove={(i) => removeArrayItem('schedule', i)}
          inputClass={inputClass}
        />
      </div>
    )

    case 'gallery': return (
      <Input label="URLs de fotos (separadas por coma)" value={data.galleryUrls?.join(', ')} onChange={(v) => update('galleryUrls', v.split(',').map((s) => s.trim()).filter(Boolean))} placeholder="https://..." isTextarea />
    )

    case 'rsvp': return (
      <Input label="Fecha límite de confirmación" value={data.fecha_limite} onChange={(v) => update('fecha_limite', v)} placeholder="1 de Junio de 2026" />
    )

    case 'dresscode': return (
      <Input label="Código de vestimenta" value={data.dress_code} onChange={(v) => update('dress_code', v)} placeholder="Formal: traje y corbata" isTextarea />
    )

    case 'registry': return (
      <Input label="Mesa de regalos" value={data.registry} onChange={(v) => update('registry', v)} placeholder="El Corte Inglés #1234" isTextarea />
    )

    case 'music': return (
      <div>
        <label className="block text-xs font-medium mb-1.5 text-[#8C7C7A]">Canción</label>
        <select value={data.musica} onChange={(e) => update('musica', e.target.value)} className={inputClass} style={{ borderColor: '#DFC5A8', backgroundColor: '#FBF6F0', color: '#2C1810' }}>
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
    )

    case 'location': return (
      <div className="space-y-2">
        <Input label="Lugar de ceremonia" value={data.lugar_ceremonia} onChange={(v) => update('lugar_ceremonia', v)} placeholder="Iglesia San Miguel" />
        <Input label="Lugar de recepción" value={data.lugar_recepcion} onChange={(v) => update('lugar_recepcion', v)} placeholder="Hacienda Los Olivos" />
      </div>
    )

    case 'accommodation': return (
      <div>
        <p className="text-[9px] font-medium mb-2 text-[#8C7C7A] uppercase tracking-wider">Hoteles recomendados</p>
        <ArrayEditor
          items={data.hotels || []} keyLabel="hotel" keyField="hotels"
          fields={[
            { key: 'name', label: 'Nombre', placeholder: 'Hotel Boutique' },
            { key: 'address', label: 'Dirección', placeholder: 'Calle Principal 123' },
            { key: 'discount', label: 'Descuento', placeholder: '10% descuento' },
          ]}
          onUpdate={(i, f, v) => updateArrayItem('hotels', i, f, v)}
          onAdd={() => addArrayItem('hotels', { name: '', address: '', discount: '' })}
          onRemove={(i) => removeArrayItem('hotels', i)}
          inputClass={inputClass}
        />
      </div>
    )

    case 'weddingParty': return (
      <div>
        <p className="text-[9px] font-medium mb-2 text-[#8C7C7A] uppercase tracking-wider">Miembros del cortejo</p>
        <ArrayEditor
          items={data.weddingParty || []} keyLabel="miembro" keyField="weddingParty"
          fields={[
            { key: 'name', label: 'Nombre(s)', placeholder: 'María & Juan' },
            { key: 'role', label: 'Rol', placeholder: 'Padrinos de Velación' },
          ]}
          onUpdate={(i, f, v) => updateArrayItem('weddingParty', i, f, v)}
          onAdd={() => addArrayItem('weddingParty', { name: '', role: '' })}
          onRemove={(i) => removeArrayItem('weddingParty', i)}
          inputClass={inputClass}
        />
      </div>
    )

    case 'guestMessages': return (
      <p className="text-xs text-[#8C7C7A] italic">Los invitados escribirán mensajes directamente en la página.</p>
    )

    case 'faq': return (
      <div>
        <p className="text-[9px] font-medium mb-2 text-[#8C7C7A] uppercase tracking-wider">Preguntas frecuentes</p>
        <ArrayEditor
          items={data.faqs || []} keyLabel="pregunta" keyField="faqs"
          fields={[
            { key: 'q', label: 'Pregunta', placeholder: '¿Puedo llevar acompañante?', isTextarea: true },
            { key: 'a', label: 'Respuesta', placeholder: 'Sí, indícalo al confirmar.', isTextarea: true },
          ]}
          onUpdate={(i, f, v) => updateArrayItem('faqs', i, f, v)}
          onAdd={() => addArrayItem('faqs', { q: '', a: '' })}
          onRemove={(i) => removeArrayItem('faqs', i)}
          inputClass={inputClass}
        />
      </div>
    )

    case 'thankYou': return (
      <Input label="Hashtag" value={data.hashtag} onChange={(v) => update('hashtag', v)} placeholder="Ana&Carlos2026" />
    )

    default: return null
  }
}
