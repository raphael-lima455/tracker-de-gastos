import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                {/* Left side - image panel */}
                <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                    />

                    <div className="hidden lg:relative lg:block lg:p-12">
                        <a className="block text-white" href="#">
                            <span className="sr-only">Home</span>
                            <svg
                                className="h-8 sm:h-10"
                                viewBox="0 0 28 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.7095 0C16.7797 0 19.7476 1.02234 22.1551 2.90424C24.5626 4.7861 26.2713 7.4194 27.009 10.3847H25.4284C24.7237 7.8354 23.1988 5.56885 21.0693 3.93512C18.9398 2.30139 16.362 1.40016 13.7095 1.40016C11.057 1.40016 8.47921 2.30139 6.34971 3.93512C4.22021 5.56885 2.69529 7.8354 1.99055 10.3847H0.41ZM13.7095 4.64929C15.2595 4.64929 16.7697 5.12547 18.0393 6.01966C19.309 6.91385 20.2807 8.17724 20.8261 9.64039L19.3126 10.0768C18.8666 8.90781 18.0793 7.90422 17.0585 7.19542C16.0377 6.48661 14.8353 6.10432 13.601 6.10432C12.3666 6.10432 11.1642 6.48661 10.1434 7.19542C9.12265 7.90422 8.33534 8.90781 7.88931 10.0768L6.3758 9.64039C6.92115 8.17724 7.89289 6.91385 9.16257 6.01966C10.4322 5.12547 11.9424 4.64929 13.4924 4.64929H13.7095ZM13.7095 9.27088C14.4936 9.27088 15.2577 9.51555 15.8986 9.97077C16.5394 10.426 17.0268 11.0694 17.2942 11.8132L15.7785 12.2496C15.6089 11.7866 15.3024 11.3878 14.9 11.1083C14.4975 10.8288 14.019 10.6824 13.5293 10.6824C13.0395 10.6824 12.561 10.8288 12.1586 11.1083C11.7561 11.3878 11.4496 11.7866 11.2801 12.2496L9.76436 11.8132C10.0317 11.0694 10.5191 10.426 11.16 9.97077C11.8009 9.51555 12.565 9.27088 13.3491 9.27088H13.7095Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>

                        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            Welcome to Squid 🦑
                        </h2>

                        <p className="mt-4 leading-relaxed text-white/90">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                            quibusdam aperiam voluptatum.
                        </p>
                    </div>
                </section>

                {/* Right side - Clerk sign-in */}
                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <SignIn fallbackRedirectUrl="/dashboard"/>
                    </div>
                </main>
            </div>
        </section>


    )
}