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
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export const description = "A radial chart with text";

interface RadialChartProps {
    title: string;
    label: string;
    value: any;
    departamento: number;
}

const RadialBigChart = ({ title, label, value, departamento }: RadialChartProps) => {

    const chartData = [
        { browser: "safari", visitors: value, fill: "var(--color-safari)" },
    ]
    const chartConfig = {
        visitors: {
            label: "Visitors",
        },
        safari: {
            label: "Safari",
            color: departamento === 1 ? "#1a9cd9" : "#f9b233",
        },
    } satisfies ChartConfig

    return (
        <Card className="flex flex-col relative">
            {/* <div className="flex self-end p-4 absolute text-gray-500"><Percent size={28} /></div> */}
            {/* <CardHeader className="items-center pb-0">
                <CardTitle>{title}</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader> */}
            <CardContent className="flex-1 p-4">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={90}
                        endAngle={(value * 360) + 90}
                        innerRadius={78}
                        outerRadius={115}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-[#e2e2e2] last:fill-white"
                            polarRadius={[84, 70]}
                        />
                        <RadialBar dataKey="visitors" background cornerRadius={10} />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-4xl font-bold"
                                                >
                                                    {(parseFloat(chartData[0].visitors) * 100)}%
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    {label}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter> */}
        </Card>
    )
};
export default RadialBigChart;