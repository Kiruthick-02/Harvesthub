import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from './authSlice';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'farmer',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
    if (isSuccess || user) {
      navigate('/dashboard');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Join <span className="text-emerald-500">HarvestHub</span> Today
      </h2>
      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        <div className="rounded-md shadow-sm space-y-4">
          <input name="name" type="text" required placeholder="Full Name" value={formData.name} onChange={onChange} className="input-style"/>
          <input name="email" type="email" required placeholder="Email Address" value={formData.email} onChange={onChange} className="input-style"/>
          <input name="password" type="password" required placeholder="Password" value={formData.password} onChange={onChange} className="input-style"/>
          <select name="role" value={formData.role} onChange={onChange} className="input-style bg-white">
            <option value="farmer">I am a Farmer</option>
            <option value="buyer">I am a Buyer</option>
          </select>
        </div>
        <div>
          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>
      </form>
    </div>
  );
};

// Add this to your index.css or a global css file for shared styles
/*
.input-style {
  @apply appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm;
}
.form-button {
  @apply group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-transform transform hover:scale-105 disabled:bg-emerald-300;
}
*/

export default SignupForm;