import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllCategories } from '../../../services/categoryService';
import { signin, signup } from '../../../services/authService';
import EyeIcon from '../../icons/eye.svg?react';
import EyeSlashIcon from '../../icons/eye-slash.svg?react';


function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        subscription: "no",
        movieTypes: [],
    });

    const [error, setError] = useState("");
    const [genres, setGenres] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate(); // Initialize the navigate function

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        getAllCategories()
            .then(setGenres)
            .catch((error) => {
                console.error("Error fetching movie types", error);
            })
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubscriptionChange = (e) => {
        setFormData({
            ...formData,
            subscription: e.target.value,
        });
    };

    const handleMovieTypesChange = (e) => {
        const { value, checked } = e.target;

        setFormData((prevFormData) => {
            let updatedMovieTypesArray = Array.isArray(prevFormData.movieTypes)
                ? [...prevFormData.movieTypes]
                : prevFormData.movieTypes
                    ? prevFormData.movieTypes.split(",") // If it's a string, convert to array
                    : [];

            if (checked) {
                if (!updatedMovieTypesArray.includes(value)) {
                    updatedMovieTypesArray.push(value);
                }
            } else {
                updatedMovieTypesArray = updatedMovieTypesArray.filter((id) => id !== value);
            }

            return {
                ...prevFormData,
                movieTypes: updatedMovieTypesArray.length > 0 ? updatedMovieTypesArray.join(",") : "",
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            formData.movieTypes.length === 0
        ) {
            setError("All fields are required, and at least one movie type must be selected!");
            return;
        }

        try {
            await signup(formData);
            alert("Registered successfully");
            navigate("/signin");
        } catch (error) {
            console.error(error);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="text-center">CineScope</h1>
                <button className="btn btn-primary" onClick={() => navigate("/signin")}>
                    Signin
                </button>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="container my-2 bg-dark rounded p-5">
                        {/* <h1 className="text-center mb-4 text-primary">CineScope</h1> */}

                        <h2 className="mb-4 text-center text-primary">Sign Up</h2>

                        {error && <div className="alert alert-danger text-light">{error}</div>}

                        <form className="py-2 px-3 container" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label text-light">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label text-light">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label text-light">Password</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
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

                            <div className="mb-3">
                                <p className='text-light'>Do you have a subscription?</p>
                                <label className="form-check-label me-3 text-light">
                                    <input
                                        type="radio"
                                        name="subscription"
                                        value="yes"
                                        checked={formData.subscription === "yes"}
                                        onChange={handleSubscriptionChange}
                                        className="form-check-input"
                                    />
                                    Yes
                                </label>
                                <label className="form-check-label text-light">
                                    <input
                                        type="radio"
                                        name="subscription"
                                        value="no"
                                        checked={formData.subscription === "no"}
                                        onChange={handleSubscriptionChange}
                                        className="form-check-input"
                                    />
                                    No
                                </label>
                            </div>

                            <div className="mb-3">
                                <p className="text-light">Movie types you like:</p>
                                {genres.length > 0 ? (
                                    genres.map((genre) => (
                                        <label key={genre.id} className="form-check-label me-3 text-light">
                                            <input
                                                type="checkbox"
                                                value={genre.id}
                                                checked={formData.movieTypes.includes(genre.id)}
                                                onChange={handleMovieTypesChange}
                                                className="form-check-input mx-2"
                                            />
                                            {genre.type}
                                        </label>
                                    ))
                                ) : (
                                    <p className="text-light">Loading movie types...</p>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary w-100 ">Sign Up</button>
                        </form>

                        <p className="text-center text-light">
                            Already have an account? <Link to="/signin">Signin</Link>
                        </p>
                    </div>
                </div>
                <div className="col-md-6"></div>
            </div>
        </div>
    )
}

export default Signup