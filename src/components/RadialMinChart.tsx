import { Percent, TrendingUp } from "lucide-react"
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

export const description = "A radial chart with text"



interface RadialChartProps {
    title: string;
    label: string;
    value: any;
    departamento: number;
}

const RadialMinChart = ({ title, label, value, departamento }: RadialChartProps) => {

    const safeValue = Math.max(0, Math.min(1, Number(value) || 0))

    const chartData = [
        { name: "progress", value: safeValue },
    ]

    const color =
        safeValue >= 1
            ? "#22c55e"
            : safeValue >= 0.7
                ? (departamento === 1 ? "#1a9cd9" : "#f59e0b")
                : "#ef4444"

    return (
        <Card className="flex flex-col border-none shadow-none">

            {/* TITLE (bem discreto) */}
            <span className="text-[10px] text-gray-400 text-center">
                {title}
            </span>

            <CardContent className="flex-1 p-1">
                <ChartContainer
                    className="mx-auto aspect-square max-h-[140px]"
                    config={{}}
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={90}
                        endAngle={90 - (safeValue * 360)}
                        innerRadius={60}
                        outerRadius={90}
                    >

                        {/* TRACK */}
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-gray-200 last:fill-white"
                            polarRadius={[70, 55]}
                        />

                        <RadialBar
                            dataKey="value"
                            fill={color}
                            cornerRadius={10}
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
                                                className="fill-gray-800 text-lg font-bold"
                                            >
                                                {(safeValue * 100).toFixed(0)}%
                                            </tspan>

                                            {/* LABEL (opcional - bem leve) */}
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 14}
                                                className="fill-gray-400 text-[9px]"
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
export default RadialMinChart;