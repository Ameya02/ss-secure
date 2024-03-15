"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button, ButtonProps } from "@/components/ui/button"
import toast from 'react-hot-toast';
import { Icons } from "@/components/icons"
import { Input } from "./ui/input"
import { Label } from './ui/label';
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

interface ActivityAddButtonProps extends ButtonProps { }


interface ActivityAddButtonProps extends ButtonProps { }

export function ActivityAddButton({
    className,
    variant,
    ...props
}: ActivityAddButtonProps) {
    const router = useRouter();
    const [showAddAlert, setShowAddAlert] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const { mutate } = useMutation({
        mutationFn: async ({ file }: { file: File }) => {
            const formData = new FormData();
            formData.append('file', file);
            const fileName = file.name;
            const API_KEY = process.env.VIRUS_TOTAL_API_KEY
            const response = await axios.post(
                'https://www.virustotal.com/api/v3/files',
                formData,
                {
                    headers: {
                        'X-Apikey': API_KEY,
                    },
                }
            );
            const fileId = response.data.data.id
            const dbresponse = await axios.post('/api/file', { fileId, fileName });

            return response.data;
        },
    });

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files && event.target.files[0];

        if (file) {
            setIsLoading(true);
            mutate({ file }, {
                onSuccess: (data: any) => {
                    console.log("Response Data:", data);
                    router.push(`/dashboard/scan/${data.data.id}`);
                    router.refresh();
                },
                onError: (error: any) => {
                    console.error(error);
                    toast.error("Error uploading file!");
                    setIsLoading(false)
                },
            });
        }
    };


    return (
        <>
            <Button disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.add className="mr-2 h-4 w-4" />
                )}
                <Label htmlFor='file'>
                    Upload file
                </Label>
                <Input type='file' name='file' id='file' className='hidden' onChange={handleFileChange} />
            </Button>
        </>
    );
}
