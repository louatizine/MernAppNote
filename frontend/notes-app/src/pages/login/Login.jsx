import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import PasswordInput from "../../components/inputs/PasswordInput";
import { useState } from 'react';
import { emailValidation } from "../../utils/Helper";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); 

        // Validate email and password
        if (!emailValidation(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter a valid password.");
            return;
        }

        setError(null);
        try {
            // Send login request to the server
            const response = await axios.post(`${BASE_URL}/login`, {
                email: email,
                password: password
            });

            // Check for access token in response
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Login error:", error); // Log the error for debugging
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An Unexpected Error");
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white px-7 py-10 shadow-lg">
                    <form onSubmit={handleLogin}>
                        <h4 className="text-2xl mb-7 text-gray-800">Login</h4>
                        <input
                            type="text"
                            placeholder="Email"
                            className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="text-red-700 mt-2">{error}</p>}
                        <button type="submit" className="btn-primary">Login</button>
                        <p className="text-sm text-center mt-4">
                            Not registered yet?{" "}
                            <Link to="/signup" className="font-medium text-blue-500 underline hover:text-blue-700">
                                Create Account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
