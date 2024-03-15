"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button, ButtonProps } from "@/components/ui/button"
import toast from 'react-hot-toast';
import { Icons } from "@/components/icons"

interface ActivityAddButtonProps extends ButtonProps { }

export function LightningButton({
    className,
    variant,
    ...props
}: ActivityAddButtonProps) {
    const router = useRouter()
    const [showAddAlert, setShowAddAlert] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    async function onClick() {
        setIsLoading(true)

        const response = await fetch("/api/activities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "New Activity",
                colorCode: "#ffffff",
            }),
        })

        if (!response?.ok) {
            setIsLoading(false)
            setShowAddAlert(false)

            toast.error("Something went wrong!");
        }

        toast.success("File uploaded successfully!");

        const activity = await response.json()

        setIsLoading(false)
        setShowAddAlert(false)

        // router.push(`/dashboard/activities/${activity.id}/settings`)
        router.refresh()
    }

    return (
        <>
                <Button onClick={() => setShowAddAlert(true)} className="p-3 bg-black text-white rounded-md cursor-pointer">
                    <Icons.lightning className="w-4 h-4" />
                </Button>

            {/* Add Alert */}
            < AlertDialog open={showAddAlert} onOpenChange={setShowAddAlert} >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                        Decide Your Move:
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Choose two of the one action to proceed with Scanning.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button onClick={onClick} disabled={isLoading}>
                            {isLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Icons.add className="mr-2 h-4 w-4" />
                            )}
                            <span>Add activity</span>
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog >
        </>
    )
}