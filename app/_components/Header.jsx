'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const Header = () => {



  const { user, isSignedIn } = useUser()

  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
      <Image src="/logo.svg" width={160} height={100} alt="Logo" />

      {isSignedIn
        ?
        <UserButton />
        :
        <Link href={'/sign-in'}>
          <Button className="cursor-pointer">Começar</Button>
        </Link>}

    </div>
  )
}

export default Header