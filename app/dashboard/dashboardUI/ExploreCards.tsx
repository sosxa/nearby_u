'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import demoCards from './demCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';



const ExploreCards = () => {
    const swiperRef = useRef<any>(null);
    const [isMounted, setIsMounted] = useState(false);

    // Initialize Swiper only after mount
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Force update after images load
    const handleImageLoad = () => {
        if (swiperRef.current) {
            setTimeout(() => {
                swiperRef.current.swiper.update();
                swiperRef.current.swiper.slideTo(0);
            }, 100);
        }
    };

    // Full responsive solution
    return (
        <section className="w-full relative overflow-hidden px-10">
            {isMounted && (
                <>
                    {/* Left Arrow */}
                    <button
                        onClick={() => swiperRef.current?.swiper.slidePrev()}
                        className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-0 z-10 dark:bg-slate-700 bg-white rounded-full shadow-md p-3 hover:bg-gray-100"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={() => swiperRef.current?.swiper.slideNext()}
                        className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-0 z-10 dark:bg-slate-700 bg-white rounded-full shadow-md p-3 hover:bg-gray-100"
                    >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>

                    <Swiper
                        ref={swiperRef}
                        modules={[Grid, Pagination]}
                        slidesPerView={1}
                        grid={{ rows: 2, fill: 'row' }}
                        spaceBetween={20}
                        pagination={{
                            clickable: true,
                        }}
                        id='#custom-swiper-patination'
                        observer={true}
                        observeParents={true}
                        updateOnWindowResize={true}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                                grid: {
                                    rows: 1,
                                },
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                                grid: {
                                    rows: 1,
                                },
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                                grid: {
                                    rows: 1,
                                },
                            },
                            1440: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                                grid: {
                                    rows: 1,
                                },
                            },
                            2560: {
                                slidesPerView: 5,
                                spaceBetween: 50,
                                grid: {
                                    rows: 1,
                                },
                            },
                        }}
                        onInit={(swiper) => {
                            setTimeout(() => {
                                swiper.update();
                                swiper.slideTo(0);
                            }, 300);
                        }}
                    >
                        {demoCards.map((card) => (
                            <SwiperSlide
                                className='mt-14'
                                key={card.id}
                            >
                                <div className="bg-white rounded-lg shadow-xl overflow-hidden relative">
                                    <div className="relative aspect-[4/3]">
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            fill
                                            className="object-cover"
                                            onLoadingComplete={handleImageLoad}
                                            sizes=""
                                        />
                                    </div>

                                    <div className="p-4">
                                        <h3 className="font-bold text-lg">{card.title}</h3>
                                        <p className="text-gray-600 text-sm">{card.location}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            )}
        </section>
    );
};

export default ExploreCards;