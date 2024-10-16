import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import PasswordInput from "../../components/inputs/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { emailValidation } from "../../utils/Helper";
import axios from "axios";
import { BASE_URL } from "../../utils/constants"; // Ensure BASE_URL is correctly imported

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validate inputs
    const trimmedName = name.trim();  // Trim leading/trailing spaces from the name
    const trimmedEmail = email.trim();  // Trim leading/trailing spaces from the email

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }
    if (!emailValidation(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a valid password.");
      return;
    }

    setError(null); // Clear any previous errors

    try {
      // Send signup request to the server
      const response = await axios.post(`${BASE_URL}/create-account`, {
        fullname: trimmedName,  // Use trimmed name here
        email: trimmedEmail,    // Use trimmed email
        password: password,     // Send the password as is
      });

      console.log("Response:", response); // Log the response for debugging

      // Handle successful response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard"); // Navigate to the dashboard
      }
    } catch (error) {
      console.error("Signup error:", error); // Log full error for debugging

      if (error.response) {
        console.log("Response data:", error.response.data); // Log full response error data
        setError(error.response.data.message || "An Unexpected Error occurred.");
      } else {
        setError("An Unexpected Error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Create Account</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-700">{error}</p>}
            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
