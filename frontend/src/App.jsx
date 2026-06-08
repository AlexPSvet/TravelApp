import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Home from './pages/Home';
import Publish from './pages/Publish';
import Travels from './pages/Travels';
import TravelDetail from './pages/TravelDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/travels" element={<Travels />} />
        <Route path="/travels/:slug" element={<TravelDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;