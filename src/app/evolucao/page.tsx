'use client'
import React from 'react'
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import { useEffect, useState } from "react"
import { Bar, CartesianGrid, ComposedChart, Legend, Line, XAxis, YAxis } from 'recharts'
import { SquareCheck } from 'lucide-react'
import { parseValueMoney } from '@/Utils/mask'
import birel from '@/services/birel'
import { Card } from '@/components/ui/card'
const Evolucao = () => {

    const [graficoTv, setGraficoTv] = useState<any>([]);
    const chartConfig = {
        Venda: {
            label: "Vendas",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig

    useEffect(() => {
        const getGraficoTv = async () => {
            await birel.get('(APPTV_GRAFICO_LOJAS)')
                .then((res) => {
                    setGraficoTv(res.data.bi092.bidata);
                }).catch((err) => {
                    console.log(err);
                })
        };
        getGraficoTv();
    }, []);

    return (
        <>
            {graficoTv &&
                <div className='px-2'>
                    <ChartContainer config={chartConfig} className="max-h-[calc(100vh-82px)] w-full bg-white p-2 rounded-md shadow-md">
                    <ComposedChart data={graficoTv}>
                        <XAxis
                            dataKey="DiaSemana"
                            tickLine={true}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <YAxis />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent formatter={(value: any, name, props: any) => (
                                <div>
                                    <p className="flex items-center gap-2">
                                        {name == 'Venda' && <SquareCheck color={props.color} className={`w-4 h-4`} />}
                                        {name == 'Venda' && name + ': ' + parseValueMoney(value)}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        {name == 'Meta' && <SquareCheck color={props.color} className={`w-4 h-4`} />}
                                        {name == 'Meta' && name + ': ' + parseValueMoney(value)}
                                    </p>
                                </div>
                            )} />}
                        />
                        <Legend />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Bar dataKey="Venda" barSize={20} fill="#1a9cd9" />
                        <Line type="monotone" dataKey="Meta" stroke="#e54757" />
                    </ComposedChart>
                </ChartContainer>
                </div>
            }
        </>
    )
}

export default Evolucao