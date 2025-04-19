import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../components/util/config';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import icons from react-icons

// ... (keep existing filterOptions array and imports)
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  // Fetch products (keep existing useEffect)
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
  // Pagination logic
  const filteredProducts = useMemo(() => {
    try {
      if (!products || !Array.isArray(products)) return []; // Fallback to empty array
      
      return products.filter(prod => {
        if (!prod) return false; // Skip undefined products
        
        const matchesSearch = prod.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false;
        const matchesCategory = selectedCategory
          ? prod.name?.toLowerCase().includes(selectedCategory.toLowerCase()) ?? false
          : true;
        const matchesFilter =
          selectedFilter === 'all' ||
          (selectedFilter === 'top-rated' && (prod.rating ?? 0) >= 4) ||
          (selectedFilter === 'plastic-free' && prod.material?.toLowerCase().includes('plastic-free')) ||
          (selectedFilter === 'compostable' && prod.material?.toLowerCase().includes('compostable'));
        
        return matchesSearch && matchesCategory && matchesFilter;
      });
    } catch (error) {
      console.error('Filtering error:', error);
      return []; // Return empty array if filtering fails
    }
  }, [products, searchQuery, selectedCategory, selectedFilter]);
  
  // Paginated products
  const paginatedProducts = useMemo(() => {
    if (!filteredProducts || !Array.isArray(filteredProducts)) return []; // Safety check
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Reset to first page when filters/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedFilter]);

  // Pagination controls component
  const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaArrowLeft className="pagination-icon" /> {/* Left arrow icon */}
      </button>
      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        <FaArrowRight className="pagination-icon" /> {/* Right arrow icon */}
      </button>
    </div>
  );

  return (
    <div className="homepage-container">
      {/* Keep existing search/filter bar */}
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
      {/* Modified products container */}
      <div className="products-container mt-5">
        {loading ? (
          <p className="text-center text-muted">Loading products...</p>
        ) : paginatedProducts.length > 0 ? (
          <>
            <div className="row g-4">
              {paginatedProducts.map(prod => (
                <div key={prod.id} className="col-12 col-md-6 col-lg-4">
                  <ProductCard {...prod} />
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <p className="text-center text-muted">No products found.</p>
        )}
      </div>
      </div>
    </div>
  );
}