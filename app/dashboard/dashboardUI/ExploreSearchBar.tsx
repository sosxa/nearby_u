import React, { useState, useRef, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
}

const mockProducts: Product[] = [
  { id: 1, title: 'Fjallraven Backpack', category: "men's clothing", price: 109.95 },
  { id: 2, title: 'Mens Casual T-Shirt', category: "men's clothing", price: 22.3 },
  { id: 3, title: 'Mens Cotton Jacket', category: "men's clothing", price: 55.99 },
  { id: 4, title: "Women's Gold Dress", category: "women's clothing", price: 168 },
  { id: 5, title: "Women's Striped Top", category: "women's clothing", price: 39.99 },
  { id: 6, title: 'Solid Gold Bracelet', category: 'jewelery', price: 695 },
  { id: 7, title: 'White Gold Ring', category: 'jewelery', price: 9.99 },
  { id: 8, title: 'Microsoft Surface Laptop', category: 'electronics', price: 1499 },
  { id: 9, title: 'Samsung 49-inch Monitor', category: 'electronics', price: 999.99 },
];

const ExploreSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const categories = Array.from(new Set(mockProducts.map(p => p.category)));

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setSearchTerm(product.title);
    setIsDropdownOpen(false);
  };

  return (
    <div className="rounded-xl shadow-2xs p-4">
      <div className="max-w-md mx-auto">
        <div className="relative">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
              <svg className="shrink-0 size-4 text-gray-400 dark:text-white/60" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <input
              ref={inputRef}
              className="py-3 ps-10 pe-4 block w-full rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              type="text"
              role="combobox"
              aria-expanded={isDropdownOpen}
              placeholder="Type a product name"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>

          {isDropdownOpen && (
            <div 
              ref={dropdownRef}
              className="absolute z-50 w-full bg-white rounded-xl shadow-xl dark:bg-neutral-800 mt-1"
            >
              <div className="overflow-x-auto p-4 rounded-t-xl border-b border-gray-200 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800 dark:border-neutral-700">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className={`capitalize py-1 px-2 inline-flex items-center gap-x-2 text-sm text-nowrap rounded-md border border-gray-200 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
                      !selectedCategory ? 'text-purple-800 dark:text-purple-600' : ''
                    }`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    All
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      type="button"
                      className={`capitalize py-1 px-2 inline-flex items-center gap-x-2 text-sm text-nowrap rounded-md border border-gray-200 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
                        selectedCategory === category ? 'text-purple-800 dark:text-purple-600' : ''
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="max-h-75 p-2 rounded-b-xl overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <div
                      key={product.id}
                      className="cursor-pointer p-2 space-y-0.5 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200 dark:focus:bg-neutral-700"
                      onClick={() => handleProductSelect(product)}
                    >
                      <div className="flex justify-between items-center w-full">
                        <div>{product.title}</div>
                        {selectedProduct?.id === product.id && (
                          <svg className="shrink-0 size-3.5 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-neutral-400">
                        ${product.price} • {product.category}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-sm text-gray-500 dark:text-neutral-400">
                    No products found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreSearchBar;