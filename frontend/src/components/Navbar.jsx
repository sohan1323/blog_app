import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-canvas border-b border-hairline sticky top-0 z-50 h-[56px] flex items-center">
      <div className="max-w-[1280px] w-full mx-auto px-lg flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="font-sans font-bold text-ink text-[20px] tracking-tight">
          B1naryB00k
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-lg">
          {user ? (
            <>
              <Link to="/post/new" className="body-sm font-medium text-ink hover:opacity-70 transition-opacity">Write</Link>
              <Link to="/" className="body-sm font-medium text-ink hover:opacity-70 transition-opacity">Feed</Link>
              <Link to="/profile" className="body-sm font-medium text-ink hover:opacity-70 transition-opacity">Profile</Link>
              <button onClick={logout} className="btn-primary ml-sm text-[14px] py-[6px] px-md">Log Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="body-sm font-medium text-ink hover:opacity-70 transition-opacity">Log in</Link>
              <Link to="/register" className="btn-primary ml-sm text-[14px] py-[6px] px-md">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden p-xs" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} color="#000" /> : <Menu size={24} color="#000" />}
        </button>

      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="absolute top-[56px] left-0 w-full bg-canvas border-b border-hairline flex flex-col p-lg space-y-md md:hidden shadow-sm">
          {user ? (
            <>
              <Link to="/post/new" onClick={() => setIsOpen(false)} className="body-md text-ink font-medium hover:opacity-70">Write</Link>
              <Link to="/" onClick={() => setIsOpen(false)} className="body-md text-ink font-medium hover:opacity-70">Feed</Link>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="body-md text-ink font-medium hover:opacity-70">Profile</Link>
              <button onClick={() => { logout(); setIsOpen(false); }} className="btn-primary w-full mt-sm">Log Out</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="body-md text-ink font-medium hover:opacity-70">Log in</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary w-full mt-sm">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
