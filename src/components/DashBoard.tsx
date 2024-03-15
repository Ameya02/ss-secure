import React from 'react'
import { Progress } from './ui/progress'

interface Props {

}

const DashBoard = (props: Props) => {
    return (
        <div className="absolute top-1/5 left-1/2 -translate-x-1/2 -translate-y-1">
            <div className="grid grid-cols-3  gap-4 justify-items-center border-2 border-gray-400 border-dashed">
                <div className="h-32">
                    <Progress value={100} className='w-60'/>
                </div>
                <div className="...">02</div>
            </div>
        </div>
    )
}

export default DashBoard
