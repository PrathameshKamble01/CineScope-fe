import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext';
import { signin } from '../../../services/authService';
import EyeIcon from '../../icons/eye.svg?react';
import EyeSlashIcon from '../../icons/eye-slash.svg?react';


function Signin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // New state for error message
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     setErrorMessage("");

    //     try {
    //         const data = await signin({ email, password });
    //         console.log(data.jsonify)

    //         // Save accessToken in context (not localStorage)
    //         login(data.accessToken);
    //         console.log(data.accessToken)

    //         // Check if account is inactive
    //         if (data.status === "InActive") {
    //             setErrorMessage("Your account is inactive. Please contact the administrator.");
    //             return;
    //         }

    //         console.log("role", data.role);
    //         console.log("movie_type", data.movieTypes);

    //         // Save user-specific info (optional)
    //         sessionStorage.setItem("role", data.role);
    //         sessionStorage.setItem("movie_type", data.movieTypes);

    //         // Redirect based on user type
    //         if (data.role === "USER") {
    //             navigate("/not-authorized");
    //         } else if (data.role === "ADMIN") {
    //             navigate("/admin");
    //         } else {
    //             setErrorMessage("Unknown user type. Please contact support.");
    //         }

    //     } catch (error) {
    //         console.error("Login error:", error);
    //         if (error.response?.data?.message) {
    //             setErrorMessage(error.response.data.message);
    //             // setErrorMessage(error?.response?.data?.message || "Login failed");
    //         } else {
    //             setErrorMessage("Login failed. Please check your credentials and try again.");
    //         }
    //     }
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");

        try {
            const data = await signin({ email, password });

            // Save everything in AuthContext
            login(data.accessToken, data.role, data.movieTypes);
            console.log("access token:", data.accessToken)

            if (data.status?.toLowerCase() === "inactive") {
                setErrorMessage("Your account is inactive. Please contact the administrator.");
                return;
            }
            console.log("role", data.role);
            console.log("movie_type", data.movieTypes);

            const role = String(data.role).toUpperCase();
            console.log("Normalized role:", role, "type:", typeof data.role);

            // Redirect based on role
            if (role === "ADMIN") {
                console.log("Redirecting to /admin...");
                navigate("/admin");
            } else if (role === "USER") {
                console.log("Redirecting to /not-authorized...");
                navigate("/not-authorized");
            } else {
                console.log("Unknown role:", role);
                setErrorMessage("Unknown user type. Please contact support.");
            }

        } catch (error) {
            console.error("Login error:", error);
            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Login failed. Please check your credentials and try again.");
            }
        }
    };


    return (
        <div className='container mt-3'>
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="text-center">CineScope</h1>
                <button className="btn btn-primary" onClick={() => navigate("/signup")}>
                    Signup
                </button>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="container my-5 p-5 bg-dark rounded">
                        {/* <h1 className="text-center mb-4 text-primary">CineScope</h1> */}
                        <h2 className="mb-4 text-center text-primary">Signin</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label text-light" >Email:</label>
                                <input type="email" id="email" className='form-control' onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label text-light">Password:</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        className="form-control"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        style={{ paddingRight: '40px' }} // space for the icon
                                    />
                                    <span
                                        onClick={handleTogglePassword}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '10px',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                            color: 'gray'
                                        }}
                                    >
                                        {showPassword ? <EyeSlashIcon width={20} height={20} /> : <EyeIcon width={20} height={20} />}
                                    </span>
                                </div>
                            </div>
                            {errorMessage && (<div className="alert alert-danger" role="alert">{errorMessage}</div>)}

                            <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>

                        </form>
                        <p className="mt-3 text-center text-light">
                            Don't have an account? <Link to="/signup">Sign up</Link>
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    {/* Put Image here */}
                </div>
            </div>

        </div>

    )
}

export default Signin