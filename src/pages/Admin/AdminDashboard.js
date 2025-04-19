import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash, Search, List, Person, BoxArrowRight } from 'react-bootstrap-icons';
import { Offcanvas, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from './AddProduct';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    { id: '101', name: 'Bamboo Toothbrush', material: 'Bamboo', rating: 4.5 },
    { id: '102', name: 'Compostable Phone Case', material: 'Bioplastic', rating: 4.2 },
    { id: '103', name: 'Reusable Water Bottle', material: 'Stainless Steel', rating: 4.8 },
  ]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Metrics data
  const totalProducts = products.length;
  const totalSearches = 1284;
  const approvedSuggestions = 342;

  // Filter products based on search
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.material.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    setProducts(products.filter(product => product.id !== selectedProduct));
    setShowDeleteModal(false);
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

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

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
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
            <h3>Total Users</h3>
            <p>{approvedSuggestions}</p>
          </div>
        </div>

        {/* Products Section */}
        <div className="products-section">
          <div className="section-header">
            <h2>Products</h2>
            <Button 
              variant="primary" 
              onClick={() => navigate('/AddProduct')}
              className="add-btn"
            >
              Add Product
            </Button>
          </div>
          
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
                    <td>{product.rating.toFixed(1)}</td>
                    <td className="actions">
                      <Button 
                        variant="link" 
                        onClick={() => navigate('/AddProduct', { state: { product } })}
                      >
                        <Pencil className="text-primary" />
                      </Button>
                      <Button 
                        variant="link" 
                        onClick={() => {
                          setSelectedProduct(product.id);
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
          </div>
        </div>
      </div>
    </div>
  );
}