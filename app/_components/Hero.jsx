import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (
        <section className="bg-white flex flex-col items-center">
            <div className="mx-auto w-screen max-w-7xl px-4 py-16">
                <div className="mx-auto max-w-prose text-center">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                        Controle Suas Despesas
                        <strong className="text-primary"> Controle Seu Dinheiro </strong>
                    </h1>
                    <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                        Monitore seus gastos e economize muito dinheiro.
                    </p>
                    <div className="mt-4 flex justify-center gap-4 sm:mt-6">
                        <a
                            className="inline-block rounded border border-primary bg-primary px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
                            href="/sign-in"
                        >
                            Começar
                        </a>
                    </div>
                </div>
            </div>

        <Image
        className='-mt-5 rounded-xl border-2'
        src={'/dashboard.png'}
        alt='dashboard'
        width={1000}
        height={700}/>

        </section>

    )
}

export default Hero