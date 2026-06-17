import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function isLowEndDevice() {
  if (typeof navigator === 'undefined') return false
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return true
  return false
}

export default function InvitationScene3D() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const canvasEl = canvasRef.current
    if (!container || !canvasEl) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (isLowEndDevice()) return

    const w = canvasEl.clientWidth || 400
    const h = canvasEl.clientHeight || 500

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 50)
    camera.position.set(0, 0.8, 7)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    canvasEl.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0x553344, 0.5)
    scene.add(ambient)

    const key = new THREE.DirectionalLight('#DFC5A8', 2)
    key.position.set(3, 5, 4)
    scene.add(key)

    const fill = new THREE.DirectionalLight('#C4956A', 0.8)
    fill.position.set(-3, 1, -4)
    scene.add(fill)

    const back = new THREE.DirectionalLight('#7A1A2E', 0.3)
    back.position.set(0, -2, -5)
    scene.add(back)

    const ringMat = new THREE.MeshPhysicalMaterial({
      color: '#C4956A',
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.7,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
      emissive: '#C4956A',
      emissiveIntensity: 0.05,
    })

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.08, 32, 64), ringMat)
    ring1.rotation.x = Math.PI / 3
    ring1.rotation.z = Math.PI / 6
    scene.add(ring1)

    const ring2Mat = ringMat.clone()
    ring2Mat.color.setHex(0xDFC5A8)
    ring2Mat.emissive.setHex(0xDFC5A8)
    ring2Mat.opacity = 0.55
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.08, 32, 64), ring2Mat)
    ring2.rotation.x = Math.PI / 3
    ring2.rotation.z = -Math.PI / 6
    ring2.position.x = 0.4
    scene.add(ring2)

    const sparkleMat = new THREE.MeshPhysicalMaterial({
      color: '#DFC5A8',
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.3,
      emissive: '#DFC5A8',
      emissiveIntensity: 0.1,
    })

    const sparkles = []
    for (let i = 0; i < 8; i++) {
      const size = 0.02 + Math.random() * 0.04
      const ico = new THREE.Mesh(new THREE.OctahedronGeometry(size, 0), sparkleMat.clone())
      const angle = (i / 8) * Math.PI * 2
      const radius = 1.5 + Math.random() * 0.8
      ico.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 1.2,
        Math.sin(angle) * radius * 0.5,
      )
      ico.userData = {
        angle,
        radius,
        speed: 0.2 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
        rotSpeed: 1 + Math.random() * 2,
      }
      scene.add(ico)
      sparkles.push(ico)
    }

    const pCount = 200
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    const pData = []

    for (let i = 0; i < pCount; i++) {
      const radius = 0.3 + Math.random() * 3
      const angle = Math.random() * Math.PI * 2
      pPos[i * 3] = Math.cos(angle) * radius
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 4
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 2.5
      pData.push({
        vy: 0.003 + Math.random() * 0.008,
        vx: (Math.random() - 0.5) * 0.003,
        resetY: -2 - Math.random() * 1,
        maxY: 2 + Math.random() * 1,
      })
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))

    const pMat = new THREE.PointsMaterial({
      color: '#C4956A',
      size: 0.025,
      transparent: true,
      opacity: 0.35,
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

      ring1.rotation.z = Math.PI / 6 + t * 0.25
      ring2.rotation.z = -Math.PI / 6 + t * 0.25

      ring1.position.y = Math.sin(t * 0.6) * 0.12
      ring2.position.y = Math.sin(t * 0.6 + 0.7) * 0.12

      ring1.material.emissiveIntensity = 0.04 + Math.sin(t * 0.8) * 0.04
      ring2Mat.emissiveIntensity = 0.04 + Math.sin(t * 0.8 + 0.5) * 0.04

      sparkles.forEach((s) => {
        const u = s.userData
        const a = u.angle + t * u.speed
        s.position.x = Math.cos(a) * u.radius
        s.position.z = Math.sin(a) * u.radius * 0.5
        s.position.y += Math.sin(t * 1.5 + u.offset) * 0.003
        s.rotation.x += delta * u.rotSpeed
        s.rotation.y += delta * u.rotSpeed * 0.7
      })

      for (let i = 0; i < pCount; i++) {
        const i3 = i * 3
        pPosAttr.array[i3 + 1] += pData[i].vy * delta * 30
        pPosAttr.array[i3] += pData[i].vx * delta * 30
        if (pPosAttr.array[i3 + 1] > pData[i].maxY) {
          pPosAttr.array[i3] = (Math.random() - 0.5) * 4
          pPosAttr.array[i3 + 1] = pData[i].resetY
          pPosAttr.array[i3 + 2] = (Math.random() - 0.5) * 2.5
        }
      }
      pPosAttr.needsUpdate = true

      pMat.opacity = 0.25 + Math.sin(t * 0.4) * 0.12

      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      const newW = canvasEl.clientWidth || 400
      const newH = canvasEl.clientHeight || 500
      camera.aspect = newW / newH
      camera.updateProjectionMatrix()
      renderer.setSize(newW, newH)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      ringMat.dispose()
      ring2Mat.dispose()
      ring1.geometry.dispose()
      ring2.geometry.dispose()
      sparkles.forEach((s) => { s.geometry.dispose(); s.material.dispose() })
      pGeo.dispose()
      pMat.dispose()
      renderer.dispose()
      if (canvasEl.contains(renderer.domElement)) {
        canvasEl.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
