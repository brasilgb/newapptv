import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import RadialChart from './RadialBigChart';
import KpiBox from './KpiBigBox';
import KpiBigBox from './KpiBigBox';
import RadialBigChart from './RadialBigChart';

interface BigBoxProps {
    meta: number;
    vendas: number;
    faltavender: number;
    performance: number;
    departamento: number;
    tipo: string;
}

const BigBox = (props: BigBoxProps) => {
    return (
        <Card className='bg-gray-50'>
            <CardHeader className='p-0 px-2 border-b bg-gray-200 rounded-t-md'><span className='text-lg font-bold text-gray-500'>Análise {props.tipo}</span></CardHeader>
            <CardContent className='flex flex-row justify-between gap-2 p-2'>
                <KpiBigBox title="Meta" value={props?.meta}/>
                <KpiBigBox title="Vendas" value={props?.vendas}/>
                <KpiBigBox title="Falta Vender" value={props?.faltavender}/>
            </CardContent>
            <CardContent className='p-2'>
                <RadialBigChart title={'Performance'} label={'Performance'} value={props?.performance} departamento={props?.departamento} />
            </CardContent>
        </Card>
    )
};
export default BigBox;
