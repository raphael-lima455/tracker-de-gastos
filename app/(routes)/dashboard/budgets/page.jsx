import React from 'react'
import BudgetList from './_components/BudgetList'
import CreateBudget from './_components/CreateBudget'

const page = () => {
  return (
    <div className='p-10'>

      <h2 className='text-3xl font-bold'>Meus Orçamentos</h2>
      <BudgetList />

    </div>
  )
}

export default page