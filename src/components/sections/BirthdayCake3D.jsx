import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useTexture, ContactShadows, Float, Html, Text } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import confetti from 'canvas-confetti'

// A single candle component
const Candle = ({ position, onClick, isLit }) => {
  const flameRef = useRef()

  useFrame((state) => {
    if (isLit && flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.1
      flameRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 10 + 1) * 0.05
    }
  })

  return (
    <group position={position}>
      {/* Candle Body */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 16]} />
        <meshStandardMaterial color="#FFF9F2" roughness={0.3} />
      </mesh>
      
      {/* Wick */}
      <mesh position={[0, 0.82, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.04, 8]} />
        <meshBasicMaterial color="#333" />
      </mesh>

      {/* Flame & Interaction Area */}
      <group position={[0, 0.9, 0]}>
        {/* Invisible larger hit area for easier clicking */}
        <mesh onClick={onClick} visible={false}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial />
        </mesh>

        {isLit && (
          <mesh ref={flameRef}>
            <coneGeometry args={[0.04, 0.15, 16]} />
            <meshBasicMaterial color="#ffcc00" transparent opacity={0.9} />
            <pointLight distance={1.5} intensity={0.5} color="#ffaa00" />
          </mesh>
        )}

        {/* Smoke Particle (simple approximation) */}
        {!isLit && (
          <Html center>
            <motion.div 
              initial={{ y: 0, opacity: 0.8, scale: 0.5 }}
              animate={{ y: -50, opacity: 0, scale: 2 }}
              transition={{ duration: 1 }}
              className="w-4 h-4 bg-gray-400 rounded-full blur-sm"
            />
          </Html>
        )}
      </group>
    </group>
  )
}

const Cake = ({ litCandles, setLitCandles }) => {
  // Generate 26 positions in a circle for candles
  const candlePositions = useMemo(() => {
    const positions = []
    const radius = 1.2
    for (let i = 0; i < 26; i++) {
      const angle = (i / 26) * Math.PI * 2
      positions.push([
        Math.cos(angle) * radius,
        1.5, // height of top layer
        Math.sin(angle) * radius
      ])
    }
    return positions
  }, [])

  const handleCandleClick = (index) => {
    if (litCandles[index]) {
      const newLit = [...litCandles]
      newLit[index] = false
      setLitCandles(newLit)
    }
  }

  return (
    <group position={[0, -1, 0]}>
      {/* Bottom Layer */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[2, 2, 1, 64]} />
        <meshStandardMaterial color="#FFD6E8" roughness={0.6} />
      </mesh>
      
      {/* Top Layer */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.5, 64]} />
        <meshStandardMaterial color="#FFB6D8" roughness={0.6} />
      </mesh>

      {/* Candles */}
      {candlePositions.map((pos, i) => (
        <Candle 
          key={i} 
          position={pos} 
          isLit={litCandles[i]} 
          onClick={() => handleCandleClick(i)} 
        />
      ))}
    </group>
  )
}

export default function BirthdayCake3D() {
  // Array of 26 booleans initialized to true
  const [litCandles, setLitCandles] = useState(Array(26).fill(true))
  const [allOut, setAllOut] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 })

  const numLit = litCandles.filter(Boolean).length

  // Auto blow out effect after 3.5 seconds
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        let currentLit = Array(26).fill(true)
        const blowoutInterval = setInterval(() => {
          const remainingIndices = currentLit.map((isLit, i) => isLit ? i : -1).filter(i => i !== -1)
          if (remainingIndices.length === 0) {
            clearInterval(blowoutInterval)
          } else {
            // Blow out 3-4 candles rapidly
            const toExtinguish = remainingIndices.sort(() => Math.random() - 0.5).slice(0, 4)
            toExtinguish.forEach(idx => {
              currentLit[idx] = false
            })
            setLitCandles([...currentLit])
          }
        }, 150) // Speed of blowout animation
      }, 3500) // Wait 3.5 seconds before starting

      return () => {
        clearTimeout(timer)
      }
    }
  }, [isInView])

  useEffect(() => {
    if (numLit === 0 && !allOut) {
      setAllOut(true)
      // Trigger confetti
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now()
        if (timeLeft <= 0) {
          return clearInterval(interval)
        }
        const particleCount = 50 * (timeLeft / duration)
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }))
      }, 250)
    }
  }, [numLit, allOut])

  return (
    <section ref={sectionRef} className="h-screen relative bg-[#1a0f14] overflow-hidden flex flex-col items-center justify-center cursor-crosshair">
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 4, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#FFF9F2" />
          
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
            <Cake litCandles={litCandles} setLitCandles={setLitCandles} />
          </Float>
          
          <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={10} blur={2} far={4} />
          <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 2.2} 
          />
          <Environment preset="city" />
        </Canvas>
      </div>

      <AnimatePresence>
        {allOut && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-50 px-4 pointer-events-none"
          >
            <motion.h1 
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: 'spring', bounce: 0.5, duration: 1 }}
              className="text-5xl md:text-7xl font-handwriting text-rose-300 text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] mb-6"
            >
              Happy Birthday Poojitha!
            </motion.h1>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-2xl md:text-4xl text-cream font-bold text-center font-heading"
            >
              May all your dreams come true!
            </motion.h3>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
