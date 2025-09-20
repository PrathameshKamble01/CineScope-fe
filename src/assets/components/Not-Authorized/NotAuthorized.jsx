import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotAuthorized() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/signin");
    }, 3000); // Redirect after 3 seconds
  }, [navigate]);

  return (
    <div className="bg-warning min-vh-100 d-flex flex-column align-items-center justify-content-center text-center p-5">
      <h1 className="text-dark">You are not an authorized user...</h1>
      <h5 className="text-dark">Redirecting to login...</h5>
    </div>
  );
}

export default NotAuthorized;
