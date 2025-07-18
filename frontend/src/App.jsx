import react, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './component/Navbar';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FarmerRegistration from './pages/Registration/NewRegisrtation';
import FarmerForm from './pages/AddFarm/Farm';
import AddCrop from './pages/AddCrop';
import SoilTesting from './pages/SoilTesting';
import ViewMore from './pages/SoilTesting/viewmore';
import Footer from './pages/HomePage/FooterPage';
import DynamicPage from './pages/DynamicPage';
import ChemicalPage from './pages/chemical';
import Myaccount from './pages/MyAccount';

function App() {
  const [count, setCount] = useState(0)


  return (
    <div>

      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<FarmerRegistration />} />
          <Route path="/addland" element={<FarmerForm />} />
          <Route path="/addcrop" element={<AddCrop />} />
          <Route path="/details/:name" element={<DynamicPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/soiltesting" element={<SoilTesting />} />
          <Route path="/seemore" element={<ViewMore />} />
          <Route path="/chemical" element={<ChemicalPage/>} />
          <Route path="/account" element={<Myaccount/>} />

        </Routes>
        <Footer />
      </Router>
    </div>



  )
}

export default App
