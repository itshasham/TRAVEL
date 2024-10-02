import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Home from "./pages/Home";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import About from './pages/About';
import Logout from './pages/Logout';
import Services from './pages/Services';
import AdminPage from "./pages/Admin/main_admin";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
       
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/Admin" element={<AdminPage/>}/>
      </Routes>
      


      
    </BrowserRouter>
  );
}

export default App;
