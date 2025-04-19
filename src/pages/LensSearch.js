import { useState, useCallback } from 'react';
import { FiUpload, FiCamera, FiSearch, FiChevronDown } from 'react-icons/fi';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import './LensSearch.css';
import ProductCard from '../components/ProductCard';

export default function LensSearchPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showMore, setShowMore] = useState(false);

  // Simulated API call to fetch alternatives
  const fetchImageDetails = async () => {
    if (!selectedFile) return;
    
    setLoading(true);
    setError('');
    try {
      // Simulated API response
      const mockAlternatives = [
        { id: 1, name: 'Bamboo Toothbrush', rating: 4.5, ecoScore: 9 },
        { id: 2, name: 'Reusable Silicone Bags', rating: 4.8, ecoScore: 9.5 },
        { id: 3, name: 'Organic Cotton Tote', rating: 4.7, ecoScore: 8.8 },
        { id: 4, name: 'Glass Food Containers', rating: 4.6, ecoScore: 9.2 },
      ];

      setTimeout(() => {
        setAlternatives(mockAlternatives);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to fetch alternatives');
      setLoading(false);
    }
  };
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
  };

  

  return (
    <div className="lens-container">
      <header className="lens-header">
        <div className="logo-container">
          <CenterFocusWeakIcon className="logo-icon" />
          <h1>EcoLens</h1>
        </div>
        <h2>Scan Products for Sustainability Insights</h2>
      </header>

      <main className="main-content">
        <div
          className={`upload-area ${isDragging ? 'dragging' : ''}`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-content">
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="image-preview"
              />
            ) : (
              <>
                <FiUpload className="upload-icon" />
                <h3>Drag & Drop Image Here</h3>
                <p>or</p>
                <label className="file-input-label">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden-input"
                  />
                  <FiCamera className="camera-icon" />
                  Browse Files
                </label>
              </>
            )}
          </div>
        </div>

        {/* Button below container */}
        {selectedFile && (
          <div className="action-container">
            <button 
              className="find-button" 
              onClick={fetchImageDetails}
              disabled={loading}
            >
              {loading ? (
                <div className="spinner"></div>
              ) : (
                <>
                  <FiSearch /> Analyze Sustainability
                </>
              )}
            </button>
          </div>
        )}

{error && <p className="error-message">{error}</p>}

{alternatives.length > 0 && (
  <div className="alternatives-section">
    <h3><span className="eco-badge">♻️</span> Eco-Friendly Alternatives</h3>
    
    <div className="alternatives-grid">
      {alternatives
        .slice(0, showMore ? alternatives.length : 3)
        .map(product => (
          <ProductCard 
            key={product.id}
            {...product}
            ecoScore={product.ecoScore}
          />
        ))}
    </div>

    {alternatives.length > 3 && !showMore && (
      <button 
        className="show-more-btn"
        onClick={() => setShowMore(true)}
      >
        Show More Alternatives <FiChevronDown />
      </button>
    )}
  </div>
)}
      </main>
    </div>
  );
}
