"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Html } from "@react-three/drei"
import { Suspense, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface PatientData {
  name: string
  age: string
  gender: string
  symptoms: string[]
}

interface SceneProps {
  patientData: PatientData
}

function DoctorAvatar({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <group position={position}>
      {/* Doctor Body */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <cylinderGeometry args={[0.3, 0.4, 1.2, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Doctor Head */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>

      {/* Stethoscope */}
      <mesh position={[0, 0.2, 0.35]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.15, 0.02, 8, 16]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>

      {/* Floating Text */}
      <Html position={[0, 1.5, 0]} center>
        <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border border-blue-200">
          <p className="text-sm font-medium text-blue-700">{hovered ? "How can I help you today?" : "Dr. Sarah"}</p>
        </div>
      </Html>
    </group>
  )
}

function PatientBed({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Bed Frame */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>

      {/* Mattress */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[1.9, 0.2, 0.9]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>

      {/* Patient (simplified) */}
      <mesh position={[0, 0.7, 0]}>
        <capsuleGeometry args={[0.2, 0.8, 4, 8]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>
    </group>
  )
}

function SymptomAvatar({
  position,
  symptom,
  active,
}: {
  position: [number, number, number]
  symptom: "fever" | "cough" | "cold"
  active: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current && active) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 2
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1)
    }
  })

  const getSymptomColor = () => {
    switch (symptom) {
      case "fever":
        return "#ef4444"
      case "cough":
        return "#f59e0b"
      case "cold":
        return "#06b6d4"
      default:
        return "#6b7280"
    }
  }

  const getSymptomText = () => {
    switch (symptom) {
      case "fever":
        return "🤒"
      case "cough":
        return "😷"
      case "cold":
        return "🤧"
      default:
        return "😊"
    }
  }

  return (
    <group position={position}>
      <mesh ref={meshRef} scale={active ? 1.2 : 0.8}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={getSymptomColor()} transparent opacity={active ? 0.8 : 0.4} />
      </mesh>

      <Html center>
        <div className="text-2xl pointer-events-none">{getSymptomText()}</div>
      </Html>
    </group>
  )
}

function MedicalEquipment() {
  return (
    <group>
      {/* IV Stand */}
      <group position={[2, 0, -1]}>
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
          <meshStandardMaterial color="#9ca3af" />
        </mesh>
        <mesh position={[0, 2, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
      </group>

      {/* Monitor */}
      <group position={[-2, 1.5, -1]}>
        <mesh>
          <boxGeometry args={[0.8, 0.6, 0.1]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <Html position={[0, 0, 0.06]} center>
          <div className="bg-green-400 text-black px-2 py-1 rounded text-xs font-mono">♥ 72 BPM</div>
        </Html>
      </group>
    </group>
  )
}

function ClinicRoom() {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 2, -3]} rotation={[0, 0, 0]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#e0f2fe" />
      </mesh>
    </group>
  )
}

export function PatientOnboardingScene({ patientData }: SceneProps) {
  const hasSymptoms = patientData.symptoms && patientData.symptoms.length > 0

  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 60 }}
      style={{ background: "linear-gradient(to bottom, #e0f2fe, #f0f9ff)" }}
    >
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />

        <ClinicRoom />
        <DoctorAvatar position={[-1.5, 0, 0]} />
        <PatientBed position={[1, 0, 0]} />
        <MedicalEquipment />

        {/* Symptom Avatars */}
        <SymptomAvatar
          position={[-2, 2, 1]}
          symptom="fever"
          active={hasSymptoms && patientData.symptoms.includes("fever")}
        />
        <SymptomAvatar
          position={[0, 2.5, 1]}
          symptom="cough"
          active={hasSymptoms && patientData.symptoms.includes("cough")}
        />
        <SymptomAvatar
          position={[2, 2, 1]}
          symptom="cold"
          active={hasSymptoms && patientData.symptoms.includes("cold")}
        />

        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 4} />
      </Suspense>
    </Canvas>
  )
}
