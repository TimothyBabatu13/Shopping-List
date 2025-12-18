"use client"
import ParticleEffectButton from "react-particle-effect-button"

export const DeleteAnimation = ({ children, hidden  } : {
    children: React.ReactNode,
    hidden: boolean
}) => {
  return (
        <ParticleEffectButton
            hidden={hidden}
            type="triangle"
            duration={600}
            style={{
                display: "block",
                width: "100%",   
            }}
        >
            <div className="w-full">
                {children}
            </div>
        </ParticleEffectButton>
  )
}
