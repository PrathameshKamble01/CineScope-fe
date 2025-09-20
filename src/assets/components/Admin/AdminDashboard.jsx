import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';

function AdminDashboard() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        // // Perform logout logic here (e.g., clearing auth token, redirecting)
        // console.log("User logged out");
        // navigate("/signin"); // Redirect to login page
        // sessionStorage.clear()
        logout();
    };

    return (
        <div className="container vh-100 d-flex flex-column">
            {/* Top Navbar */}
            <div className="d-flex justify-content-between align-items-center py-3">
                <h2 className="mb-0">Admin Dashboard</h2>
                <button className="btn btn-danger" onClick={handleLogout}>
                    🔒 Logout
                </button>
            </div>

            {/* Dashboard Buttons */}
            <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                <div className="row g-3 text-center w-75">
                    {/* <div className="col-md-3">
                        <button className="btn btn-primary w-100" onClick={() => navigate("/movie-list")}>
                            🎬 Filter Movies
                        </button>
                    </div> */}
                    <div className="col-md-3">
                        <button className="btn btn-success w-100" onClick={() => navigate("/manage-users")}>
                            👥 Manage Users
                        </button>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-warning w-100" onClick={() => navigate("/update")}>
                            🎥 Manage Movies
                        </button>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-danger w-100" onClick={() => navigate("/movie-form")}>
                            ➕ Add Movies
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard