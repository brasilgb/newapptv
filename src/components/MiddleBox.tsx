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
        <Card className='bg-white h-full rounded-xl border border-gray-200 shadow-sm overflow-hidden'>

            {/* HEADER */}
            <CardHeader className='px-3 py-2 border-b border-gray-100 bg-gray-50'>
                <span className='text-sm font-semibold text-gray-700 tracking-tight'>
                    Análise {props.tipo}
                </span>
            </CardHeader>

            {/* KPIs */}
            <CardContent className='flex flex-row justify-between gap-3 p-3'>
                <KpiMiddleBox title="Meta" value={props?.meta} />
                <KpiMiddleBox title="Vendas" value={props?.vendas} />
                <KpiMiddleBox title="Falta Vender" value={props?.faltavender} />
            </CardContent>

            {/* CHART */}
            <CardContent className='p-3'>
                {props.dualchart ? (
                    <div className="grid grid-cols-2 gap-4">
                        <RadialMinChart
                            title="Performance"
                            label="Performance"
                            value={props?.performance}
                            departamento={props?.departamento}
                        />
                        <RadialMinChart
                            title="Meta Acumul."
                            label="Meta Acumul."
                            value={props?.acumuladames}
                            departamento={props?.departamento}
                        />
                    </div>
                ) : (
                    <RadialMiddleChart
                        title="Performance"
                        label="Performance"
                        value={props?.performance}
                        departamento={props?.departamento}
                    />
                )}
            </CardContent>

        </Card>
    )
};
export default MiddleBox;