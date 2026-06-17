import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function isLowEnd() {
  return typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
}

export default function InvitationScene3D() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (isLowEnd()) return

    const W = el.clientWidth || 320
    const H = el.clientHeight || 400
    if (W < 10 || H < 10) return

    const s = new THREE.Scene()
    const c = new THREE.PerspectiveCamera(25, W / H, 0.1, 50)
    c.position.set(0, 0.3, 6)

    const r = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    r.setSize(W, H)
    r.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    r.toneMapping = THREE.ACESFilmicToneMapping
    r.toneMappingExposure = 1.4
    el.appendChild(r.domElement)

    const al = new THREE.AmbientLight(0xffffff, 0.2)
    s.add(al)
    const k = new THREE.DirectionalLight('#FFE4B5', 3)
    k.position.set(4, 6, 5)
    s.add(k)
    const f = new THREE.DirectionalLight('#C9A96E', 0.6)
    f.position.set(-3, 1, -4)
    s.add(f)
    const rim = new THREE.DirectionalLight('#ffffff', 0.3)
    rim.position.set(0, -3, 6)
    s.add(rim)

    function makeRing(radius, tube, color, emissive, metalness, roughness, clearcoat) {
      const mat = new THREE.MeshPhysicalMaterial({
        color, metalness, roughness, clearcoat, clearcoatRoughness: 0.1,
        emissive: emissive || color,
        emissiveIntensity: 0.08,
      })
      const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 48, 80), mat)
      return { mesh, mat }
    }

    const rings = [
      makeRing(1.0, 0.09, '#C9A96E', '#C9A96E', 0.95, 0.1, 0.6),
      makeRing(0.78, 0.06, '#E8D8C0', '#E8D8C0', 0.9, 0.15, 0.4),
      makeRing(0.58, 0.05, '#DFC98A', '#DFC98A', 0.85, 0.2, 0.3),
    ]
    const tilts = [Math.PI / 3.5, -Math.PI / 2.8, Math.PI / 4.5]

    rings.forEach((ring, i) => {
      ring.mesh.rotation.x = tilts[i]
      s.add(ring.mesh)
    })

    const pc = 60
    const pg = new THREE.BufferGeometry()
    const pp = new Float32Array(pc * 3)
    const pd = []
    for (let i = 0; i < pc; i++) {
      const a = Math.random() * Math.PI * 2
      const rad = 1.6 + Math.random() * 1.6
      pp[i * 3] = Math.cos(a) * rad
      pp[i * 3 + 1] = (Math.random() - 0.5) * 2.5
      pp[i * 3 + 2] = (Math.random() - 0.5) * 1.2
      pd.push({ vy: 0.002 + Math.random() * 0.005, resetY: -1.5 + Math.random() * -0.3, maxY: 1.5 + Math.random() * 0.5 })
    }
    pg.setAttribute('position', new THREE.BufferAttribute(pp, 3))
    const pm = new THREE.PointsMaterial({
      color: '#C9A96E', size: 0.015, transparent: true, opacity: 0.2,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    })
    const parts = new THREE.Points(pg, pm)
    s.add(parts)
    const pa = pg.attributes.position

    let id
    const clock = new THREE.Clock()

    function animate() {
      const delta = Math.min(clock.getDelta(), 0.05)
      const t = clock.getElapsedTime()

      rings.forEach((ring, i) => {
        ring.mesh.rotation.y += delta * (0.4 + i * 0.1)
        ring.mesh.position.y = Math.sin(t * 0.6 + i * 1.2) * 0.06
        ring.mat.emissiveIntensity = 0.06 + Math.sin(t * 0.5 + i * 0.8) * 0.03
      })

      for (let i = 0; i < pc; i++) {
        const i3 = i * 3
        pa.array[i3 + 1] += pd[i].vy * delta * 30
        if (pa.array[i3 + 1] > pd[i].maxY) {
          pa.array[i3] = (Math.random() - 0.5) * 3.2
          pa.array[i3 + 1] = pd[i].resetY
          pa.array[i3 + 2] = (Math.random() - 0.5) * 1.0
        }
      }
      pa.needsUpdate = true

      r.render(s, c)
      id = requestAnimationFrame(animate)
    }
    animate()

    function resize() {
      const nw = el.clientWidth
      const nh = el.clientHeight
      if (nw < 10 || nh < 10) return
      c.aspect = nw / nh
      c.updateProjectionMatrix()
      r.setSize(nw, nh)
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('resize', resize)
      rings.forEach(ring => { ring.mat.dispose(); ring.mesh.geometry.dispose() })
      pg.dispose(); pm.dispose(); r.dispose()
      if (el.contains(r.domElement)) el.removeChild(r.domElement)
    }
  }, [])

  return <div ref={ref} className="w-full h-full" />
}
