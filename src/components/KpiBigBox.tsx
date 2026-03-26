import { parseValueMoney } from '@/Utils/mask';
import React from 'react'

interface KpiBigBoxProps {
    title: string;
    value: number;
}

const KpiBigBox = (props: KpiBigBoxProps) => {
    return (
        <div className='w-full rounded-xl bg-gray-50 border border-gray-200 shadow-sm p-4 flex flex-col justify-between'>
            
            {/* TITLE */}
            <span className='text-xs uppercase tracking-wide text-gray-500 font-semibold'>
                {props?.title}
            </span>

            {/* VALUE */}
            <div className={`
  text-3xl md:text-4xl font-bold mt-1 
  whitespace-nowrap flex items-center
  ${props.value < 0 ? 'text-red-600' : 'text-gray-800'}
`}>
  {props.value < 0 ? `- ${parseValueMoney(Math.abs(props.value))}` : parseValueMoney(props.value)}
</div>

        </div>
    )
}

export default KpiBigBox