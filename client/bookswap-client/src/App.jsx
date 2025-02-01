import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Rent from "./pages/Rent";
import Sell from "./pages/Sell";
import Buy from "./pages/Buy";
import Swap from "./pages/Swap";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/swap" element={<Swap />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
