import { useState } from "react";
import Navbar from "../../components/navbar/Navbar"
import PasswordInput from "../../components/inputs/PasswordInput";
import { Link } from "react-router-dom";
import { emailValidation } from "../../utils/Helper";

const Signup = () => {

   const [name,setName] = useState("");
   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");
   const [error,setError] = useState("null");

   const handleSignUp =async (e) =>{
    
    e.preventDefault();


    if (!(name)) {
      setError("Please enter your name.");
      return; 
    }
    if (!emailValidation(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter a valid password.");
      return;
    }
    setError(null); 
     


   }


  return (
    <>
      <Navbar/> 

      <div  className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}> {/* Fixed the onSubmit event */}

            <h4 className="text-2xl mb-7">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
               value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)} 
            />
               <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

{error && <p className="text-red-700">{error}</p>}
            <button type="submit" className="btn-primary">Create Account</button>

            <p className="text-sm text-center mt-4 ">
              Already have account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                login
              </Link>
            </p>

            </form>
    </div>
    </div>
  </>
  );
}

export default Signup
