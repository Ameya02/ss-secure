"use client";

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface FileUploadProps { }

const FileUpload: React.FC<FileUploadProps> = () => {
    const router = useRouter();
    const [uploading, setUploading] = useState(false);
    const { mutate } = useMutation({
        mutationFn: async ({ file }: { file: File }) => {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(
                'https://www.virustotal.com/api/v3/files',
                formData,
                {
                    headers: {
                        'X-Apikey': process.env.VIRUS_TOTAL_API_KEY,
                    },
                }
            );

            return response.data;
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];

        if (file) {
            setUploading(true);
            mutate({ file }, {
                onSuccess: (data: any) => {
                    console.log("Response Data:", data);
                    const { file_id } = data;
                    toast.success("File uploaded successfully!");
                    router.push(`/dashboard/file/${data.data.id}`)
                },
                onError: (error: any) => {
                    console.error(error);
                },
                onSettled: () => {
                    setUploading(false);
                },
            });
        }
    };

    return (
        <div>
            {uploading ? (
                <>
                    <div className="p-2">
                        <div className='rounded-lg  md:text-lg  flex justify-center items-center'>
                            <Loader2 className="h-10 w-10 text-slate-600 animate-spin" />
                            <p className="mt-2 text-sm text-black">
                                Uploading...
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Label htmlFor='file' className='border-2 rounded-lg border-gray-700 md:text-lg md:p-3 p-2 cursor-pointer'>
                        Select Files
                    </Label>
                    <Input type='file' name='file' id='file' className='hidden' onChange={handleFileChange} />
                </>
            )}
        </div>
    );
};

export default FileUpload;
