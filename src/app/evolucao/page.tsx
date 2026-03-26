'use client'
import React, { useEffect, useState } from 'react'
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import { Bar, CartesianGrid, ComposedChart, Legend, Line, XAxis, YAxis } from 'recharts'
import { SquareCheck } from 'lucide-react'
import { parseValueMoney } from '@/Utils/mask'
import birel from '@/services/birel'
import moment from 'moment'
import { useAuthContext } from '@/contexts/AuthContext'
import Loading from '../loading'

const chartConfig = {
    Venda: {
        label: "Vendas",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

const ChartBlock = ({ data, color, title }: any) => {
    if (!data?.length) return null

    return (
        <div className='w-full bg-white rounded-xl border border-gray-200 shadow-sm p-3'>

            {/* TITLE */}
            <div className='text-sm font-semibold text-gray-600 mb-2'>
                {title}
            </div>

            <ChartContainer
                config={chartConfig}
                className="max-h-[calc(48vh-60px)] w-full"
            >
                <ComposedChart data={data}>

                    <XAxis
                        dataKey="DiaSemana"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        className="text-xs"
                    />

                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        className="text-xs"
                    />

                    <CartesianGrid stroke="#f1f5f9" vertical={false} />

                    <ChartTooltip
                        cursor={false}
                        content={
                            <ChartTooltipContent
                                formatter={(value: any, name, props: any) => (
                                    <div className="text-xs">
                                        <p className="flex items-center gap-2">
                                            <SquareCheck color={props.color} className="w-3 h-3" />
                                            {name}: {parseValueMoney(value)}
                                        </p>
                                    </div>
                                )}
                            />
                        }
                    />

                    <Legend />

                    <Bar
                        dataKey="Venda"
                        fill={color}
                        radius={[6, 6, 0, 0]}
                    />

                    <Line
                        type="monotone"
                        dataKey="Meta"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={false}
                    />

                </ComposedChart>
            </ChartContainer>
        </div>
    )
}

const Evolucao = () => {

    const { loading, setLoading } = useAuthContext();

    const [data, setData] = useState<any>({
        loja: [],
        natur: []
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [lojaRes, naturRes] = await Promise.all([
                    birel.post('(APPTV_GRAFICO_DEPTO)', { departamento: 1 }),
                    birel.post('(APPTV_GRAFICO_DEPTO)', { departamento: 5 }),
                ])

                const currentMonth = Number(moment().format('YYYYMM'))

                const filterData = (res: any) =>
                    res.data.bi092.bidata.filter(
                        (ds: any) => ds.DataChave === currentMonth
                    )

                setData({
                    loja: filterData(lojaRes),
                    natur: filterData(naturRes)
                })

            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
  return <Loading />
}

    return (
        <div className='px-3 flex flex-col w-full animate__animated animate__fadeIn gap-4'>

            <ChartBlock
                data={data.loja}
                color="#1a9cd9"
                title="Evolução - Loja"
            />

            <ChartBlock
                data={data.natur}
                color="#f9b233"
                title="Evolução - Natur"
            />

        </div>
    )
}

export default Evolucao