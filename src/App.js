import logo from './logo.svg';
import ProductCard from './components/ProductCard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GetRating from './pages/GetRating';
import LensSearch from './pages/LensSearch';
import AboutUs from './pages/AboutUs';
import Header from './components/Header'; 

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Get-Rating" element={<GetRating />} />
        <Route path="/Lens-Search" element={<LensSearch />} />
        <Route path="/About-Us" element={<AboutUs />} />
        {/* Fallback route for unmatched paths */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
