import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import api from '../api';

const ProfileUpdate = () => {
  const { profile, loading, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setBio(profile.bio || '');
    }
  }, [profile]);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      if (name) formData.append('name', name);
      if (bio) formData.append('bio', bio);
      if (profileImage) formData.append('profile_image', profileImage);

      await api.patch('accounts/profile/me/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Refresh user details by mimicking a quiet reload. Wait, we can just navigate to profile and let it re-fetch on mount, but AuthContext caches it.
      // Easiest is to reload the window, or just navigate to profile.
      window.location.href = '/profile';
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-xl eyebrow">Loading...</div>;
  if (!profile) return <Navigate to="/login" />;

  return (
    <div className="w-full pb-xl">
      <div className="color-block-cream text-center flex flex-col items-center justify-center">
        <h1 className="display-lg mb-xs text-ink">Edit Profile</h1>
        <p className="eyebrow opacity-80 text-ink">Update your public information</p>
      </div>

      <div className="max-w-[600px] mx-auto px-lg mt-lg">
        {error && <p className="text-accent-magenta body-sm mb-md text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="flex flex-col space-y-md">
          <div>
            <label className="body-sm font-medium mb-xs block text-ink">Name</label>
            <input 
              type="text" 
              className="text-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your display name"
            />
          </div>
          <div>
            <label className="body-sm font-medium mb-xs block text-ink">Bio</label>
            <textarea 
              className="text-input min-h-[100px]"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
            ></textarea>
          </div>
          <div>
            <label className="body-sm font-medium mb-xs block text-ink">Profile Image</label>
            <input 
              type="file" 
              accept="image/*"
              className="text-input"
              onChange={handleImageChange}
            />
            <p className="caption opacity-60 mt-xs">Upload a new image to replace your current one.</p>
          </div>
          
          <div className="flex space-x-sm pt-md">
            <button 
              type="submit" 
              className="btn-primary w-full"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/profile')} 
              className="btn-secondary w-full"
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
