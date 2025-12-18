"use client"
import ParticleEffectButton from "react-particle-effect-button"
import { useState } from "react"

export default function Note() {
  const [hidden, setHidden] = useState(false)

  return (
    <ParticleEffectButton
      hidden={hidden}
      type="triangle"
      duration={600}
    >
      <div className="p-4 border rounded-md">
        <button onClick={() => setHidden(true)}>Delete</button>
      </div>
    </ParticleEffectButton>
  )
}
