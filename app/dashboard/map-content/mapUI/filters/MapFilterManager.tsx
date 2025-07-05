'use client';
import { useState, useEffect } from "react";
import { FaFilter, FaTimes } from "react-icons/fa"; // Added FaTimes for close button
import { Button } from '../Button';
import MapEventFilter from './MapEventFilter';
import MapDistanceFilter from './MapDistanceFilter';
import MapPriceFilter from './MapPriceFilter';
import ClickAwayListener from 'react-click-away-listener';
import { motion, AnimatePresence } from 'framer-motion'; // Importing AnimatePresence

const MapFilterManager = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false); // To track mobile vs desktop

    // Update screen size on window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024); // 1024px breakpoint
        };

        handleResize(); // Run it on initial mount
        window.addEventListener("resize", handleResize); // Listen for resize event

        return () => {
            window.removeEventListener("resize", handleResize); // Clean up event listener
        };
    }, []);

    // Reset the filter when switching between mobile and desktop views
    useEffect(() => {
        // If we are on desktop, ensure it's not open by default
        if (!isMobile) {
            setIsOpen(false);
        }
    }, [isMobile]); // This will run whenever the screen size changes

    // Toggle the filter open/close
    const toggleFilter = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='z-[1000]'>
            {/* Button to open filters */}
            {!isOpen && (
                <aside className='absolute bottom-25 left-4 bg-background p-2 rounded-lg shadow-lg flex flex-col gap-2'>
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={toggleFilter}
                        className="shadow-lg cursor-pointer hover:bg-primary/20 transition-all duration-200"
                    >
                        <FaFilter className="w-5 h-5" />
                        <span className="sr-only">Open filters</span>
                    </Button>
                </aside>
            )}

            {/* Filters when open */}
            <AnimatePresence>
                {isOpen && (
                    <section className='z-[1000]'>
                        {/* Mobile version */}
                        {isMobile && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                                className="flex"
                            >
                                <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                                    <aside className="w-full max-w-[280px] p-4 bg-white dark:bg-[#1f1f1f] shadow-lg space-y-6 h-screen sticky top-0">
                                        <MapEventFilter />
                                        <MapDistanceFilter />
                                        <MapPriceFilter />
                                    </aside>
                                </ClickAwayListener>
                            </motion.div>
                        )}

                        {/* Desktop version */}
                        {!isMobile && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="hidden lg:flex z-[1000]"
                            >
                                <aside className="mx-10 w-full lg:w-[30%] xl:w-[32%] p-4 my-3 bg-white dark:bg-[#1f1f1f] shadow-lg rounded-lg space-y-6 sticky">
                                    {/* Close Button for Desktop */}
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                                        >
                                            <FaTimes className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <MapEventFilter />
                                    <MapDistanceFilter />
                                    <MapPriceFilter />
                                </aside>
                            </motion.div>
                        )}
                    </section>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MapFilterManager;
