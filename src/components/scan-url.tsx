"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'
import toast from 'react-hot-toast'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface Props {

}

const ScanUrl = (props: Props) => {
    const [url, setUrl] = useState("")
    const router = useRouter();
    const dbresponse = useMutation({
        mutationFn: async () => {
            const response = await axios.post("/api/scan", {
                url: url,
            });
            return response.data;
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (url === "") {
            toast.error("Please enter a URL");
            return;
        }
        dbresponse.mutate(undefined, {
            onSuccess: (url_data) => {
                router.push(`/dashboard/scan/${url_data.data.id}`)
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between ">
                    <div className="flex w-full max-w-3xl items-center space-x-7">
                        <Input type="text" placeholder="Search or scan a URL" className="md:w-[500px] w-[200px]" value={url} onChange={(e) => setUrl(e.target.value)} />
                        <Button type="submit" className="h-9" disabled={dbresponse.isPending}>
                            Scan
                            {dbresponse.isPending && (
                                <Loader2 className="animate-spin" size={20} />
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ScanUrl
