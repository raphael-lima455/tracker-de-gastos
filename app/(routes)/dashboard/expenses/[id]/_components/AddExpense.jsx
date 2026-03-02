'use client'

import React from 'react'
import { useState, useEffect, use } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { toast } from 'sonner'
import moment from 'moment/moment'
import { Loader } from 'lucide-react'

const AddExpense = ({ budgetId, user, refreshData }) => {


    const [name, setName] = useState()
    const [amount, setAmount] = useState()

    const [loading, setLoading] = useState(false)

    const addNewExpense = async () => {
        setLoading(true)
        const result = await db.insert(Expenses).values({
            name: name,
            amount: amount,
            budgetId: budgetId,
            createdAt: moment().format('DD/MM/YYYY'),
        }).returning({ insertedId: Expenses.id })


        if (result) {
            setAmount('')
            setName('')
            setLoading(false)
            refreshData()
            toast.success('Despesa adicionada com sucesso!')
        }
        setLoading(false)
    }

    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Adicionar Despesa</h2>

            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Nome da Despesa</h2>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Quadro Decorativo" />
            </div>

            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Valor da Despesa</h2>
                <Input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="R$ 100,00" />
            </div>


            <Button
                onClick={() => { addNewExpense() }}
                disabled={!(name && amount) || loading}
                className='cursor-pointer mt-5 w-full'>
                {loading ? <Loader className='animate-spin' /> : 'Adicionar Despesa'}
            </Button>

        </div>
    )
}

export default AddExpense