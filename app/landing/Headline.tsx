'use client';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const Headline = () => {
    const [eventCount, setEventCount] = useState(248);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const controls = useAnimation();

    const eventTypes = [
        "Live Concerts",
        "Local Events",
        "Free Events",
        "Unique Festivals",
        "Hidden Parties",
        "Secret Spots"
    ];

    // Live counter simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setEventCount(prev => prev + Math.floor(Math.random() * 3));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Text cycling animation
    useEffect(() => {
        const cycleText = () => {
            controls.start({
                opacity: 0,
                y: 10,
                transition: { duration: 0.3 }
            }).then(() => {
                setCurrentTextIndex((prev) =>
                    (prev + 1) % eventTypes.length
                );
                controls.start({
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4 }
                });
            });
        };
        const interval = setInterval(cycleText, 2000);
        return () => clearInterval(interval);
    }, [controls]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8"
        >
            {/* Grid */}
            <div className="grid md:grid-cols-2 gap-8 xl:gap-20 md:items-center">
                {/* Left Column - Content */}
                <div>
                    {/* Live counter badge */}
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 1.5
                        }}
                        className="inline-flex items-center gap-x-2 px-4 py-2 mb-6 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
                        </span>
                        <span>Live: {eventCount}+ events happening now</span>
                    </motion.div>

                    {/* Headline */}
                    <h1 className="block text-3xl font-bold sm:text-4xl lg:text-6xl lg:leading-tight">
                        <div className="block sm:flex-row items-start sm:items-end">
                            <span className="mr-2">Find the best</span>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={currentTextIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
                                >
                                    {eventTypes[currentTextIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="mt-3 text-lg gray-primary"
                    >
                        Secret concerts, rooftop gatherings, and underground markets - all in your city. No signup needed.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="mt-7 grid gap-3 w-full sm:inline-flex"
                    >
                        <button className="hover:cursor-pointer py-3 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all">
                            Explore events
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                        <button className="hover:cursor-pointer py-3 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 transition-all">
                            How it works
                        </button>
                    </motion.div>

                    {/* Social Proof */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="mt-8 flex items-center gap-x-4"
                    >
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((item) => (
                                <motion.img
                                    key={item}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{
                                        delay: 0.1 * item,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    viewport={{ once: true }}
                                    src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item + 20}.jpg`}
                                    className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-800"
                                    alt="User"
                                />
                            ))}
                        </div>
                        <div>
                            <p className="text-sm">
                                <span className="font-semibold">1,200+</span> locals discovering events daily
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column - Image */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative ms-4"
                >
                    {/* Main image */}
                    <motion.img
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="w-full rounded-xl shadow-xl border border-gray-100 dark:border-neutral-700"
                        src="https://media.istockphoto.com/id/1995160643/photo/wide-angle-shot-of-gen-z-group-of-friends-using-a-smartphone-together.jpg?s=612x612&w=0&k=20&c=WvBD_7gIc0O5aLPwx_Ol8EQUbtkKM7W_1bI5KK1qs7k="
                        alt="People smiling and taking photo together"
                    />

                    {/* Floating event emojis */}
                    <div className="absolute -bottom-4 -right-4 flex gap-3">
                        {['🎤', '🎭', '🍻', '🎪'].map((emoji, i) => (
                            <motion.span
                                key={i}
                                initial={{ y: 0 }}
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3,
                                    delay: i * 0.3,
                                    repeatType: "reverse"
                                }}
                                className="text-2xl bg-white dark:bg-neutral-800 p-2 rounded-full shadow-md border border-gray-100 dark:border-neutral-700"
                            >
                                {emoji}
                            </motion.span>
                        ))}
                    </div>

                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-gray-100 via-white/0 to-white/0 size-full rounded-xl mt-4 -mb-4 me-4 -ms-4 dark:from-neutral-800 dark:via-neutral-900/0 dark:to-neutral-900/0"></div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Headline;