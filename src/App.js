import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GetRating from './pages/GetRating';
import LensSearch from './pages/LensSearch';
import Header from './components/Header'; 
import AboutUs from './pages/AboutUs';
import Footer from './components/Footer';
import AdminDashboard from './pages/Admin/AdminDashboard';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Get-Rating" element={<GetRating />} />
        <Route path="/Lens-Search" element={<LensSearch />} />
        <Route path="/About-Us" element={<AboutUs />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

        {/* Fallback route for unmatched paths */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
