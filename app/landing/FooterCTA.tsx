import React from 'react'

const FooterCTA = () => {
    return (
        <section className="py-12">
            <div className="max-w-screen-md mx-auto text-center px-4">
                <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                    Ready to never miss out again?
                </h2>
                <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                    Join the first 1,000 users and get early access + exclusive perks.
                </p>
                <a
                    href="#signup"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors inline-block"
                >
                    Claim Your Spot — It's Free
                </a>
            </div>
        </section>
    )
}

export default FooterCTA
