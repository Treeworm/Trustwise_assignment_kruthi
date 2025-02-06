import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 
import LandingPage from "./pages/LandingPage"; 
import AnalyzePage from "./pages/AnalyzePage"; 


function App() {
 

  

 

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar/>
        <main className="">
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/analyze" element={<AnalyzePage/>} />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
