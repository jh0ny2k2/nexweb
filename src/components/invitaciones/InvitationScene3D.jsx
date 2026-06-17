import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function isLowEndDevice() {
  if (typeof navigator === 'undefined') return false
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return true
  return false
}

export default function InvitationScene3D() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (isLowEndDevice()) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, canvasEl.clientWidth / canvasEl.clientHeight, 0.1, 50)
    camera.position.set(0, 0.5, 10)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(canvasEl.clientWidth, canvasEl.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    canvasEl.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0x442233, 0.4)
    scene.add(ambient)

    const key = new THREE.DirectionalLight('#DFC5A8', 1.5)
    key.position.set(3, 5, 4)
    scene.add(key)

    const fill = new THREE.DirectionalLight('#C4956A', 0.6)
    fill.position.set(-3, 1, -4)
    scene.add(fill)

    const ringMat = new THREE.MeshPhysicalMaterial({
      color: '#C4956A',
      metalness: 0.7,
      roughness: 0.3,
      transparent: true,
      opacity: 0.4,
      clearcoat: 0.3,
    })

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.06, 32, 64), ringMat)
    ring1.rotation.x = Math.PI / 2
    ring1.rotation.z = Math.PI / 4
    scene.add(ring1)

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.06, 32, 64), ringMat.clone())
    ring2.material.color.setHex(0xDFC5A8)
    ring2.material.opacity = 0.3
    ring2.rotation.x = Math.PI / 2
    ring2.rotation.z = -Math.PI / 4
    ring2.position.x = 0.3
    scene.add(ring2)

    const decoRingMat = new THREE.MeshBasicMaterial({
      color: '#C4956A',
      transparent: true,
      opacity: 0.06,
      side: THREE.DoubleSide,
    })

    const outerRing1 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.015, 32, 80), decoRingMat)
    outerRing1.rotation.x = Math.PI / 3
    scene.add(outerRing1)

    const outerRing2 = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.01, 24, 64), decoRingMat.clone())
    outerRing2.material.opacity = 0.04
    outerRing2.rotation.x = -Math.PI / 3
    scene.add(outerRing2)

    const pCount = 300
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    const pVelocities = []

    for (let i = 0; i < pCount; i++) {
      const radius = 0.5 + Math.random() * 3.5
      const angle = Math.random() * Math.PI * 2
      pPos[i * 3] = Math.cos(angle) * radius
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 5
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 3
      pVelocities.push({
        vy: 0.002 + Math.random() * 0.005,
        vx: (Math.random() - 0.5) * 0.002,
      })
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))

    const pMat = new THREE.PointsMaterial({
      color: '#C4956A',
      size: 0.015,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    const pPosAttr = pGeo.attributes.position

    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.05)
      const t = clock.getElapsedTime()

      ring1.rotation.z = Math.PI / 4 + t * 0.3
      ring2.rotation.z = -Math.PI / 4 + t * 0.3

      ring1.position.y = Math.sin(t * 0.5) * 0.15
      ring2.position.y = Math.sin(t * 0.5 + 0.5) * 0.15

      outerRing1.rotation.z = t * 0.1
      outerRing1.rotation.y = t * 0.08
      outerRing2.rotation.z = t * 0.08
      outerRing2.rotation.y = -t * 0.06

      for (let i = 0; i < pCount; i++) {
        const i3 = i * 3
        pPosAttr.array[i3 + 1] += pVelocities[i].vy * delta * 30
        pPosAttr.array[i3] += pVelocities[i].vx * delta * 30
        if (pPosAttr.array[i3 + 1] > 2.5) {
          pPosAttr.array[i3] = (Math.random() - 0.5) * 4
          pPosAttr.array[i3 + 1] = -2.5
          pPosAttr.array[i3 + 2] = (Math.random() - 0.5) * 3
        }
      }
      pPosAttr.needsUpdate = true

      pMat.opacity = 0.15 + Math.sin(t * 0.5) * 0.1

      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      const w = canvasEl.clientWidth
      const h = canvasEl.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      ringMat.dispose()
      ring1.geometry.dispose()
      ring2.geometry.dispose()
      decoRingMat.dispose()
      outerRing1.geometry.dispose()
      outerRing2.geometry.dispose()
      pGeo.dispose()
      pMat.dispose()
      renderer.dispose()
      if (canvasEl.contains(renderer.domElement)) {
        canvasEl.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ minHeight: '100vh' }}
    />
  )
}
