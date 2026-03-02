'use client'

import React from 'react'
import { useUser } from '@clerk/clerk-react'
import CardInfo from './_components/CardInfo'
import { useEffect, useState } from 'react'
import { db } from '@/utils/dbConfig'
import { getTableColumns, eq, sum, count, desc } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import BudgetItem from './budgets/_components/BudgetItem'
import ExpenseList from './expenses/[id]/_components/ExpenseList'
import BarChartDashboard from './_components/BarChartDashboard'


const page = () => {

  const { user } = useUser()

  const [budgetList, setBudgetList] = useState([])

  const [expensesList, setExpensesList] = useState([])

  useEffect(() => {
    user && getBudgetList()
  }, [user])

  const getBudgetList = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sum(Expenses.amount).mapWith(Number),
      totalItems: count(Expenses.id).mapWith(Number)
    }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id))

    setBudgetList(result)
    getAllExpenses()
  }

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
      {user &&
        <div>
          <h2 className='font-bold text-3xl'>
            Hi, {user?.firstName}! ✌️
          </h2>
          <p className='text-gray-500'>Gerencie seus gastos de forma simples e eficiente.</p>
        </div>
      }

      <CardInfo budgetList={budgetList} />
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          <BarChartDashboard budgetList={budgetList} />

          {expensesList?.length > 0 ? <div>
            <ExpenseList expensesList={expensesList} refreshData={() => getBudgetList()} />
          </div> : <div>
            {[1.].map((item, index) => {
              return(
                <div key={index} className='h-[170px] bg-slate-200 rounded-lg animate-pulse'></div>
              )
            })}
            </div>}



        </div>



        {budgetList?.length > 0 ? <div>
          <div className='flex flex-col gap-5'>
            <h2 className='font-bold text-lg'>Últimos Orçamentos</h2>
            {budgetList.map((budget, index) => {
              return (
                <BudgetItem budget={budget} key={index} />
              )
            })}
          </div>
        </div> : <div className='flex flex-col gap-5'>
          {[1, 2, 3, 4].map((item, index) => {
            return (
              <div key={index} className='h-[170px] bg-slate-200 rounded-lg animate-pulse'></div>
            )
          })}
        </div>}


      </div>


    </div>
  )
}

export default page