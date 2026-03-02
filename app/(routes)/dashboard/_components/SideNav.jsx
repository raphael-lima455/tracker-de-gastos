'use client'

import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'

const SideNav = () => {

    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Orçamentos',
            icon: PiggyBank,
            path: '/dashboard/budgets'
        },
        {
            id: 3,
            name: 'Gastos',
            icon: ReceiptText,
            path: '/dashboard/expenses'
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: ShieldCheck,
            path: '/dashboard/upgrade'
        },
    ]


    const params = usePathname()


    return (
        <div className='h-screen p-5 border-r'>
            <Image
                src={'/logo.svg'}
                alt='logo'
                width={160}
                height={100} />


            <div className='mt-10'>
                {menuList.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            href={item.path}>
                            <h2
                                className={`
                            flex gap-2 items-center text-gray-500 
                            font-medium p-5 cursor-pointer rounded-md
                            mb-2
                            hover:text-primary hover:bg-blue-100
                            ${params === item.path && 'text-primary bg-blue-100'}
                            `}>
                                <item.icon />
                                {item.name}
                            </h2>
                        </Link>
                    )
                })}
            </div>

            <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
                <UserButton />
                Profile
            </div>


        </div>
    )
}

export default SideNav