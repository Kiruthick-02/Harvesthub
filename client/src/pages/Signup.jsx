import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'farmer', // Default role, as required by your backend
  });
  const { name, email, password, role } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      alert(message); // Show the real error message (e.g., "User already exists")
    }
    if (isSuccess || user) {
      navigate('/dashboard'); // Navigate after successful registration
    }
    dispatch(reset()); // Reset the state (clears errors/success flags)
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, password, role };
    dispatch(register(userData)); // Dispatch the REAL register action
  };

  return (
    <Card className="w-full max-w-md">
      <h1 className="text-4xl font-bold text-center text-light-text">Create Account</h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <Input name="name" placeholder="Full Name" value={name} onChange={onChange} required />
        <Input name="email" type="email" placeholder="Email Address" value={email} onChange={onChange} required />
        <Input name="password" type="password" placeholder="Password" value={password} onChange={onChange} required />
        
        <div>
          <label className="block text-sm font-medium text-secondary-text mb-2">I am a:</label>
          <select
            name="role"
            value={role}
            onChange={onChange}
            className="w-full bg-dark-bg border-2 border-primary-green/30 rounded-lg px-4 py-3 text-light-text focus:outline-none focus:ring-2 focus:ring-primary-green"
          >
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>

        <Button type="submit" isLoading={isLoading}>
          Sign Up
        </Button>
      </form>
      <p className="text-center mt-6 text-secondary-text">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-light-text hover:underline">
          Sign In
        </Link>
      </p>
    </Card>
  );
};

export default Signup;