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
import OwnerPropertiesPage from './pages/owner/OwnerPropertiesPage';
import PropertyEditViewPage from './pages/owner/PropertyEditViewPage';
import AnalyticsDashboard from './pages/admin/AnalyticsDashboard';
import UserManagement from './pages/admin/UserManagement';
import PropertyManagement from './pages/admin/PropertyManagement';
import LocationManagement from './pages/admin/LocationManagement';
import BlogManagement from './pages/admin/BlogManagementPage';
import BlogDetails from './pages/admin/BlogDetails';
import BlogCreate from './pages/admin/BlogCreate';
import BlogEditPage from './pages/admin/BlogEdit';

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
      <Route path="/owner/dashboard" element={<OwnerPropertiesPage />} />
      <Route path="/owner/properties" element={<OwnerPropertiesPage />} />
      <Route path="/owner/properties/:id" element={<PropertyEditViewPage />} />
      <Route path="/admin" element={<AnalyticsDashboard />} />
      <Route path="/admin/dashboard" element={<AnalyticsDashboard />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/properties" element={<PropertyManagement />} />
      <Route path="/admin/locations" element={<LocationManagement />} />
      <Route path="/admin/blogs" element={<BlogManagement />} />
      <Route path="/admin/blogs/view/:id" element={<BlogDetails />} />
      <Route path="/admin/blogs/edit/:id" element={<BlogEditPage />} />
      <Route path="/admin/blogs/new" element={<BlogCreate />} />
    </Routes>
  </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
