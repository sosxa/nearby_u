'use client';
import React, { useRef } from 'react'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid';
import demoCards from './demCards';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper/modules';

/*
FILE OUTLINE 
Props : 
    - place name 
    - miles (distance)
    - location 
    - image 
    - price 
    - tags 
    - age 
    - attending 
    - tags 

*/

const ExploreCards = () => {



    return (
        <section className='w-full overflow-x-visable py-4' key={uuidv4()}> {/* Added overflow control */}
            <div className='flex gap-8 w-max' key={uuidv4()}> {/* w-max allows horizontal expansion */}
                <Swiper
                    slidesPerView={3}
                    grid={{
                        rows: 2
                    }}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Grid, Pagination]}
                    // className="mySwiper"
                >
                    {demoCards.map((card) => (
                        <SwiperSlide>
                            <div
                                key={uuidv4()}
                                className='shadow-2xl bg-yellow-500 flex-shrink-0 w-80' // Fixed width
                            >
                                <div className="relative h-64 w-full" key={uuidv4()}>
                                    <Image
                                        src={card.image}
                                        alt={card.alt}
                                        fill
                                        className="rounded-lg object-cover object-center"
                                    />
                                </div>
                                <div className='p-4' key={uuidv4()}>
                                    <h1 className='text-lg font-bold'>{card.title}</h1>
                                    <p className='text-sm'>{card.location}</p>
                                    <div className='flex justify-between mt-2' key={uuidv4()}>
                                        <span>{card.age}</span>
                                        <span>{card.attening} attending</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>

    )
}

export default ExploreCards
