import { parseValueMoney } from '@/Utils/mask';
import React from 'react';

interface KpiMiddleBoxProps {
    title: string;
    value: number;
}

const KpiMiddleBox = (props: KpiMiddleBoxProps) => {
    return (
        <div className='w-full border rounded-md'>
            <h1 className='border-b text-xs px-2 py-1 font-medium text-gray-400'>{props?.title}</h1>
            <div className='text-xs px-2 py-4 font-bold'>{parseValueMoney(props.value)}</div>
        </div>
    )
}

export default KpiMiddleBox;