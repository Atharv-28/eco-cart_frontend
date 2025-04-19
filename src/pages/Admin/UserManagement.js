import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash, PersonPlus, List, BoxArrowRight, Person } from 'react-bootstrap-icons';
import { Button, Modal, Offcanvas } from 'react-bootstrap';
import './UserManagement.css';

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { id: 'U1', email: 'admin@ecocart.com', password: '••••••••' },
    { id: 'U2', email: 'user1@example.com', password: '••••••••' },
    { id: 'U3', email: 'user2@example.com', password: '••••••••' },
  ]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    setUsers(users.filter(user => user.id !== selectedUser));
    setShowDeleteModal(false);
  };

  const handleSubmit = (newUser) => {
    if (isEditing) {
      setUsers(users.map(u => u.id === newUser.id ? newUser : u));
    } else {
      setUsers([...users, { ...newUser, id: `U${users.length + 1}` }]);
    }
    setShowUserModal(false);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="user-management">
      {/* Navigation Drawer */}
      <Offcanvas show={showDrawer} onHide={() => setShowDrawer(false)} className="side-nav">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>EcoCart Admin</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav className="nav flex-column">
            <Button variant="link" className="nav-link" onClick={() => navigate('/dashboard')}>
              <List size={20} className="me-2" /> Dashboard
            </Button>
            <Button variant="link" className="nav-link active">
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
          Are you sure you want to delete this user? This action cannot be undone.
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

      {/* Add/Edit User Modal */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit User' : 'Add New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleSubmit({
              id: selectedUser,
              email: formData.get('email'),
              password: formData.get('password')
            });
          }}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                defaultValue={users.find(u => u.id === selectedUser)?.email}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                defaultValue={users.find(u => u.id === selectedUser)?.password}
                required
              />
            </div>
            <div className="modal-footer mt-4">
              <Button variant="secondary" onClick={() => setShowUserModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {isEditing ? 'Update' : 'Create'} User
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <Button variant="link" onClick={() => setShowDrawer(true)} className="menu-btn">
            <List size={24} />
          </Button>
          <div className="section-header">
            <h2>User Management</h2>
            <Button
              variant="primary"
              onClick={() => {
                setSelectedUser(null);
                setIsEditing(false);
                setShowUserModal(true);
              }}
              className="add-btn"
            >
              <PersonPlus className="me-2" /> Add User
            </Button>
          </div>
        </header>

        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="password-field">
                      {user.password}
                      <span className="password-hover">Click to reveal</span>
                    </div>
                  </td>
                  <td className="actions">
                    <Button
                      variant="link"
                      onClick={() => {
                        setSelectedUser(user.id);
                        setIsEditing(true);
                        setShowUserModal(true);
                      }}
                    >
                      <Pencil className="text-primary" />
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSelectedUser(user.id);
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
  );
}