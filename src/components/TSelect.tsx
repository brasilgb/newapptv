import React, { FC, InputHTMLAttributes } from 'react'

interface TSelectProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const TSelect = ({ name, label, className, ...props }: TSelectProps) => {
  return (
    <div>
      <div className='flex flex-col relative'>
      <label htmlFor={name} className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>{label}</label>
      <input
        id={name}
        readOnly
        className={`flex h-10 w-full rounded-md border px-3 py-2 text-base md:text-sm ${className}`}
        {...props}
      />
    </div>
    </div>
  )
}

export default TSelect;