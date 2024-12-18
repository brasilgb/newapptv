import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import KpiMiddleBox from './KpiMiddleBox';
import RadialMiddleChart from './RadialMiddleChart';
import RadialMinChart from './RadialMinChart';

interface MiddleBoxProps {
    meta: number;
    vendas: number;
    faltavender: number;
    performance: string;
    departamento: number;
    tipo: string;
    dualchart?: boolean;
    acumuladames?: string;
}

const MiddleBox = (props: MiddleBoxProps) => {
    return (
        <Card className='bg-gray-50 h-[100%]'>
            <CardHeader className='p-0 px-2 border-b bg-gray-200 rounded-t-md'><span className='text-sm font-bold text-gray-500'>Análise {props.tipo}</span></CardHeader>
            <CardContent className='flex flex-row justify-between gap-2 p-2'>
                <KpiMiddleBox title="Meta" value={props?.meta} />
                <KpiMiddleBox title="Vendas" value={props?.vendas} />
                <KpiMiddleBox title="Falta Vender" value={props?.faltavender} />
            </CardContent>
            <CardContent className='p-2'>
                {props.dualchart &&
                    <div className="grid grid-cols-2">
                        <RadialMinChart title={'Performance'} label={'Performance'} value={props?.performance} departamento={props?.departamento} />
                        <RadialMinChart title={'Performance'} label={'Meta Acumul.'} value={props?.acumuladames} departamento={props?.departamento} />
                    </div>
                }
                {!props.dualchart &&
                    <RadialMiddleChart title={'Performance'} label={'Performance'} value={props?.performance} departamento={props?.departamento} />
                }
            </CardContent>
        </Card>
    )
};
export default MiddleBox;