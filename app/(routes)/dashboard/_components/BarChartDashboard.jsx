import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const BarChartDashboard = ({ budgetList }) => {
  return (

    <div>
      {budgetList?.length > 0 ? <div>

        <div className='border rounded-lg p-5'>
          <h2 className='font-bold text-lg'>Atividade</h2>

          <ResponsiveContainer width={'80%'} height={300}>
            <BarChart
              data={budgetList}
              margin={{
                top: 7
              }}

            >
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='totalSpend' stackId='a' fill='#4845d2' />
              <Bar dataKey='amount' stackId='a' fill='#C3C2FF' />
            </BarChart>
          </ResponsiveContainer>

        </div>
      </div> : <div className='mb-5'>
        {[1].map((item, index) => {
          return (
            <div key={index} className='w-full h-[400] bg-slate-200 animate-pulse rounded-lg'></div>
          )
        })}
      </div>}



    </div>



  )
}

export default BarChartDashboard