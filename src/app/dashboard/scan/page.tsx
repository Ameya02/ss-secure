// @ts-nocheck
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { Shell } from "@/components/layout/shell"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { ActivityItem } from "@/components/activity/activity-item"
import { ActivityAddButton } from "@/components/upload-file"
import { Icons } from "@/components/icons"
import { auth, currentUser } from "@clerk/nextjs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import ScanUrl from "@/components/scan-url"
import { db } from "@/lib/db"
import { storefile, storeurl } from '@/lib/db/schema';
import { eq } from "drizzle-orm"
import Link from "next/link"
import { DynamicAnalysis } from "@/components/dynamic-analysis"


export const metadata: Metadata = {
    title: "Bucket",
    description: "Manage files and url's.",
}

export default async function ActivitiesPage() {
    const user = await currentUser()
    const { userId } = auth();
    const urls = await db
        .select()
        .from(storeurl)
        .where(eq(storeurl.userId, userId!));

    const fileNames = await db
        .select()
        .from(storefile)
        .where(eq(storefile.userId, userId!));


    if (!user) {
        redirect("/signin")
    }

    return (
        <Shell>
            <div className="h-full px-4 py-6 lg:px-8">
                <Tabs defaultValue="files" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                        <TabsList>
                            <TabsTrigger value="files" className="relative">
                                files
                            </TabsTrigger>
                            <TabsTrigger value="urls">urls</TabsTrigger>
                            <TabsTrigger value="search" disabled>
                                search
                            </TabsTrigger>
                            <TabsTrigger value="analysis" >
                                dynamic analysis
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent
                        value="files"
                        className="border-none p-0 outline-none"
                    >
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    All files
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    uploaded files will be shown here.
                                </p>
                            </div>
                            <div className="ml-auto mr-4">
                                <ActivityAddButton />
                            </div>
                        </div>
                        <Separator className="my-4" />
                        {/* {fileNames?.length ? (
                            fileNames.map((filename) => (
                                <Link key={filename.fileId} href={`/dashboard/scan/${filename.fileId}`}>
                                    <p>{filename.filename}</p>
                                </Link>
                            ))
                        ) */}


                        {/* : (
                        <div className="relative">
                            <EmptyPlaceholder>
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                                    <Icons.activity className="h-10 w-10" />
                                </div>
                                <EmptyPlaceholder.Title>No activities created</EmptyPlaceholder.Title>
                                <EmptyPlaceholder.Description>
                                    Add an activity to start monitoring your progress.
                                </EmptyPlaceholder.Description>
                            </EmptyPlaceholder>
                        </div>
                            )} */}
                        {fileNames?.length ? (
                            <div className="divide-y divide-border rounded-md border p-2">
                                {fileNames.map((fileName) => (
                                    <div key={fileName.fileId} className="flex items-center gap-4 p-5">
                                        <div className="h-4 w-4 rounded-full shadow shadow-black dark:shadow-white" data-testid="color-code"></div>
                                        <div className="flex flex-row">
                                            <Link href={`/dashboard/scan/${fileName.fileId}`} className="font-semibold hover:underline">
                                                {fileName.filename}
                                            </Link>
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    {/* {formatDate(activity.createdAt?.toString())} */}
                                                </p>
                                                {fileName.malware ? <p className="px-12 text-red-500">Malware</p> : <p className="px-12 text-red-500">Malware!</p>}
                                                {fileName.malwareFamily && <p className="px-12 text-red-500">{fileName.malwareFamily}</p>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No file names found.</p>
                        )}
                    </TabsContent>
                    <TabsContent
                        value="urls"
                        className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    All links
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    find all your scanned links here.
                                </p>
                            </div>
                            <ScanUrl />
                        </div>
                        <Separator className="my-4" />
                        {urls?.length ? (
                            <div className="divide-y divide-border rounded-md border">
                                {urls.map((url) => (
                                    <ActivityItem key={url.id} activity={url} />
                                ))}
                            </div>
                        ) : (
                            <EmptyPlaceholder>
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                                    <Icons.activity className="h-10 w-10" />
                                </div>
                                <EmptyPlaceholder.Title>No activities created</EmptyPlaceholder.Title>
                                <EmptyPlaceholder.Description>
                                    Add an activity to start monitoring your progress.
                                </EmptyPlaceholder.Description>
                            </EmptyPlaceholder>
                        )}
                    </TabsContent>
                    <TabsContent
                        value="analysis"
                        className="border-none p-0 outline-none"
                    >
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    All files
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    uploaded files will be shown here.
                                </p>
                            </div>
                            <div className="ml-auto mr-4">
                                <DynamicAnalysis />
                            </div>
                        </div>
                        <Separator className="my-4" />
                        {fileNames?.length ? (
                            <div className="divide-y divide-border rounded-md border p-2">
                                {fileNames.map((fileName) => (
                                    <div key={fileName.fileId} className="flex items-center gap-4 p-5">
                                        <div className="h-4 w-4 rounded-full shadow shadow-black dark:shadow-white" data-testid="color-code"></div>
                                        <div className="flex flex-row">
                                            <Link href={`/dashboard/scan/${fileName.fileId}`} className="font-semibold hover:underline">
                                                {fileName.filename}
                                            </Link>
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    {/* {formatDate(activity.createdAt?.toString())} */}
                                                </p>
                                                {fileName.malware ? <p className="px-12 text-red-500">Malware</p> : <p className="px-12 text-red-500">Malware!</p>}
                                                {fileName.malwareFamily && <p className="px-12 text-red-500">{fileName.malwareFamily}</p>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No file names found.</p>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </Shell >
    )
}