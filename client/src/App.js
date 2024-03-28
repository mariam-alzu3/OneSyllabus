import logo from './logo.svg';
import './App.css';

import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import InstDashboard from "./pages/InstDashboard";
import DcDashboard from "./pages/DcDashboard";
import PdDashboard from "./pages/PdDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AcDashboard from "./pages/AcDashboard";
import Form from "./pages/Form";
import PrevOutlines from "./pages/PrevOutlines";
import EditOutline from "./pages/EditOutline";
import Template from "./pages/Template";
import Status from "./pages/Status";
import ReviewerStatus from './pages/ReviewerStatus';
import Feedback from './pages/Feedback';
import Feedback2 from './pages/Feedback2';
import Feedback3 from './pages/Feedback3';



export default function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login-page" element={<Login />} />
          <Route exact path="/inst-dashboard" element={<InstDashboard />} />
          <Route exact path="/dc-dashboard" element={<DcDashboard />} />
          <Route exact path="/pd-dashboard" element={<PdDashboard />} />
          <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
          <Route exact path="/ac-dashboard" element={<AcDashboard />} />          
          <Route exact path="/prevoutlines" element={<PrevOutlines />} />          
          <Route exact path="/editoutline" element={<EditOutline />} />       
          <Route exact path="/Form" element={<Form />} />   
          <Route exact path="/template" element={<Template />} />   
          <Route exact path="/status" element={<Status />} />
          <Route exact path="/reviewer-dashboard" element={<ReviewerStatus />} />
          <Route exact path="/feedback" element={<Feedback />} />
          <Route exact path="/feedback2" element={<Feedback2 />} />
          <Route exact path="/feedback3" element={<Feedback3 />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}