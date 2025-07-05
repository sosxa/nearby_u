import { useState, useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Category =
    | "All"
    | "Music"
    | "Gaming"
    | "Sports"
    | "News"
    | "Technology"
    | "Entertainment"
    | "Cooking"
    | "Travel"
    | "Comedy"
    | "Education"
    | "Fashion"
    | "Science"
    | "Art"
    | "Fitness";

const MapEventFilter = () => {
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const categories: Category[] = [
        "All",
        "Music",
        "Gaming",
        "Sports",
        "News",
        "Technology",
        "Entertainment",
        "Cooking",
        "Travel",
        "Comedy",
        "Education",
        "Fashion",
        "Science",
        "Art",
        "Fitness"
    ];

    // Debounced category change handler
    const handleCategoryChange = async (category: Category) => {
        setActiveCategory(category);

        try {
            const response = await fetch('/api/ticketmaster', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: category === "All" ? null : category,

                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // Handle successful response if needed
            return data;
        } catch (error) {
            console.error('Failed to update category filter:', error);
            // Revert UI state on error
            setActiveCategory(prev => prev);
            // Optionally show error to user
        }
    };

    // Scroll handling functions remain the same
    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftButton(scrollLeft > 0);
            setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === "left" ? -200 : 200;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth"
            });
        }
    };

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll);
            handleScroll(); // Initial check
            return () => scrollContainer.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <div className="relative w-full bg-[#F5F5F4] dark:bg-[#262626] py-3 z-100">
            <div className="max-w-screen-2xl mx-auto px-4 relative flex items-center">
                {showLeftButton && (
                    <button
                        onClick={() => scroll("left")}
                        className="hidden lg:flex cursor-pointer flex-shrink-0 z-10 bg-neutral-200 dark:bg-[#3A3A3A] p-2 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-[#4A4A4A] transition-all duration-300 focus:outline-none focus:ring-2 focus:dark:ring-purple-600 focus:ring-purple-800"
                        aria-label="Scroll left"
                    >
                        <FiChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                )}

                <div
                    ref={scrollContainerRef}
                    className="flex-1 overflow-x-auto scrollbar-none scroll-smooth mx-4"
                    style={{
                        msOverflowStyle: "none",
                        scrollbarWidth: "none"
                    }}
                >
                    <div className="flex space-x-3 items-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={`
                  cursor-pointer px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300
                  hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500
                  ${activeCategory === category
                                        ? "text-white bg-purple-800 dark:bg-purple-600"
                                        : "bg-neutral-200 text-gray-700 hover:bg-gray-200 dark:bg-[#3A3A3A] dark:text-gray-300 dark:hover:bg-gray-700"}
                `}
                                role="tab"
                                aria-selected={activeCategory === category}
                                aria-label={`Filter by ${category}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {showRightButton && (
                    <button
                        onClick={() => scroll("right")}
                        className="hidden lg:flex cursor-pointer flex-shrink-0 z-10 bg-neutral-200 dark:bg-[#3A3A3A] p-2 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-[#4A4A4A] transition-all duration-300 focus:outline-none focus:ring-2 focus:dark:ring-purple-600 focus:ring-purple-800"
                        aria-label="Scroll right"
                    >
                        <FiChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default MapEventFilter;