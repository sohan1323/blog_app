import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetail from './pages/PostDetail';
import Profile from './pages/Profile';
import ProfileUpdate from './pages/ProfileUpdate';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-canvas font-sans text-ink">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post/:slug" element={<PostDetail />} />
            <Route path="/post/:slug/edit" element={<EditPost />} />
            <Route path="/post/new" element={<CreatePost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileUpdate />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
