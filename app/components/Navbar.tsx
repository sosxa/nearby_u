'use client';
import React, { useState } from 'react';
import { ThemeSwitch } from './ThemeSwitch';
import Explore from '../dashboard/Explore';
import Map from '../dashboard/EventMap';
import Landing from '../landing/Landing';
import Recommended from '../dashboard/Recommended';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ClickAwayListener from 'react-click-away-listener';
import MapDistanceFilter from '../dashboard/map-content/mapUI/filters/MapDistanceFilter';
import MapEventFilter from '../dashboard/map-content/mapUI/filters/MapEventFilter';
import MapPriceFilter from '../dashboard/map-content/mapUI/filters/MapPriceFilter';

const Navbar = () => {
    const pathname = usePathname();
    const [currentTab, setCurrentTab] = useState<"home" | "map" | "for you" | "explore">("home");
    const [show, setShow] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function analyzeUrl() {
        let j = 0;
        for (let i = 0; i < pathname.length; i++) {
            if (pathname[i] === "/") {
                j++;
                if (j >= 2) {
                    return setShow(false);
                } else {
                    return setShow(true);
                }
            }
        }
    }

    return (
        <section>
            <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-[#F5F5F4] text-sm py-3 dark:bg-neutral-800">
                <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center justify-between">
                        <a className="flex-none text-xl font-semibold dark:text-white focus:outline-hidden focus:opacity-80" href="#" aria-label="Brand">
                            <button onClick={() => analyzeUrl()}>
                                Click Me
                            </button>
                        </a>
                        <div className="sm:hidden">
                            <button
                                type="button"
                                className="cursor-pointer hs-collapse-toggle relative size-9 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? (
                                    <motion.svg
                                        key="close"
                                        initial={{ rotate: 0 }}
                                        animate={{ rotate: 180 }}
                                        className="size-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M18 6 6 18" />
                                        <path d="m6 6 12 12" />
                                    </motion.svg>
                                ) : (
                                    <motion.svg
                                        key="menu"
                                        initial={{ rotate: 0 }}
                                        animate={{ rotate: 0 }}
                                        className="size-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <line x1="3" x2="21" y1="6" y2="6" />
                                        <line x1="3" x2="21" y1="12" y2="12" />
                                        <line x1="3" x2="21" y1="18" y2="18" />
                                    </motion.svg>
                                )}
                                <span className="sr-only">Toggle navigation</span>
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {isOpen && (
                            <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="sm:hidden w-full md:block md:w-auto"
                                >
                                    <motion.ul
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: {
                                                opacity: 1,
                                                transition: {
                                                    staggerChildren: 0.1,
                                                },
                                            },
                                        }}
                                        className="sm:hidden flex flex-col font-medium mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:border-gray-700"
                                    >
                                        {["home", "map", "for you", "explore"].map((tab) => (
                                            <motion.li
                                                key={tab}
                                                variants={{
                                                    hidden: { opacity: 0, y: -10 },
                                                    visible: { opacity: 1, y: 0 },
                                                }}
                                            >
                                                <a
                                                    className={`cursor-pointer block py-2 px-3 text-white rounded ${currentTab === tab ? 'dark:bg-purple-600 bg-purple-600' : 'bg-transparent'}`}
                                                    onClick={() => {
                                                        analyzeUrl();
                                                        setCurrentTab(tab as any);
                                                    }}
                                                >
                                                    {tab}
                                                </a>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </motion.div>
                            </ClickAwayListener>
                        )}
                    </AnimatePresence>

                    <div className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block">
                        <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                            <ThemeSwitch />
                            {["home", "map", "for you", "explore"].map((tab) => (
                                <motion.div
                                    key={tab}
                                    className="relative"
                                    onClick={() => {
                                        analyzeUrl();
                                        setCurrentTab(tab as any);
                                    }}
                                >
                                    <a className={`cursor-pointer font-medium 
                                        ${currentTab === tab
                                            ? 'text-purple-800 dark:text-purple-600'
                                            : 'text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500'} 
                                            focus:outline-hidden focus:text-gray-400 dark:focus:text-neutral-500`}
                                    >
                                        {tab}
                                    </a>
                                    {currentTab === tab && (
                                        <motion.div
                                            layoutId="underline"
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 dark:bg-purple-400"
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </nav>
            </header>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentTab}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                >
                    {currentTab === "home" && show && <div className='top-1.5'>
                        <MapEventFilter />
                        <MapDistanceFilter />
                        <MapPriceFilter />
                    </div>}
                    {currentTab === "for you" && show && <Recommended />}
                    {currentTab === "explore" && show && <Explore />}
                    {currentTab === "map" && show && <Map />}
                </motion.div>
            </AnimatePresence>
        </section>
    )
}

export default Navbar;