import React, { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css';

const categoriesList = [
  'Toothbrush', 'Shampoo', 'Notebook', 'T-Shirt', 'Shoes',
  'Coffee Mug', 'Phone Case', 'Water Bottle'
];

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'top-rated', label: 'Top Rated' },
  { value: 'plastic-free', label: 'Plastic Free' },
  { value: 'compostable', label: 'Compostable' }
];

// Example product data; replace with your API data
const initialProducts = [
  {
    id: '101',
    name: 'Bamboo Toothbrush',
    link: '#',
    img: 'https://via.placeholder.com/300x200',
    rating: 4.5,
    rating_description: 'Eco-friendly bamboo handle.',
    material: 'Bamboo'
  },
  {
    id: '102',
    name: 'Compostable Phone Case',
    link: '#',
    img: 'https://via.placeholder.com/300x200',
    rating: 4.2,
    rating_description: 'Made from plant-based materials.',
    material: 'Compostable Bioplastic'
  },
  // ...more products
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(prod => {
      const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory
        ? prod.name.toLowerCase().includes(selectedCategory.toLowerCase())
        : true;
      const matchesFilter =
        selectedFilter === 'all' ||
        (selectedFilter === 'top-rated' && prod.rating >= 4) ||
        (selectedFilter === 'plastic-free' && prod.material.toLowerCase().includes('plastic-free')) ||
        (selectedFilter === 'compostable' && prod.material.toLowerCase().includes('compostable'));
      return matchesSearch && matchesCategory && matchesFilter;
    });
  }, [searchQuery, selectedCategory, selectedFilter]);

  return (
    <div className="homepage-container">
      {/* Search and Filter Bar */}
      <div className="search-filter-bar d-flex align-items-center">
        <SearchBar placeholder="Search for a product..." onSearch={setSearchQuery} />
        <select
          className="form-select filter-select ms-3"
          value={selectedFilter}
          onChange={e => setSelectedFilter(e.target.value)}
        >
          {filterOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Category Chips */}
      <div className="categories-container mt-4">
        {categoriesList.map(cat => (
          <button
            key={cat}
            className={`category-item btn ${selectedCategory === cat ? 'btn-success selected' : 'btn-outline-success'}`}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Results */}
      <div className="products-container mt-5">
        {filteredProducts.length > 0 ? (
          <div className="row g-4">
            {filteredProducts.map(prod => (
              <div key={prod.id} className="col-12 col-md-6 col-lg-4">
                <ProductCard {...prod} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">No products found.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="footer mt-5 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} EcoCart. Suggesting sustainable swaps since 2025.</p>
      </footer>
    </div>
  );
}