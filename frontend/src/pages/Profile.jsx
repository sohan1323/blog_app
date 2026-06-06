import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Navigate, Link } from 'react-router-dom';

const Profile = () => {
  const { profile, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center py-xl eyebrow">Loading...</div>;
  if (!profile) return <Navigate to="/login" />;

  return (
    <div className="w-full pb-xl">
      <div className="color-block-navy text-center flex flex-col items-center justify-center">
        {profile.profile_image ? (
          <img src={profile.profile_image} alt="Profile" className="w-24 h-24 rounded-full mb-md object-cover border-2 border-hairline" />
        ) : (
          <div className="w-24 h-24 bg-surface-soft rounded-full mb-md flex items-center justify-center text-ink font-mono text-[32px] border-2 border-hairline">
            {profile.user.username.charAt(0).toUpperCase()}
          </div>
        )}
        <h1 className="display-lg mb-xs text-inverse-ink">{profile.name || profile.user.username}</h1>
        <p className="eyebrow opacity-80 text-inverse-ink mb-md">{profile.user.email}</p>
        <Link to="/profile/edit" className="btn-secondary text-[16px] md:text-[16px]">Edit Profile</Link>
      </div>

      <div className="max-w-[800px] mx-auto px-lg mt-lg">
        <h2 className="headline mb-md">About Me</h2>
        <p className="body-text text-ink bg-surface-soft p-lg rounded-md border border-hairline shadow-sm">
          {profile.bio || "No bio added yet."}
        </p>
      </div>
    </div>
  );
};

export default Profile;
