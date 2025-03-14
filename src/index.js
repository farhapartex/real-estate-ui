import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import PropertyDetailsPage from './pages/ProductDetails';
import BlogListPage from './pages/BlogPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import PropertyListingPage from './pages/PropertyListPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignUp';
import ProfilePage from './pages/user/ProfilePage';
import TermsConditionsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicy';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/property/:id" element={<PropertyDetailsPage />} />
      <Route path="/properties" element={<PropertyListingPage />} />
      <Route path="/blogs" element={<BlogListPage />} />
      <Route path="/blogs/:slug" element={<BlogDetailsPage />} />
      <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
    </Routes>
  </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
