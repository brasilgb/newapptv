import { parseValueMoney } from '@/Utils/mask';
import React from 'react';

interface KpiMiddleBoxProps {
    title: string;
    value: number;
}

const KpiMiddleBox = (props: KpiMiddleBoxProps) => {
    return (
        <div className='w-full rounded-lg bg-white border border-gray-200 px-3 py-3 flex flex-col justify-between'>

            {/* TITLE */}
            <span className='text-[10px] uppercase tracking-wide text-gray-500 font-semibold'>
                {props?.title}
            </span>

            {/* VALUE */}
            <div className={`
  text-lg md:text-xl font-bold mt-1 
  whitespace-nowrap flex items-center
  ${props.value < 0 ? 'text-red-600' : 'text-gray-800'}
`}>
                {props.value < 0 ? `- ${parseValueMoney(Math.abs(props.value))}` : parseValueMoney(props.value)}
            </div>

        </div>
    )
}

export default KpiMiddleBox;