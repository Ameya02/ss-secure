import { Metadata } from "next"
import { Shell } from "@/components/layout/shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import DashboardCards from "@/components/dashboard/dashboard-cards"
import { ActivityAddButton } from "@/components/upload-file"
import { LineChartComponent } from "@/components/charts/linechart"
import { LightningButton } from "@/components/dashboard/lightning-btn"
import { Overview } from "@/components/overview"
import { ChatAI } from "@/components/ai-rag"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Monitor your security",
}

interface DashboardProps {
    searchParams: { from: string; to: string }
}

export default async function Dashboard({ searchParams }: DashboardProps) {

    const data = {
        streak: {
            currentStreak: 0,
            longestStreak: 0,
        },
        topActivities: 30,
        totalLogs: 0,
        mostLoggedActivity: undefined,
    };

    return (
        <Shell>
            <DashboardHeader heading="Dashboard" text="Monitor your security.">
                <LightningButton />
                {/* <ActivityAddButton /> */}
                {/* <DateRangePicker /> */}
            </DashboardHeader>
            <DashboardCards data={data} searchParams={searchParams} />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overall uploads</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Chat</CardTitle>
                        <CardDescription>
                            Find risk and security information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChatAI />
                    </CardContent>
                </Card>
            </div>
            {/* <DataTable columns={logColumns} data={dashboardData.logs}>
                Log History
            </DataTable> */}
        </Shell >
    )
}