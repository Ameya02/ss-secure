"use client"

import Link from "next/link"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { StoreFileType, StoreUrlType } from "@/lib/db/schema"

interface ActivityItemProps {
    activity: Pick<
        StoreUrlType,
        "id" | "urlId" | "url" | "userId" | "createdAt"
    > & { file?: Pick<StoreFileType, "id" | "createdAt" | "userId" | "fileId" | "filename"> };
    malware: boolean
    malwareFamily: string
}

export function ActivityItem({ activity, malware, malwareFamily }: ActivityItemProps) {
    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-12">
                <div className="flex items-center gap-4">
                    <div
                        className="h-4 w-4 rounded-full shadow shadow-black dark:shadow-white"
                        data-testid="color-code"
                        style={{ backgroundColor: `${activity.urlId}` }}
                    ></div>
                    <div className="flex flex-row">
                        <Link
                            href={`/dashboard/scan/${activity.urlId}`}
                            className="font-semibold hover:underline "
                        >
                            {activity.url}
                        </Link>
                        {malware ? <p className="px-12 text-red-500">Malware</p>: <p className="px-12 text-green-500">Not a Malware!</p>}
                        {malwareFamily && <p className="px-12 text-red-500">{malwareFamily}</p>}

                        <div>
                            <p className="text-sm text-muted-foreground">
                                {/* {formatDate(activity.createdAt?.toString())} */}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

ActivityItem.Skeleton = function ActivityItemSkeleton() {
    return (
        <div className="p-4">
            <div className="space-y-3">
                <Skeleton className="h-5 w-2/5" />
                <Skeleton className="h-4 w-4/5" />
            </div>
        </div>
    )
}