import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash, Search, List, Person, BoxArrowRight } from 'react-bootstrap-icons';
import { Offcanvas, Modal, Button } from 'react-bootstrap';
import { db } from '../../components/util/config'; // Import Firestore config
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editProduct, setEditProduct] = useState({ name: '', material: '', rating: '' });

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.material.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Delete product from Firestore
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'products', selectedProduct.id));
      setProducts(products.filter(product => product.id !== selectedProduct.id));
      setShowDeleteModal(false);
      setSelectedProduct(null);
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  // Open edit modal with selected product
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditProduct(product);
    setShowEditModal(true);
  };

  // Save edited product to Firestore
  const handleSaveEdit = async () => {
    try {
      const productDoc = doc(db, 'products', selectedProduct.id);
      await updateDoc(productDoc, editProduct);
      setProducts(products.map(product => (product.id === selectedProduct.id ? editProduct : product)));
      setShowEditModal(false);
      setSelectedProduct(null);
    } catch (err) {
      setError('Failed to update product');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  // Metrics data
  const totalProducts = products.length;
  const totalSearches = 1284;
  const approvedSuggestions = 342;

  return (
    <div className="admin-dashboard">
      {/* Navigation Drawer */}
      <Offcanvas show={showDrawer} onHide={() => setShowDrawer(false)} className="side-nav">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>EcoCart Admin</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav className="nav flex-column">
            <Button variant="link" className="nav-link active">
              <List size={20} className="me-2" /> Dashboard
            </Button>
            <Button variant="link" className="nav-link" onClick={() => navigate('/UserManagement')}>
              <Person size={20} className="me-2" /> User Management
            </Button>
            <div className="mt-auto">
              <Button variant="link" className="nav-link text-danger" onClick={handleLogout}>
                <BoxArrowRight size={20} className="me-2" /> Logout
              </Button>
            </div>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                value={editProduct.name}
                onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productMaterial" className="form-label">Material</label>
              <input
                type="text"
                className="form-control"
                id="productMaterial"
                value={editProduct.material}
                onChange={(e) => setEditProduct({ ...editProduct, material: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productRating" className="form-label">Rating</label>
              <input
                type="number"
                className="form-control"
                id="productRating"
                value={editProduct.rating}
                onChange={(e) => setEditProduct({ ...editProduct, rating: e.target.value })}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <Button variant="link" onClick={() => setShowDrawer(true)} className="menu-btn">
            <List size={24} />
          </Button>
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Metrics Cards */}
        <div className="metrics-grid">
          <div className="metric-card primary">
            <h3>Total Products</h3>
            <p>{totalProducts}</p>
          </div>
          <div className="metric-card success">
            <h3>Total Searches</h3>
            <p>{totalSearches}</p>
          </div>
          <div className="metric-card warning">
            <h3>Approved Suggestions</h3>
            <p>{approvedSuggestions}</p>
          </div>
        </div>

        {/* Products Section */}
        <div className="products-section">
          <div className="section-header">
            <h2>Products</h2>
            <Button
              variant="primary"
              onClick={() => navigate('/Admin/AddProduct')}
              className="add-btn"
            >
              Add Product
            </Button>
          </div>

          {loading ? (
            <div className="text-center">Loading products...</div>
          ) : (
            <div className="products-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Material</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.material}</td>
                      <td>{typeof product.rating === 'number' ? product.rating.toFixed(1) : 'N/A'}</td>
                      <td className="actions">
                        <Button
                          variant="link"
                          onClick={() => handleEdit(product)}
                        >
                          <Pencil className="text-primary" />
                        </Button>
                        <Button
                          variant="link"
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowDeleteModal(true);
                          }}
                        >
                          <Trash className="text-danger" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProducts.length === 0 && (
                <div className="text-center mt-4">No products found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}