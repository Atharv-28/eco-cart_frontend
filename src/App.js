import logo from './logo.svg';
import ProductCard from './components/ProductCard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GetRating from './pages/GetRating';
import LensSearch from './pages/LensSearch';
import AboutUs from './pages/AboutUs';
function App() {
  return (
    <Router>  
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Get-Rating" element={<GetRating />} />
      <Route path="/Lens-Search" element={<LensSearch />} />
      <Route path="/About-Us" element={<AboutUs />} />
    </Routes>
    </Router>
  );
}

export default App;
