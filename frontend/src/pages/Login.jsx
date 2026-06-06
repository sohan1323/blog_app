import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-lg py-xl">
      <div className="w-full max-w-[400px] bg-canvas border border-hairline p-lg md:p-xl rounded-lg">
        <h1 className="headline mb-sm text-center">Log in</h1>
        <p className="body-sm text-center opacity-60 mb-lg">
          Welcome back to the platform.
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
            Log in
          </button>
        </form>
        
        <p className="body-sm text-center mt-lg">
          Don't have an account? <Link to="/register" className="font-medium underline hover:text-primary">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
