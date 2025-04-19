import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pencil, Trash } from 'react-bootstrap-icons';

export default function AdminDashboard() {
  // Sample data; replace with API calls
  const [products, setProducts] = useState([
    { id: '101', name: 'Bamboo Toothbrush', material: 'Bamboo', rating: 4.5 },
    { id: '102', name: 'Compostable Phone Case', material: 'Bioplastic', rating: 4.2 },
    { id: '103', name: 'Reusable Water Bottle', material: 'Stainless Steel', rating: 4.8 },
  ]);

  // Sample metrics
  const totalProducts = products.length;
  const totalSearches = 1284;          // stub: fetch from analytics
  const approvedSuggestions = 342;     // stub: fetch from backend

  return (
    <div className="container-fluid p-4">
      {/* Metrics Section */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary h-100">
            <div className="card-body">
              <h5 className="card-title">Total Products</h5>
              <p className="card-text display-6">{totalProducts}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success h-100">
            <div className="card-body">
              <h5 className="card-title">Total Searches Today</h5>
              <p className="card-text display-6">{totalSearches}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning h-100">
            <div className="card-body">
              <h5 className="card-title">Approved Suggestions</h5>
              <p className="card-text display-6">{approvedSuggestions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Products</h3>
        <button className="btn btn-outline-primary">
          Add Product
        </button>
      </div>

      <div className="table-responsive shadow-sm">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Material</th>
              <th scope="col">Rating</th>
              <th scope="col" className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.material}</td>
                <td>{product.rating.toFixed(1)}</td>
                <td className="text-center">
                  <button className="btn btn-sm btn-outline-light me-2 bg-primary" title="Edit">
                    <Pencil />
                  </button>
                  <button className="btn btn-sm btn-outline-light bg-danger" title="Delete">
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
