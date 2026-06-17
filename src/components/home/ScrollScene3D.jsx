import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

function isLowEndDevice() {
  if (typeof navigator === 'undefined') return false
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return true
  return false
}

const STAGES = [
  { threshold: 0, title: 'Diseño que trasciende', subtitle: 'Cada forma, cada detalle, cuidadosamente elaborado' },
  { threshold: 0.33, title: 'Tecnología que impulsa', subtitle: 'Construido con lo último en desarrollo web' },
  { threshold: 0.66, title: 'Resultados que importan', subtitle: 'Tu negocio merece una presencia digital única' },
]

export default function ScrollScene3D() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [stageIdx, setStageIdx] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const canvasEl = canvasRef.current
    if (!container || !canvasEl) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (isLowEndDevice()) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0.5, 7)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    canvasEl.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0x222222, 0.8)
    scene.add(ambient)

    const key = new THREE.DirectionalLight('#f5b342', 2)
    key.position.set(3, 5, 4)
    scene.add(key)

    const fill = new THREE.DirectionalLight('#f5b342', 0.5)
    fill.position.set(-3, 1, -4)
    scene.add(fill)

    const rim = new THREE.DirectionalLight('#ffffff', 0.3)
    rim.position.set(0, -3, 5)
    scene.add(rim)

    const knotGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 16)
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: '#f5b342',
      emissive: '#f5b342',
      emissiveIntensity: 0.1,
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 0.3,
      clearcoatRoughness: 0.25,
    })
    const knot = new THREE.Mesh(knotGeo, knotMat)
    scene.add(knot)

    const wireMat = new THREE.MeshBasicMaterial({
      color: '#f7c65a',
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    })
    const wire = new THREE.Mesh(knotGeo.clone(), wireMat)
    wire.scale.set(1.025, 1.025, 1.025)
    scene.add(wire)

    const ringMat = new THREE.MeshBasicMaterial({
      color: '#f5b342',
      transparent: true,
      opacity: 0.07,
      side: THREE.DoubleSide,
    })

    const outerRing = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.02, 32, 64), ringMat)
    outerRing.rotation.x = Math.PI / 3
    scene.add(outerRing)

    const midRing = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.015, 24, 48), ringMat.clone())
    midRing.material.opacity = 0.05
    midRing.rotation.x = -Math.PI / 4
    scene.add(midRing)

    const innerRing = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.02, 16, 32), ringMat.clone())
    innerRing.material.opacity = 0.1
    scene.add(innerRing)

    const pCount = 600
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    const pSizes = new Float32Array(pCount)

    for (let i = 0; i < pCount; i++) {
      const radius = 1.5 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6
      pPos[i * 3 + 2] = radius * Math.cos(phi)
      pSizes[i] = 0.01 + Math.random() * 0.04
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))

    const pMat = new THREE.PointsMaterial({
      color: '#f5b342',
      size: 0.025,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    const pPosAttr = pGeo.attributes.position
    const origPositions = new Float32Array(pPosAttr.array)

    let targetProgress = 0
    let smoothProgress = 0
    let prevStage = -1

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const scrolled = -rect.top
      targetProgress = Math.max(0, Math.min(1, scrolled / scrollable))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.05)
      smoothProgress += (targetProgress - smoothProgress) * Math.min(1, delta * 4)
      const p = smoothProgress

      let newStage = 0
      for (let i = STAGES.length - 1; i >= 0; i--) {
        if (p >= STAGES[i].threshold) { newStage = i; break }
      }
      if (newStage !== prevStage) {
        prevStage = newStage
        setStageIdx(newStage)
      }

      knot.rotation.x = p * Math.PI * 3
      knot.rotation.y = p * Math.PI * 4
      knot.rotation.z = p * Math.PI * 0.75
      wire.rotation.copy(knot.rotation)

      const pulse = 1 + Math.sin(p * Math.PI * 6) * 0.04
      knot.scale.setScalar(pulse)
      wire.scale.setScalar(pulse * 1.025)

      outerRing.rotation.z = p * Math.PI * 2
      outerRing.rotation.y = p * Math.PI * 1.5
      const ringS = 1 + Math.sin(p * Math.PI * 4) * 0.15
      outerRing.scale.setScalar(ringS)

      midRing.rotation.z = -p * Math.PI * 2.5
      midRing.rotation.x = -Math.PI / 4 + Math.sin(p * Math.PI * 3) * 0.2
      midRing.scale.setScalar(1 + Math.sin(p * Math.PI * 5 + 1) * 0.12)

      innerRing.rotation.x = p * Math.PI * 3
      innerRing.rotation.z = p * Math.PI * 2
      innerRing.scale.setScalar(1 + Math.sin(p * Math.PI * 7) * 0.15)

      const camAngle = p * Math.PI * 0.6
      camera.position.x = Math.sin(camAngle) * 2
      camera.position.y = 0.5 + Math.sin(p * Math.PI * 2) * 0.8
      camera.position.z = 7 - Math.sin(camAngle) * 1.5
      camera.lookAt(0, 0, 0)

      particles.rotation.y = p * Math.PI * 3
      particles.rotation.x = p * Math.PI * 0.2
      pMat.opacity = 0.1 + Math.sin(p * Math.PI * 2) * 0.1 + 0.1

      const spread = 0.5 + p * 2
      for (let i = 0; i < pCount; i++) {
        const i3 = i * 3
        pPosAttr.array[i3] = origPositions[i3] * spread
        pPosAttr.array[i3 + 1] = origPositions[i3 + 1] * spread
        pPosAttr.array[i3 + 2] = origPositions[i3 + 2] * spread
      }
      pPosAttr.needsUpdate = true

      knotMat.emissiveIntensity = 0.05 + Math.sin(p * Math.PI * 5) * 0.08 + 0.08

      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      knotGeo.dispose()
      knotMat.dispose()
      wireMat.dispose()
      ringMat.dispose()
      pGeo.dispose()
      pMat.dispose()
      renderer.dispose()
      if (canvasEl.contains(renderer.domElement)) {
        canvasEl.removeChild(renderer.domElement)
      }
    }
  }, [])

  const current = STAGES[stageIdx]

  return (
    <section ref={containerRef} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a]">
        <div ref={canvasRef} className="absolute inset-0" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-center max-w-4xl px-6">
            <h2
              key={`title-${stageIdx}`}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 animate-fade-up"
            >
              {current.title}
            </h2>
            <p
              key={`sub-${stageIdx}`}
              className="text-lg sm:text-xl md:text-2xl text-[#5a5652] max-w-2xl mx-auto animate-fade-up animate-delay-200"
            >
              {current.subtitle}
            </p>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
            {STAGES.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-700 ${
                  i <= stageIdx ? 'bg-[#f5b342]' : 'bg-[#2a2a2a]'
                } ${i === stageIdx ? 'w-16' : 'w-3'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
