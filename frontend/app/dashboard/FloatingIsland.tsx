'use client';
import React, { useState } from 'react';
import Map from './Map';
import Recommended from './Recommended';
import Search from './Search';

const FloatingIsland = () => {
    const [activeTab, setActiveTab] = useState('map'); // 'map' | 'recommended' | 'search'

    return (
        <section>
            <div className="fixed top-4 left-0 right-0 z-50 px-4">
                <div className="hidden rounded-full lg:w-1/2 md:w-3/4 w-[90%] mx-auto 
                      bg-purple-400 dark:bg-purple-700 
                      shadow-lg overflow-hidden">
                    <ul className="grid grid-cols-3 divide-x divide-purple-300 dark:divide-purple-500 text-center">
                        {[
                            { id: 'map', icon: '🌍', label: 'Map' },
                            { id: 'recommended', icon: '✨', label: 'For You' },
                            { id: 'search', icon: '🔍', label: 'Search' }
                        ].map((tab) => (
                            <li
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`cursor-pointer py-2 transition-colors
                ${activeTab === tab.id
                                        ? 'bg-purple-500 dark:bg-purple-600 text-white'
                                        : 'hover:bg-purple-300 dark:hover:bg-purple-800'
                                    }`}
                            >
                                <span className="text-lg">{tab.icon}</span>
                                <span className={`text-sm font-medium ${activeTab === tab.id ? 'text-white' : 'text-purple-900 dark:text-purple-200'
                                    }`}>
                                    {tab.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <section>
                {
                    activeTab === "map"
                    &&
                    <div>
                        <Map />
                    </div>
                }
                {
                    activeTab === "recommended"
                    &&
                    <div>
                        <Recommended />
                    </div>
                }
                {
                    activeTab === "search"
                    &&
                    <div>
                        <Search />
                    </div>
                }
            </section>
        </section>
    );
};

export default FloatingIsland;




