'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import demoCards from './demCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ExploreCards = () => {
    const swiperRef = useRef<any>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleImageLoad = () => {
        if (swiperRef.current) {
            setTimeout(() => {
                swiperRef.current.swiper.update();
                swiperRef.current.swiper.slideTo(0);
            }, 100);
        }
    };

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    const arrowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
        hover: { scale: 1.1 }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "backOut"
            }
        }
    };

    return (
        <section className="w-full relative overflow-visible px-10 pb-12">
            <motion.h1
                className='text-4xl lg:text-6xl'
                initial="hidden"
                animate="visible"
                variants={titleVariants}
            >
                Hello Section
            </motion.h1>

            {isMounted && (
                <>
                    {/* Left Arrow */}
                    <motion.button
                        onClick={() => swiperRef.current?.swiper.slidePrev()}
                        className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-0 z-10 dark:bg-slate-700 bg-white rounded-full shadow-md p-3 hover:bg-gray-100 cursor-pointer"
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        variants={arrowVariants}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </motion.button>

                    {/* Right Arrow */}
                    <motion.button
                        onClick={() => swiperRef.current?.swiper.slideNext()}
                        className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-0 z-10 dark:bg-slate-700 bg-white rounded-full shadow-md p-3 hover:bg-gray-100 cursor-pointer"
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        variants={arrowVariants}
                    >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </motion.button>

                    <Swiper
                        ref={swiperRef}
                        modules={[Grid, Pagination]}
                        slidesPerView={1}
                        grid={{ rows: 2, fill: 'row' }}
                        spaceBetween={20}
                        pagination={{
                            clickable: true,
                            renderBullet: (index, className) => {
                                return `<span class="${className}" style="width: 12px; height: 12px; margin: 0 4px;"></span>`;
                            }
                        }}
                        observer={true}
                        observeParents={true}
                        updateOnWindowResize={true}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                                grid: { rows: 1 },
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                                grid: { rows: 1 },
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                                grid: { rows: 1 },
                            },
                            1440: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                                grid: { rows: 1 },
                            },
                            2560: {
                                slidesPerView: 5,
                                spaceBetween: 50,
                                grid: { rows: 1 },
                            },
                        }}
                        onInit={(swiper) => {
                            setTimeout(() => {
                                swiper.update();
                                swiper.slideTo(0);
                            }, 300);
                        }}
                    >
                        {demoCards.map((card, index) => (
                            <SwiperSlide
                                className='mt-10 h-full'
                                key={card.id}
                            >
                                <motion.div
                                    className="bg-white rounded-lg shadow-xl overflow-hidden relative hover:shadow-2xl transition-shadow duration-300"
                                    custom={index}
                                    initial="hidden"
                                    animate="visible"
                                    variants={cardVariants}
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <motion.div
                                        className="relative aspect-[4/3]"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            fill
                                            className="object-cover"
                                            onLoadingComplete={handleImageLoad}
                                            sizes=""
                                        />
                                    </motion.div>

                                    <motion.div
                                        className="p-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <h3 className="font-bold text-lg dark:text-black text-white">{card.title}</h3>
                                        <p className="text-gray-600 text-sm">{card.location}</p>
                                    </motion.div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            )}
        </section>
    );
};

export default ExploreCards;