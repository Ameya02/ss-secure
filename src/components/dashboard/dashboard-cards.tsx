import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Icons } from '../icons'
import { SearchParams } from "@/types"

interface DashboardCardsProps {
    data: {
        streak: {
            currentStreak: number
            longestStreak: number
        }
        topActivities: number
        totalLogs: number
        mostLoggedActivity: string | undefined
    }
    searchParams: SearchParams
}
const DashBoardCards = ({ data, searchParams }: DashboardCardsProps) => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total malicious</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold"><span className='text-red-500'>90</span></div>
                    {/* <p className="text-xs text-muted-foreground">All time</p> */}
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total families</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold"><span className='text-slate-600'>5</span></div>
                    {/* <p className="text-xs text-muted-foreground">All time</p> */}
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Most upload type</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-slate-600">exe</div>
                    <p className="text-xs text-muted-foreground">
                        {/* {displayDateRange(searchParams)} */}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Most Logged Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-2xl font-bold">
                        <span className='text-slate-500'>a moment ago</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {/* {displayDateRange(searchParams)} */}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default DashBoardCards
