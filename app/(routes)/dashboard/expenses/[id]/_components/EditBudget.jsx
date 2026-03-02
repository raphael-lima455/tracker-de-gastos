'use client'

import { PenBox } from 'lucide-react'
import { Button } from '@/components/ui/button'
import EmojiPicker from 'emoji-picker-react'
import { Input } from '@/components/ui/input'
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
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'


const EditBudget = ({ budgetInfo, refreshData }) => {



    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon)
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

    // Input Values

    const [name, setName] = useState(budgetInfo.name)
    const [amount, setAmount] = useState(budgetInfo.amount)

    const { user } = useUser()

    const onUpdateBudget = async () => {
        const result = await db.update(Budgets).set({
            name: name,
            amount: amount,
            icon: emojiIcon
        }).where(eq(Budgets.id, budgetInfo.id))
            .returning({ updatedId: Budgets.id })

        if (result) {
            refreshData()
            toast.success('Orçamento Atualizado!')
        }

    }



    return (
        <div>


            <Dialog>
                <DialogTrigger asChild>
                    <Button className='cursor-pointer'>
                        <PenBox className="w-4 h-4 mr-2" />Editar
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar  Orçamento</DialogTitle>
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
                                        defaultValue={budgetInfo.name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Ex: Decoração de Casa" />
                                </div>

                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Valor do Orçamento</h2>
                                    <Input
                                        defaultValue={budgetInfo.amount}
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
                                onClick={() => onUpdateBudget()}
                                disabled={!(name && amount)}
                                className='cursor-pointer mt-5 w-full'>Editar Orçamento
                            </Button>
                        </DialogClose>
                    </DialogFooter>


                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditBudget