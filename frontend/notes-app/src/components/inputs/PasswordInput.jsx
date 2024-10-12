import { useState } from 'react'; // No need to import React directly in React 17+
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'; 
import PropTypes from 'prop-types'; 

const PasswordInput = ({ value, onChange, placeholder }) => {
  
  const [isShowedPassword, setShowedPassword] = useState(false);

  const toggleShowedPassword = () => {
    setShowedPassword(!isShowedPassword);
  };
  
  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
        type={isShowedPassword ? "text" : "password"} // Toggle password visibility
      />
      {isShowedPassword ? (
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer"
          onClick={toggleShowedPassword}
        />
      ) : (
        <FaRegEye
          size={22}
          className="text-primary cursor-pointer"
          onClick={toggleShowedPassword}
        />
      )}
    </div>
  );
}

// Prop types validation
PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default PasswordInput;
