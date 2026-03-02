'use client'

import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import { db } from '@/utils/dbConfig'
import { eq, desc } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import ExpenseList from './[id]/_components/ExpenseList'



const ExpensesPage = () => {

    const { user } = useUser()

    const [expensesList, setExpensesList] = useState([])

    useEffect(() => {
        user && getAllExpenses()
    }, [user])


    const getAllExpenses = async () => {
        const result = await db.select({
            id: Expenses.id,
            name: Expenses.name,
            amount: Expenses.amount,
            createdAt: Expenses.createdAt
        }).from(Budgets)
            .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
            .orderBy(desc(Expenses.id))


        setExpensesList(result)
    }

    return (
        <div className='p-10'>

            <h2 className='text-3xl font-bold'>Meus Orçamentos</h2>


            {expensesList?.length > 0 ? <div>
                <ExpenseList expensesList={expensesList} />
            </div> : <div>
                {[1.].map((item, index) => {
                    return (
                        <div key={index} className='mt-5 h-[200px] bg-slate-200 rounded-lg animate-pulse'></div>
                    )
                })}
            </div>}

        </div>
    )
}

export default ExpensesPage