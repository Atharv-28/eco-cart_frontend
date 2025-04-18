import { useState, useCallback } from 'react';
import { FiUpload, FiCamera, FiClock, FiImage, FiSearch } from 'react-icons/fi';
import './LensSearch.css';
import ProductCard from '../components/ProductCard'; // Assuming you have a ProductCard component
export default function LensSearchPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const fetchImageDetails = () => {
    if (!selectedFile) return;
    // API call logic goes here
    console.log("Fetching details for image:", selectedFile.name);
    // You can convert it to Base64, send via FormData, etc.

    <div className="product-card-container">
      <ProductCard id={1} name="Sample Product" link="#" img={URL.createObjectURL(selectedFile)} rating={4.5} rating_description="Great product!" material="Bamboo" />
    </div>
  };

  return (
    <div className="lens-container">
      <header className="lens-header">
        <div className="logo-container">
          <FiImage className="logo-icon" />
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
          <div className="find-button-container">
            <button className="find-button" onClick={fetchImageDetails}>
              <FiSearch /> Find Details
            </button>
          </div>
        )}

        <div className="recent-scans">
          <h3><FiClock /> Recent Scans</h3>
          <div className="scan-grid">
            {[1, 2, 3].map((item) => (
              <div key={item} className="scan-item">
                <div className="scan-image-placeholder" />
                <p>Bamboo Toothbrush</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
