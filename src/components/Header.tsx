import React from 'react'
import DropDownMenu from './DropDownMenu'
import LinkAnalise from './LinkAnalise'
import { usePathname } from 'next/navigation'

type Props = {}

const Header = (props: Props) => {
  const pathname = usePathname();

  return (
    <header className='h-12 bg-white flex items-center justify-between px-4 border-b mb-2'>
      <div className='h-12 '>
        <img src="./images/logo_loja.png" alt="" />
        <img src="./images/logo_naturovos.png" alt="" />
      </div>
      <div className='flex items-center gap-8'>
        <LinkAnalise
          label="Resumos diário"
          url="/"
          active={pathname === '/' ? true : false}
        />
        <LinkAnalise
          label="Resumos Mensal"
          url="/mensal"
          active={pathname === '/mensal' ? true : false}
        />
        <LinkAnalise
          label="Resumos Anual"
          url="/anual"
          active={pathname === '/anual' ? true : false}
        />
        <LinkAnalise
          label="Evolução do Mês"
          url="/evolucao"
          active={pathname === '/evolucao' ? true : false}
        />
      </div>
      <div>
        <DropDownMenu />
      </div>
    </header>
  )
}

export default Header