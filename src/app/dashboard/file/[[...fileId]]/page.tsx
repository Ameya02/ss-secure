import DashBoardCards from "@/components/dashboard/dashboard-cards"
import React from 'react'


interface Props {
    params: {
        fileId: string
    }
}

const page = ({ params: { fileId } }: Props) => {
    return (
        <div className="bg-gradient-to-r min-h-screen mt-[9rem]">
            {/* <DashBoardCards /> */}
        </div>
    )
}

export default page
