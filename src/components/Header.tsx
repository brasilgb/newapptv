import React from 'react'
import DropDownMenu from './DropDownMenu'
import LinkAnalise from './LinkAnalise'

type Props = {}

const Header = (props: Props) => {
  return (
    <header className='h-12 bg-white flex items-center justify-between px-4 border-b mb-2'>
      <div className='h-12 w-12'>
        <img src="./images/icon.png" alt="" />
      </div>
      <div className='flex items-center gap-8'>
        <LinkAnalise
          label="Resumos diário"
          url="#"
          active
        />
        <LinkAnalise
          label="Resumos Mensal"
          url="#"
          active={false}
        />
        <LinkAnalise
          label="Resumos Anual"
          url="#"
          active={false}
        />
      </div>
      <div>
        <DropDownMenu />
      </div>
    </header>
  )
}

export default Header