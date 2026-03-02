'use client'

import React, { useEffect, use, useState } from 'react'
import { db } from '@/utils/dbConfig'
import { getTableColumns, eq, sum, count, desc } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/clerk-react'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpense from './_components/AddExpense'
import ExpenseList from './_components/ExpenseList'
import { Button } from '@/components/ui/button'
import { ArrowLeft, TrashIcon } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import EditBudget from './_components/EditBudget'

const ExpensesPage = ({ params }) => {

    const { id } = use(params)
    const { user } = useUser()

    const [budgetInfo, setBudgetInfo] = useState()
    const [expensesList, setExpensesList] = useState([])

    const route = useRouter()

    useEffect(() => {
        if (user) {
            getBudgetInfo()

        }

    }, [user])

    const getBudgetInfo = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sum(Expenses.amount).mapWith(Number),
            totalItems: count(Expenses.id).mapWith(Number)
        }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .where(eq(Budgets.id, id))
            .groupBy(Budgets.id)

        setBudgetInfo(result[0])
        getExpensesList()



    }

    const getExpensesList = async () => {
        const result = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, id))
            .orderBy(desc(Expenses.id))


        setExpensesList(result)
    }

    const deleteBudget = async (budgetId) => {


        const deleteExpenseResult = await db.delete(Expenses)
            .where(eq(Expenses.budgetId, budgetId)).returning()

        if (deleteExpenseResult) {
            const result = await db.delete(Budgets)
                .where(eq(Budgets.id, budgetId))
                .returning({ deletedId: Budgets.id })

            if (result) {
                toast.success('Orçamento deletado com sucesso!')
                route.replace('/dashboard/budgets')
            }


        }


    }

    return (
        <div className='p-10'>
            <div className='flex justify-between'>

                    <h2 className="text-2xl font-bold flex gap-2 items-center">
                        <ArrowLeft className='cursor-pointer' onClick={() => route.push('/dashboard/budgets')}/>
                        Meus Gastos
                    </h2>


                <div className='flex gap-2 items-center'>
                    {budgetInfo && <EditBudget budgetInfo={budgetInfo} refreshData={getBudgetInfo} />}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant='destructive'
                                className='cursor-pointer flex items-center'>
                                <TrashIcon />Deletar
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Você tem certeza?</DialogTitle>
                                <DialogDescription>
                                    Esta ação não pode ser desfeita.
                                </DialogDescription>
                            </DialogHeader>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button
                                        className='cursor-pointer'
                                        variant="outline">
                                        Cancelar
                                    </Button>
                                </DialogClose>

                                <DialogClose asChild>
                                    <Button
                                        variant='destructive'
                                        className='cursor-pointer'
                                        onClick={() => deleteBudget(id)}>
                                        Deletar
                                    </Button>
                                </DialogClose>



                            </DialogFooter>


                        </DialogContent>
                    </Dialog>

                </div>

            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
                {budgetInfo
                    ?
                    <BudgetItem budget={budgetInfo} />
                    :
                    <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'>

                    </div>}

                <AddExpense
                    budgetId={id}
                    user={user}
                    refreshData={getBudgetInfo}
                />
            </div>

            <div className='mt-4'>

                <ExpenseList
                    refreshData={getBudgetInfo}
                    expensesList={expensesList} />
            </div>

        </div>
    )
}

export default ExpensesPage