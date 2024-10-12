import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import PasswordInput from "../../components/inputs/PasswordInput";
import { useState } from 'react'; // No need to import React directly in React 17+
import { emailValidation } from "../../utils/Helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Set initial error to null

  const handleLogin = async (e) => {
    e.preventDefault(); 

    if (!emailValidation(email)) {
      setError("Please enter a valid email address.");
      return;
    }


    if (!password) {
      setError("Please enter a valid password.");
      return;
    }
    setError(null); // Clear the error on successful validation
  };

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}> {/* Fixed the onSubmit event */}

            <h4 className="text-2xl mb-7">Login</h4>
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
            <button type="submit" className="btn-primary">Login</button>

            <p className="text-sm text-center mt-4 ">
              Not registered yet?{" "}
              <Link to="/signup" className="font-medium text-primary underline">
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
