import { parseValueMoney } from '@/Utils/mask';
import React from 'react'

interface KpiBigBoxProps {
    title: string;
    value: number;
}

const KpiBigBox = (props: KpiBigBoxProps) => {
    return (
        <div className='w-full border rounded-md'>
            <h1 className='border-b text-lg p-2 px-2 font-medium text-gray-400'>{props?.title}</h1>
            <div className='text-3xl px-2 py-4 font-bold'>{parseValueMoney(props.value)}</div>
        </div>
    )
}

export default KpiBigBox