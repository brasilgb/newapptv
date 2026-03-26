import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import KpiBigBox from './KpiBigBox';
import RadialBigChart from './RadialBigChart';

interface BigBoxProps {
    meta: number;
    vendas: number;
    faltavender: number;
    performance: number;
    departamento: number;
    tipo: string;
    dualchart?: boolean;
    acumuladames?: string;
}

const BigBox = (props: BigBoxProps) => {
    const [hDisplay, setHDisplay] = useState(0);

    window.addEventListener("resize", () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        console.log(`Resolução da janela de visualização: ${viewportWidth}x${viewportHeight}`);
        setHDisplay(viewportHeight);
    });

    return (
        <Card className='bg-white h-[60%] rounded-xl shadow-sm border border-gray-200 overflow-hidden'>

    {/* HEADER */}
    <CardHeader className='px-4 py-3 border-b border-gray-100 bg-gray-50'>
        <span className='text-xl font-semibold text-gray-800 tracking-tight'>
            Análise {props.tipo}
        </span>
    </CardHeader>

    {/* KPIs */}
    <CardContent className='flex flex-row justify-between gap-4 p-4'>
        <KpiBigBox title="Meta" value={props?.meta} />
        <KpiBigBox title="Vendas" value={props?.vendas} />
        <KpiBigBox title="Falta Vender" value={props?.faltavender} />
    </CardContent>

    {/* CHART */}
    <CardContent className={`${hDisplay > 927 ? 'p-10' : 'p-4'}`}>
        {props.dualchart ? (
            <div className="grid grid-cols-2 gap-6">
                <RadialBigChart
                    title="Performance"
                    label="Performance"
                    value={props?.performance}
                    departamento={props?.departamento}
                />
                <RadialBigChart
                    title="Meta Acumul."
                    label="Meta Acumul."
                    value={props?.acumuladames}
                    departamento={props?.departamento}
                />
            </div>
        ) : (
            <RadialBigChart
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
export default BigBox;
