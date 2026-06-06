import React, { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('accounts/register/', { username, email, password });
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please check your inputs.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-lg py-xl">
      <div className="w-full max-w-[400px] bg-canvas border border-hairline p-lg md:p-xl rounded-lg">
        <h1 className="headline mb-sm text-center">Get started</h1>
        <p className="body-sm text-center opacity-60 mb-lg">
          Join for free today.
        </p>
        
        {error && <p className="text-accent-magenta body-sm mb-md text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="flex flex-col space-y-md">
          <div>
            <label className="body-sm font-medium mb-xs block">Username</label>
            <input 
              type="text" 
              className="text-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="body-sm font-medium mb-xs block">Email</label>
            <input 
              type="email" 
              className="text-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="body-sm font-medium mb-xs block">Password</label>
            <input 
              type="password" 
              className="text-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn-primary w-full mt-sm">
            Sign up
          </button>
        </form>
        
        <p className="body-sm text-center mt-lg">
          Already have an account? <Link to="/login" className="font-medium underline hover:text-primary">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
