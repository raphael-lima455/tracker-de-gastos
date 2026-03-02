import Link from 'next/link'
import React from 'react'

const BudgetItem = ({ budget, index }) => {

    const calculateProgressPerc = () => {
        // spend / total * 100
        const perc = budget.totalSpend / budget.amount * 100

        if (perc > 100) {
            return 100
        }

        return perc.toFixed(2)
    }
    return (

        <Link href={'/dashboard/expenses/' + budget?.id} >
            <div className='cursor-pointer p-5 border rounded-lg hover:shadow-md h-[170px]'>
                <div className='flex gap-2 items-center justify-between'>
                    <div className='flex gap-2 items-center'>
                        <h2 className="text-2xl p-3 bg-slate-100 rounded-full">{budget?.icon}</h2>
                        <div>
                            <h2 className='font-bold'>{budget?.name}</h2>
                            <h2 className='text-sm text-gray-500'>{budget?.totalItems} Itens</h2>
                        </div>
                    </div>

                    <h2 className='font-bold text-primary text-lg'>R$ {budget?.amount}</h2>
                </div>

                <div className='mt-5'>
                    <div className='flex justify-between items-center mb-3'>
                        {/* Total Gasto */}
                        <h2 className='text-xs text-slate-400'>R$ {budget?.totalSpend ? budget?.totalSpend : 0} Gastos</h2>
                        {/* Total Restante */}
                        <h2 className='text-xs text-slate-400'>R$ {budget?.amount - budget?.totalSpend} Restantes</h2>
                    </div>

                    <div className='w-full bg-slate-300 h-2 rounded-full'>
                        <div
                            className='bg-primary h-2 rounded-full'
                            style={{ width: `${calculateProgressPerc()}%` }}
                        ></div>
                    </div>

                </div>
            </div>

        </Link>
    )
}

export default BudgetItem