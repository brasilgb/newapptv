import { Percent, TrendingUp } from "lucide-react";
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts"

import {
    Card,
    CardContent
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useEffect } from "react";

export const description = "A radial chart with text";

interface RadialChartProps {
    title: string;
    label: string;
    value: any;
    departamento: number;
}

const RadialBigChart = ({ title, label, value, departamento }: RadialChartProps) => {

    const safeValue = Math.max(0, Math.min(1, Number(value) || 0))

    const chartData = [
        { name: "progress", value: safeValue },
    ]

    const color =
        safeValue >= 1
            ? "#22c55e" // verde (meta batida)
            : safeValue >= 0.7
                ? (departamento === 1 ? "#1a9cd9" : "#f59e0b")
                : "#ef4444" // vermelho (baixo desempenho)

    return (
        <Card className="flex flex-col border-none shadow-none">

            {/* TITLE */}
            <span className="text-sm text-gray-500 font-medium text-center">
                {title}
            </span>

            <CardContent className="flex-1 p-2">
                <ChartContainer
                    className="mx-auto aspect-square max-h-[260px]"
                    config={{}}
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={90}
                        endAngle={90 - (safeValue * 360)}
                        innerRadius={90}
                        outerRadius={130}
                    >

                        {/* BACKGROUND TRACK */}
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-gray-200 last:fill-white"
                            polarRadius={[100, 80]}
                        />

                        <RadialBar
                            dataKey="value"
                            fill={color}
                            cornerRadius={20}
                            background={{ fill: "#e5e7eb" }}
                        />

                        <PolarRadiusAxis tick={false} axisLine={false}>

                            <Label
                                content={({ viewBox }) => {
                                    if (!viewBox || !("cx" in viewBox)) return null

                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            {/* VALUE */}
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className="fill-gray-800 text-5xl font-bold"
                                            >
                                                {(safeValue * 100).toFixed(0)}%
                                            </tspan>

                                            {/* LABEL */}
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 28}
                                                className="fill-gray-400 text-sm"
                                            >
                                                {label}
                                            </tspan>
                                        </text>
                                    )
                                }}
                            />

                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
export default RadialBigChart;