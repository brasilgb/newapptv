import React, { FC, InputHTMLAttributes } from 'react'

interface TInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const TInput = ({ name, label, className, ...props }: TInputProps) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={name} className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>{label}</label>
      <input
        id={name}
        className={`flex h-10 w-full rounded-md border px-3 py-2 text-base md:text-sm ${className}`}
        {...props}
      />
    </div>
  )
}

export default TInput;