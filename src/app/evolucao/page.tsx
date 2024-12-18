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
const Evolucao = () => {

    const [graficoTvLoja, setGraficoTvLoja] = useState<any>([]);
    const [graficoTvNatur, setGraficoTvNatur] = useState<any>([]);
    const chartConfig = {
        Venda: {
            label: "Vendas",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig

    useEffect(() => {
        const getGraficoTv = async () => {
            await birel.post('(APPTV_GRAFICO_DEPTO)', {
                departamento: 1
            })
                .then((res) => {
                    setGraficoTvLoja(res.data.bi092.bidata);
                }).catch((err) => {
                    console.log(err);
                })
        };
        getGraficoTv();
    }, []);

    useEffect(() => {
        const getGraficoTv = async () => {
            await birel.post('(APPTV_GRAFICO_DEPTO)', {
                departamento: 5
            })
                .then((res) => {
                    setGraficoTvNatur(res.data.bi092.bidata);
                }).catch((err) => {
                    console.log(err);
                })
        };
        getGraficoTv();
    }, []);

    return (
        <div className='px-2 flex flex-col gap-4'>
            {graficoTvNatur &&
                <div className='bg-[#1a9cd9] rounded-md p-2'>
                    <ChartContainer config={chartConfig} className="max-h-[calc(50vh-65px)] w-full bg-white p-2 rounded-md shadow-md">
                        <ComposedChart data={graficoTvLoja}>
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
                            <Bar dataKey="Venda" fill="#1a9cd9" />
                            <Line type="monotone" dataKey="Meta" stroke="#e54757" strokeWidth={2} />
                        </ComposedChart>
                    </ChartContainer>
                </div>
            }
            {graficoTvNatur &&
                <div className='bg-[#f9b233] rounded-md p-2'>
                    <ChartContainer config={chartConfig} className="max-h-[calc(50vh-65px)] w-full bg-white p-2 rounded-md shadow-md">
                        <ComposedChart data={graficoTvNatur} >
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
                            <Bar dataKey="Venda" fill="#f9b233" />
                            <Line type="monotone" dataKey="Meta" stroke="#e54757" strokeWidth={2} />
                        </ComposedChart>
                    </ChartContainer>
                </div>
            }
        </div>
    )
}

export default Evolucao