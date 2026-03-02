import { PiggyBank, ReceiptText, WalletIcon } from 'lucide-react'
import React from 'react'
import { useEffect, useState } from 'react'


const CardInfo = ({ budgetList }) => {

    const [totalBudget, setTotalBudget] = useState(0)
    const [totalSpend, setTotalSpend] = useState(0)


    useEffect(() => {
        budgetList && CalculateCardInfo()
    }, [budgetList])


    const CalculateCardInfo = () => {
        console.log(budgetList)
        let totalBudget_ = 0
        let totalSpend_ = 0
        budgetList.forEach(element => {
            totalBudget_ = totalBudget_ + Number(element.amount)
            totalSpend_ = totalSpend_ + element.totalSpend
        })

        setTotalBudget(totalBudget_)
        setTotalSpend(totalSpend_)
    }


    return (
        <div className=''>

            {budgetList?.length>0 ? <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                <div className='p-7 border rounded-lg flex items-center justify-between'>
                    <div>
                        <h2 className='text-sm'>Orçamento Total</h2>
                        <h2 className='font-bold text-2xl'>R$ {totalBudget}</h2>
                    </div>
                    <PiggyBank
                        className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
                </div>

                <div className='p-7 border rounded-lg flex items-center justify-between'>
                    <div>
                        <h2 className='text-sm'>Total Gasto</h2>
                        <h2 className='font-bold text-2xl'>R$ {totalSpend}</h2>
                    </div>
                    <ReceiptText
                        className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
                </div>

                <div className='p-7 border rounded-lg flex items-center justify-between'>
                    <div>
                        <h2 className='text-sm'>Qntd. de Orçamentos</h2>
                        <h2 className='font-bold text-2xl'>{budgetList?.length || 0}</h2>
                    </div>
                    <WalletIcon
                        className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
                </div>
            </div> : <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {[1, 2, 3].map((item, index) => (
                    <div key={index} className='h-[110px] w-full bg-slate-200 animate-pulse rounded-lg'></div>
                ))}
            </div>}



        </div>
    )
}

export default CardInfo