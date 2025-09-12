import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message); // Show real error: "Invalid email or password"
    }
    if (isSuccess || user) {
      navigate('/dashboard'); // Navigate after successful login
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
    const userData = { email, password };
    dispatch(login(userData)); // Dispatch the REAL login action
  };

  return (
    <Card className="w-full max-w-md">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-light-text">Welcome Back</h1>
        <p className="text-secondary-text mt-2">Sign in to continue to HarvestHub.</p>
      </div>
      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <Input
          id="email" name="email" type="email" placeholder="Email Address"
          value={email} onChange={onChange} required
        />
        <Input
          id="password" name="password" type="password" placeholder="Password"
          value={password} onChange={onChange} required
        />
        <Button type="submit" isLoading={isLoading}>
          Sign In
        </Button>
      </form>
      <p className="text-center mt-6 text-secondary-text">
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-light-text hover:underline">
          Sign Up
        </Link>
      </p>
    </Card>
  );
};

export default Login;