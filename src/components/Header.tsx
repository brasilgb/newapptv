import React, { useEffect, useState } from 'react'
import LinkAnalise from './LinkAnalise'
import { usePathname, useRouter } from 'next/navigation'
import birel from '@/services/birel'

const Header = () => {
  const pathname = usePathname()
  const router = useRouter()

  const DURATION = 15000

  const [atualizacao, setAtualizacao] = useState<string>('')
  const [progress, setProgress] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [isInteracting, setIsInteracting] = useState(false)

  const getNextRoute = () => {
    switch (pathname) {
      case '/': return '/mensal'
      case '/mensal': return '/anual'
      case '/anual': return '/evolucao'
      case '/evolucao': return '/'
      default: return '/'
    }
  }

  // 🧠 Detecta interação (pausa + reinicia ciclo)
  useEffect(() => {
    let timeout: any

    const handleInteraction = () => {
      setIsInteracting(true)

      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setIsInteracting(false)
        setElapsed(0) // 🔥 reinicia o ciclo após parar
      }, 3000)
    }

    window.addEventListener('mousemove', handleInteraction)
    window.addEventListener('click', handleInteraction)
    window.addEventListener('touchstart', handleInteraction)
    window.addEventListener('keydown', handleInteraction)

    return () => {
      window.removeEventListener('mousemove', handleInteraction)
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
    }
  }, [])

  // ⏱️ Controle de tempo (PAUSA REAL)
  useEffect(() => {
    const interval = setInterval(() => {
      if (isInteracting) return

      setElapsed((prev) => {
        const next = prev + 100

        if (next >= DURATION) {
          router.push(getNextRoute())
          return 0
        }

        return next
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isInteracting, pathname, router])

  // 🔵 Barra sincronizada
  useEffect(() => {
    setProgress((elapsed / DURATION) * 100)
  }, [elapsed])

  // 📡 Atualização API
  useEffect(() => {
    const getDataTv = async () => {
      try {
        const res = await birel.post('(APPTV_ANALISE_DEPTO)', {
          departamento: 1
        })
        setAtualizacao(res.data.bi091.bidata[0].Atualizacao)
      } catch (err) {
        console.log(err)
      }
    }

    getDataTv()
  }, [])

  return (
    <>
      {/* 🔵 Barra de progresso */}
      <div className="w-full h-3 bg-gray-200">
        <div
          className="h-full bg-blue-700 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header className='h-24 bg-white flex items-center justify-between px-10 border-b border-gray-200'>

        {/* 🏢 Logos */}
        <div className='flex items-center gap-6'>
          <img src="/apptv/images/logo_lojas.png" className="h-12 w-auto" />
          <div className="h-10 w-[2px] bg-gray-300" />
          <img src="/apptv/images/logo_naturovos.png" className="h-12 w-auto" />
        </div>

        {/* 🧭 Navegação */}
        <nav className='flex items-center gap-4'>
          <LinkAnalise label="Diário" url="/" active={pathname === '/'} isInteracting={isInteracting} />
          <LinkAnalise label="Mensal" url="/mensal" active={pathname === '/mensal'} isInteracting={isInteracting} />
          <LinkAnalise label="Anual" url="/anual" active={pathname === '/anual'} isInteracting={isInteracting} />
          <LinkAnalise label="Evolução" url="/evolucao" active={pathname === '/evolucao'} isInteracting={isInteracting} />
        </nav>

        {/* ⏱️ Info */}
        <div className='text-right'>
          <div className='text-xs text-gray-400 uppercase tracking-widest'>
            Última atualização
          </div>
          <div className='text-2xl font-bold text-gray-800'>
            {atualizacao || '--:--'}
          </div>
        </div>

      </header>
    </>
  )
}

export default Header