import { useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Signin from './assets/components/Signin/Signin'
import Signup from './assets/components/Signup/Signup'
import { useAuth } from './context/AuthContext'
import NotAuthorized from './assets/components/Not-Authorized/NotAuthorized'
import AdminDashboard from './assets/components/Admin/AdminDashboard'
import ManageUsers from './assets/components/Admin/ManageUsers'


function PrivateRoute({ element, allowedForAdmin = false }) {
  const { accessToken, role, isLoading } = useAuth();
  // const role = sessionStorage.getItem("role"); // or move this to context too
  const location = useLocation();

  if (isLoading) {
    // show a spinner or loading screen while checking refresh token
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!accessToken) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  if (allowedForAdmin && role !== "ADMIN") {
    return <Navigate to="/not-authorized" />;
  }

  if (role === "USER" && location.pathname !== "/movie-list") {
    return <Navigate to="/not-authorized" />;
  }

  return element;
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/not-authorized" element={<NotAuthorized />} />
      <Route path="/admin" element={<PrivateRoute element={<AdminDashboard />} allowedForAdmin />} />
      <Route path="/manage-users" element={<PrivateRoute element={<ManageUsers />} allowedForAdmin />} />
    </Routes>
  )
}

export default App
