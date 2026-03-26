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

const RadialMiddleChart = ({ title, label, value, departamento }: RadialChartProps) => {

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

            {/* TITLE */}
            <span className="text-xs text-gray-500 text-center font-medium">
                {title}
            </span>

            <CardContent className="flex-1 p-2">
                <ChartContainer
                    className="mx-auto aspect-square max-h-[180px]"
                    config={{}}
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={90}
                        endAngle={90 - (safeValue * 360)}
                        innerRadius={70}
                        outerRadius={100}
                    >

                        {/* TRACK */}
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-gray-200 last:fill-white"
                            polarRadius={[80, 65]}
                        />

                        <RadialBar
                            dataKey="value"
                            fill={color}
                            cornerRadius={12}
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
                                                className="fill-gray-800 text-2xl font-bold"
                                            >
                                                {(safeValue * 100).toFixed(0)}%
                                            </tspan>

                                            {/* LABEL */}
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 18}
                                                className="fill-gray-400 text-[10px]"
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
export default RadialMiddleChart;