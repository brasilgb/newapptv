import Link from 'next/link'
import React from 'react'

interface LinkAnaliseProps {
  label: string
  url: string
  active: boolean
  isInteracting?: boolean
}

const LinkAnalise = ({ label, url, active, isInteracting = false }: LinkAnaliseProps) => {

  // 🎨 Base refinada
  const baseClass = `
    px-8 py-3 rounded-full
    text-lg font-semibold tracking-wide
    transition-all duration-300 ease-out
    border
    backdrop-blur-sm
  `

  // 🌟 Ativo (destaque elegante)
  const activeClass = active
    ? `
      bg-gradient-to-r from-blue-600 to-blue-800
      text-white
      border-white/20
      shadow-[0_4px_20px_rgba(0,0,0,0.25)]
      scale-105
    `
    : `
      bg-white/70
      text-gray-500
      border-gray-200
      shadow-sm
      opacity-70
    `

  // 🎮 Hover (quando interagindo)
  const hoverClass = `
    hover:scale-105
    hover:opacity-100
    hover:border-blue-300
    hover:shadow-md
  `

  // 📺 TV mode (não clicável)
  if (!isInteracting) {
    return (
      <div className={`${baseClass} ${activeClass}`}>
        {label}
      </div>
    )
  }

  // 🧑‍💻 Interativo
  return (
    <Link
      href={url}
      className={`
        ${baseClass}
        ${activeClass}
        ${hoverClass}
        cursor-pointer
      `}
    >
      {label}
    </Link>
  )
}

export default LinkAnalise