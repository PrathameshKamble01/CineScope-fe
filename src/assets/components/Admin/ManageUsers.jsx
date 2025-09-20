import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { allUsers, updateStatus } from '../../../services/userService';
import { useAuth } from '../../../context/AuthContext';
import LoadingSpinner from '../LoadingSpinner';

function ManageUsers() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentStatus, setCurrentStatus] = useState([]);
    const navigate = useNavigate(); // Hook for navigation
    const { accessToken } = useAuth();

    const handleBack = () => {
        console.log("User logged out");
        navigate("/admin");
    };

    useEffect(() => {
        if (!accessToken) return; // wait until token is available

        setLoading(true); // Start loading
        allUsers(accessToken)
            .then((data) => {
                const sortedData = data.sort((a, b) => a.id - b.id); // Sort by ID ascending
                setUsers(sortedData);
                console.log("User statuses:");
                sortedData.forEach(user => {
                    console.log(`ID: ${user.id}, Status: ${user.status}`);
                });
            })
            .catch((error) => {
                console.error("Error fetching Users", error);
            })
            .finally(() => setLoading(false)); // Stop loading
    }, [accessToken]);


    const handleStatusChange = async (id, changedStatus) => {
        try {
            if (!accessToken) return;

            console.log("id", id);
            console.log("newStatus", changedStatus);
            console.log("accesToken", accessToken);
            const updatedUser = await updateStatus(id, changedStatus, accessToken);
            console.log("inside handle status change", updatedUser);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, status: changedStatus } : user
                )
            );
        } catch (error) {
            console.error("Error updating user status:", error);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className='container mt-5'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-center">Manage Users</h1>
                <button className="btn btn-primary" onClick={() => navigate("/admin")}>
                    Back to Admin
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Movie Type</th>
                            <th>Subscription</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.movieTypes}
                                    </td>
                                    <td>{user.subscription}</td>
                                    <td>
                                        <select
                                            className="form-select"
                                            value={user.status}
                                            onChange={(e) =>
                                                handleStatusChange(user.id, e.target.value)
                                            }
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">InActive</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-muted">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageUsers