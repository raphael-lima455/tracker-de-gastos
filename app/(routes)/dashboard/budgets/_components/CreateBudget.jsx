'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'



const CreateBudget = ({refreshData}) => {

  const [emojiIcon, setEmojiIcon] = useState('😊')
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

  // Input Values

  const [name, setName] = useState()
  const [amount, setAmount] = useState()

  const { user } = useUser()


  // 
  // Criar Novo Orçamento
  // 
  const onCreateBudge = async () => {
    const result = await db.insert(Budgets).values({
      name: name,
      amount: amount,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      icon: emojiIcon
    }).returning({ insertedId: Budgets.id })

    if (result) {
      refreshData()
      toast.success('Novo Orçamento Criado!')


    }

  }

  return (
    <div>


      <Dialog>
        <DialogTrigger asChild>
          <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
            <h2 className='text-3xl'>+</h2>
            <h2>Criar Novo Orçamento</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Orçamento</DialogTitle>
            <DialogDescription asChild>

              <div className='mt-5'>
                <Button
                  size='lg'
                  className='cursor-pointer text-lg'
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                  variant='outline'>{emojiIcon}</Button>
                <div className='absolute z-1'>
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji)
                      setOpenEmojiPicker(false)
                    }}
                  />
                </div>

                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Nome do Orçamento</h2>
                  <Input
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Decoração de Casa" />
                </div>

                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Valor do Orçamento</h2>
                  <Input
                    type='number'
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="R$ 1.000,00" />
                </div>



              </div>

            </DialogDescription>
          </DialogHeader>



          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                onClick={() => onCreateBudge()}
                disabled={!(name && amount)}
                className='cursor-pointer mt-5 w-full'>Criar Orçamento
              </Button>
            </DialogClose>
          </DialogFooter>


        </DialogContent>
      </Dialog>


    </div>
  )
}

export default CreateBudget