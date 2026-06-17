import { Camera } from 'lucide-react'
import Ornament from './shared/Ornament'

const DEFAULT_PHOTOS = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&q=80',
  'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400&q=80',
  'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=400&q=80',
]

export default function GallerySection({ data, style }) {
  const photos = data.galleryUrls?.length ? data.galleryUrls : DEFAULT_PHOTOS
  return (
    <section className="px-6 py-10" style={{ backgroundColor: style.bg }}>
      <div className="text-center space-y-4 mb-6">
        <Ornament color={style.secondary} variant={style.ornament} />
        <p className="text-xs tracking-[0.2em] uppercase" style={{ color: style.secondary }}>Galería</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {photos.map((url, i) => (
          <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            {url ? <img src={url} alt="" className="w-full h-full object-cover" loading="lazy" /> : <div className="w-full h-full" style={{ backgroundColor: `${style.secondary}15` }} />}
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Camera className="w-4 h-4 mx-auto" style={{ color: style.textMuted, opacity: 0.5 }} />
      </div>
    </section>
  )
}
