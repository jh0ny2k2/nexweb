import { useState } from 'react'
import { Send, Check, AlertCircle } from 'lucide-react'
import Button from '../common/Button'
import { supabase } from '../../lib/supabase'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', type: 'Web Corporativa', message: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const today = new Date().toLocaleDateString('es-ES')

    const { error: msgErr } = await supabase.from('messages').insert({
      name: form.name,
      email: form.email,
      subject: `[${form.type}] ${form.message.slice(0, 50)}${form.message.length > 50 ? '...' : ''}`,
      date: today,
      read: false,
    })

    const { error: reqErr } = await supabase.from('requests').insert({
      name: form.name,
      type: form.type,
      budget: 'Consultar',
      date: today,
      status: 'new',
      email: form.email,
    })

    if (msgErr || reqErr) {
      console.error('Error saving:', msgErr, reqErr)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
      return
    }

    setStatus('sent')
    setForm({ name: '', company: '', email: '', phone: '', type: 'Web Corporativa', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#141414] rounded-xl border border-[#1e1e1e] shadow-card p-8 lg:p-10">
      {status === 'error' && (
        <div className="mb-6 flex items-center gap-2 px-4 py-3 bg-[#f5b342]/10 text-[#f5b342] rounded-xl text-sm font-medium border border-[#f5b342]/20">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Error al enviar. Inténtalo de nuevo.
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-[#8a8682] mb-1.5">Nombre</label>
          <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f5b342]/20 focus:border-[#f5b342]/40 transition-all placeholder:text-[#5a5652]" placeholder="Tu nombre" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#8a8682] mb-1.5">Empresa</label>
          <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f5b342]/20 focus:border-[#f5b342]/40 transition-all placeholder:text-[#5a5652]" placeholder="Tu empresa" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[#8a8682] mb-1.5">Email</label>
          <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f5b342]/20 focus:border-[#f5b342]/40 transition-all placeholder:text-[#5a5652]" placeholder="tu@email.com" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[#8a8682] mb-1.5">Teléfono</label>
          <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f5b342]/20 focus:border-[#f5b342]/40 transition-all placeholder:text-[#5a5652]" placeholder="+34 600 000 000" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[#8a8682] mb-1.5">Tipo de proyecto</label>
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f5b342]/20 focus:border-[#f5b342]/40 transition-all">
            <option>Web Corporativa</option>
            <option>Tienda Online</option>
            <option>Landing Page</option>
            <option>Blog Profesional</option>
            <option>Otro</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[#8a8682] mb-1.5">Mensaje</label>
          <textarea rows={4} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f5b342]/20 focus:border-[#f5b342]/40 transition-all placeholder:text-[#5a5652] resize-none" placeholder="Cuéntanos sobre tu proyecto..." />
        </div>
      </div>
      <Button type="submit" size="lg" icon={status === 'sent' ? Check : Send} className="w-full mt-6" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando...' : status === 'sent' ? 'Mensaje enviado' : 'Enviar mensaje'}
      </Button>
    </form>
  )
}
