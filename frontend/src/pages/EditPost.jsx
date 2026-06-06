import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import api from '../api';
import { Image as ImageIcon, File as FileIcon, X } from 'lucide-react';

const EditPost = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const { slug } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('published');
  
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`posts/${slug}/`);
        // Check if the current user is the author
        if (res.data.author.username !== user.username) {
          navigate(`/post/${slug}`);
          return;
        }
        setTitle(res.data.title);
        setContent(res.data.content);
        setStatus(res.data.status);
      } catch (err) {
        console.error(err);
        setError('Failed to load post.');
      } finally {
        setFetching(false);
      }
    };

    if (user && !loading) {
      fetchPost();
    }
  }, [slug, user, loading, navigate]);

  const handleImageChange = (e) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('status', status);
      
      images.forEach((image) => {
        formData.append('images', image);
      });
      
      files.forEach((file) => {
        formData.append('files', file);
      });

      const res = await api.patch(`posts/${slug}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      navigate(`/post/${res.data.slug}`);
    } catch (err) {
      console.error(err);
      setError('Failed to update post. Please check your inputs.');
      setSaving(false);
    }
  };

  if (loading || fetching) return <div className="text-center py-xl eyebrow">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="w-full pb-xl">
      <div className="color-block-cream text-center flex flex-col items-center justify-center">
        <h1 className="display-lg mb-xs text-ink">Edit Story</h1>
        <p className="eyebrow opacity-80 text-ink">Make your changes</p>
      </div>

      <div className="max-w-[800px] mx-auto px-lg mt-lg">
        {error && <p className="text-accent-magenta body-sm mb-md text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="flex flex-col space-y-md">
          <div>
            <label className="body-sm font-medium mb-xs block text-ink">Title</label>
            <input 
              type="text" 
              className="text-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post Title"
              required
            />
          </div>
          
          <div>
            <label className="body-sm font-medium mb-xs block text-ink">Content</label>
            <textarea 
              className="text-input min-h-[300px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tell your story..."
              required
            ></textarea>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-md space-y-md md:space-y-0">
            {/* Images Upload */}
            <div className="flex-1 border border-hairline p-md rounded-md bg-canvas">
              <p className="caption text-ink opacity-60 mb-sm">Note: Uploading new images will append them to the post.</p>
              <label className="flex items-center space-x-xs body-sm font-medium mb-sm text-ink cursor-pointer hover:text-primary">
                <ImageIcon size={20} />
                <span>Append Images</span>
                <input 
                  type="file" 
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              
              {images.length > 0 && (
                <div className="flex flex-col space-y-xs">
                  {images.map((img, index) => (
                    <div key={index} className="flex items-center justify-between bg-surface-soft p-xs rounded-sm border border-hairline-soft">
                      <span className="caption truncate max-w-[200px]">{img.name}</span>
                      <button type="button" onClick={() => removeImage(index)} className="text-ink hover:text-accent-magenta">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Files Upload */}
            <div className="flex-1 border border-hairline p-md rounded-md bg-canvas">
              <p className="caption text-ink opacity-60 mb-sm">Note: Uploading new files will append them to the post.</p>
              <label className="flex items-center space-x-xs body-sm font-medium mb-sm text-ink cursor-pointer hover:text-primary">
                <FileIcon size={20} />
                <span>Append Files</span>
                <input 
                  type="file" 
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              
              {files.length > 0 && (
                <div className="flex flex-col space-y-xs">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-surface-soft p-xs rounded-sm border border-hairline-soft">
                      <span className="caption truncate max-w-[200px]">{file.name}</span>
                      <button type="button" onClick={() => removeFile(index)} className="text-ink hover:text-accent-magenta">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="body-sm font-medium mb-xs block text-ink">Status</label>
            <select 
              className="text-input cursor-pointer"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          
          <div className="pt-md flex justify-end space-x-sm">
            <button 
              type="button" 
              onClick={() => navigate(`/post/${slug}`)}
              className="btn-secondary"
              disabled={saving}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
