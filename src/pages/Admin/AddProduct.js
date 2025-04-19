import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddProductPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    name: '',
    material: '',
    rating: '',
    ratingDescription: '',
    imageUrl: ''
  });

  const handleFetch = async () => {
    if (!url.trim()) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setFields({
        name: 'Sample Eco Product',
        material: 'Bamboo',
        rating: '4.7',
        ratingDescription: 'Durable and sustainable bamboo product.',
        imageUrl: 'https://via.placeholder.com/400x300'
      });
      setLoading(false);
    }, 1500);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Submitting product:', fields);
    alert('Product added successfully!');
    setFields({ name: '', material: '', rating: '', ratingDescription: '', imageUrl: '' });
    setUrl('');
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="card shadow rounded-4 border-0">
              <div className="card-body p-5 bg-white">
                <h2 className="text-center mb-4 text-success fw-bold">Add New Product</h2>

                {/* URL Fetch Section */}
                <div className="mb-4">
                  <label className="form-label text-secondary fw-semibold">Add via Product URL</label>
                  <div className="input-group">
                    <input
                      type="url"
                      className="form-control"
                      placeholder="Enter product URL..."
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                    />
                    <button
                      className="btn btn-outline-success"
                      type="button"
                      onClick={handleFetch}
                      disabled={loading}
                    >
                      {loading ? 'Fetching...' : 'Fetch'}
                    </button>
                  </div>
                </div>

                <div className="text-center my-3">
                  <span className="text-muted">— OR —</span>
                </div>

                {/* Manual Entry Form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={fields.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Material</label>
                    <input
                      type="text"
                      className="form-control"
                      name="material"
                      value={fields.material}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Rating (0-5)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="rating"
                        min="0"
                        max="5"
                        step="0.1"
                        value={fields.rating}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-8 mb-3">
                      <label className="form-label">Image URL</label>
                      <input
                        type="url"
                        className="form-control"
                        name="imageUrl"
                        value={fields.imageUrl}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Rating Description</label>
                    <textarea
                      className="form-control"
                      name="ratingDescription"
                      rows="3"
                      value={fields.ratingDescription}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-success btn-lg shadow-sm">
                      Add Product
                    </button>
                  </div>
                </form>

                {/* Optional Preview */}
                {fields.imageUrl && (
                  <div className="text-center mt-4">
                    <img
                      src={fields.imageUrl}
                      alt="Preview"
                      className="img-fluid rounded shadow-sm"
                      style={{ maxHeight: '250px' }}
                    />
                    <p className="text-muted small mt-2">Product Image Preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
