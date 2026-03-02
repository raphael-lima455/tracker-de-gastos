import React from 'react'
import { UserButton } from '@clerk/nextjs'

const DashboardHeader = () => {
    return (
        <div className='p-5 border-b flex justify-between items-center'>

            <div>
                {/* Search Bar */}
            </div>

            <div>
                <UserButton />
            </div>


        </div>
    )
}

export default DashboardHeader