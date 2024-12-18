import React from 'react'

const Loading = () => {
  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 z-40 bg-gray-900/10 flex items-center justify-center'>
        <div className='h-20 w-20 border-8 border-y-[#bccf00] rounded-full animate-spin' />
    </div>
  )
}

export default Loading