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

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftButton(scrollLeft > 0);
            setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
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

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === "left" ? -300 : 300;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="relative w-full bg-white dark:bg-gray-900 py-3">
            <div className="max-w-screen-2xl mx-auto px-4 relative flex items-center">
                {showLeftButton && (
                    <button
                        onClick={() => scroll("left")}
                        className="flex-shrink-0 z-10 bg-white dark:bg-gray-900 p-2 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                onClick={() => setActiveCategory(category)}
                                className={`
                  px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300
                  hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${activeCategory === category
                                        ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"}
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
                        className="flex-shrink-0 z-10 bg-white dark:bg-gray-900 p-2 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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