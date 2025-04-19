import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../components/util.js/config'; // Import Firestore instance
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'top-rated', label: 'Top Rated' },
  { value: 'plastic-free', label: 'Plastic Free' },
  { value: 'compostable', label: 'Compostable' }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // State to manage loading

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products'); // Firestore collection name
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query, category, and filter
  const filteredProducts = useMemo(() => {
    return products.filter(prod => {
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
  }, [products, searchQuery, selectedCategory, selectedFilter]);

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

      {/* Product Results */}
      <div className="products-container mt-5">
        {loading ? (
          <p className="text-center text-muted">Loading products...</p>
        ) : filteredProducts.length > 0 ? (
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
    </div>
  );
}