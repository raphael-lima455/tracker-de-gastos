import { TrashIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'

const ExpenseList = ({ expensesList, refreshData }) => {


    const deleteExpenses = async (expenses) => {
        const result = await db.delete(Expenses)
            .where(eq(Expenses.id, expenses.id))
            .returning({ deletedId: Expenses.id })

        if (result) {
            refreshData()
            toast.success('Despesa deletada com sucesso!')
        }
    }

    return (
        <div className='mt-3'>
            <h2 className='font-bold text-lg mb-5'>Lista de Gastos</h2>
            <div className='grid grid-cols-4 bg-slate-200 p-2'>
                <h2 className='font-bold'>Nome</h2>
                <h2 className='font-bold'>Valor</h2>
                <h2 className='font-bold'>Data</h2>
                <h2 className='font-bold'>Ações</h2>
            </div>
            {expensesList.map((expenses, index) => {
                return (
                    <div
                        key={index}
                        className='grid grid-cols-4 bg-slate-50 p-2'>
                        <h2>{expenses.name}</h2>
                        <h2>R$ {expenses.amount}</h2>
                        <h2>{expenses.createdAt}</h2>
                        <h2><TrashIcon
                            onClick={() => deleteExpenses(expenses)}
                            className="cursor-pointer w-4 h-4 text-red-600 hover:text-red-400" />
                        </h2>
                    </div>
                )
            })}
        </div>
    )
}

export default ExpenseList