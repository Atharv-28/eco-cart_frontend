import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GetRating from './pages/GetRating';
import LensSearch from './pages/LensSearch';
import Header from './components/Header'; 
import AboutUs from './pages/AboutUs';
import Footer from './components/Footer';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AddProduct from './pages/Admin/AddProduct'; // Import AddProduct component
import UserManagement from './pages/Admin/UserManagement'; // Import UserManagement component
import Login from './pages/Login';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Admin" element={<Login />} />
        <Route path="/Get-Rating" element={<GetRating />} />
        <Route path="/Lens-Search" element={<LensSearch />} />
        <Route path="/About-Us" element={<AboutUs />} />
        <Route path="/Admin/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Admin/AddProduct" element={<AddProduct />} /> 
        <Route path="/Admin/UserManagement" element={<UserManagement />} /> 

        {/* Fallback route for unmatched paths */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
