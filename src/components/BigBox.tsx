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

    // useEffect(() => {
    //     let height = window.innerHeight;
    //     if(height > 995)
    // },[])

    return (
        <Card className='bg-gray-50 h-[60%] rounded-md'>
            <CardHeader className='p-0 px-2 border-b bg-gray-200 rounded-t-md'>
                <span className='text-lg font-bold text-gray-500'>Análise {props.tipo}</span>
            </CardHeader>
            <CardContent className='flex flex-row justify-between gap-2 p-2'>
                <KpiBigBox title="Meta" value={props?.meta} />
                <KpiBigBox title="Vendas" value={props?.vendas} />
                <KpiBigBox title="Falta Vender" value={props?.faltavender} />
            </CardContent>
            <CardContent className={`${hDisplay > 927 ? 'p-12' : 'p-2'}`}>
                {props.dualchart &&
                    <div className="grid grid-cols-2">
                        <RadialBigChart title={'Performance'} label={'Performance'} value={props?.performance} departamento={props?.departamento} />
                        <RadialBigChart title={'Meta Acumul.'} label={'Meta Acumul.'} value={props?.acumuladames} departamento={props?.departamento} />
                    </div>
                }
                {!props.dualchart &&
                    <RadialBigChart title={'Performance'} label={'Performance'} value={props?.performance} departamento={props?.departamento} />
                }
            </CardContent>
        </Card>
    )
};
export default BigBox;
