import React from 'react'

const DemoSection = () => {
    return (
        <section className="">
            <div className="gap-8 items-center py-12 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                {/* Demo Screenshot - Light/Dark Mode Toggle */}
                <div className="relative">
                    <img
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg dark:hidden"
                        src="/screenshot-light.png"
                        alt="FOMO Finder app showing trending events in light mode"
                    />
                    <img
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hidden dark:block"
                        src="/screenshot-dark.png"
                        alt="FOMO Finder app showing trending events in dark mode"
                    />
                    {/* Optional: Add a playful label */}
                    <div className="absolute -top-3 -left-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-medium">
                        Live Demo
                    </div>
                </div>

                {/* Text Content */}
                <div className="mt-4 md:mt-0">
                    <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                        Never miss out on what’s happening tonight.
                    </h2>
                    <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                        FOMO Finder shows you <span className="font-semibold">secret concerts, pop-up markets, and local gatherings</span> in real-time—no more scrolling through outdated listings.
                    </p>
                    <ul className="mb-6 space-y-3 text-gray-600 dark:text-gray-300">
                        <li className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            One-tap tickets + directions
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            Personalized picks just for you
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            Last-minute deals updated hourly
                        </li>
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href="#signup"
                            className="px-5 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-center transition-colors"
                        >
                            Join Early Access
                        </a>
                        <a
                            href="#how-it-works"
                            className="px-5 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            How It Works
                        </a>
                    </div>
                </div>
            </div>
        </section>)
}

export default DemoSection
