import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { ThumbsUp, ThumbsDown, DownloadCloud, Edit3, Trash2 } from 'lucide-react';
import { AuthContext } from '../AuthContext';

const PostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`posts/${slug}/`);
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching post", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const handleLike = async () => {
    try {
      const res = await api.post(`interact/post/${slug}/like/`);
      setPost({ 
        ...post, 
        likes_count: res.data.likes_count !== undefined ? res.data.likes_count : post.likes_count, 
        dislikes_count: res.data.dislikes_count !== undefined ? res.data.dislikes_count : post.dislikes_count 
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await api.post(`interact/post/${slug}/dislike/`);
      setPost({ 
        ...post, 
        likes_count: res.data.likes_count !== undefined ? res.data.likes_count : post.likes_count, 
        dislikes_count: res.data.dislikes_count !== undefined ? res.data.dislikes_count : post.dislikes_count 
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      try {
        await api.delete(`posts/${slug}/`);
        navigate('/');
      } catch (err) {
        console.error(err);
        alert("Failed to delete post.");
      }
    }
  };

  if (loading) return <div className="text-center py-xl eyebrow">Loading...</div>;
  if (!post) return <div className="text-center py-xl eyebrow">Post not found</div>;

  return (
    <div className="w-full pb-xl">
      <div className="color-block-lime text-center flex flex-col items-center justify-center">
        <h1 className="display-lg mb-md max-w-[800px] px-lg">{post.title}</h1>
        <div className="flex items-center space-x-sm opacity-80">
          {post.author?.profile_image ? (
            <img src={post.author.profile_image} alt="Author" className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <div className="w-8 h-8 bg-canvas text-ink rounded-full flex items-center justify-center font-mono text-[14px]">
              {(post.author?.profile_name || post.author?.username || '?').charAt(0).toUpperCase()}
            </div>
          )}
          <span className="font-mono uppercase tracking-[0.54px]">{post.author?.profile_name || post.author?.username}</span>
          <span>•</span>
          <span className="font-mono tracking-[0.54px]">{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="max-w-[800px] mx-auto px-lg mt-lg">
        {/* Render all attached images */}
        {post.images && post.images.length > 0 && (
          <div className="flex flex-col space-y-md mb-xl">
            {post.images.map((img) => (
              <img 
                key={img.id} 
                src={img.image} 
                alt={img.caption || "Post Image"} 
                className="w-full max-h-[400px] md:max-h-[600px] rounded-lg border border-hairline object-contain bg-surface-soft" 
              />
            ))}
          </div>
        )}
        
        <div className="body-lg text-ink whitespace-pre-wrap mb-xl leading-relaxed">
          {post.content}
        </div>
        
        {/* Render attached files */}
        {post.files && post.files.length > 0 && (
          <div className="mb-xl border border-hairline rounded-md p-lg bg-surface-soft">
            <h3 className="eyebrow mb-md text-ink">Attachments</h3>
            <div className="flex flex-col space-y-xs">
              {post.files.map((file) => (
                <a 
                  key={file.id} 
                  href={file.file} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-sm p-sm bg-canvas border border-hairline-soft rounded-sm hover:border-primary transition-colors"
                >
                  <DownloadCloud size={20} className="text-ink opacity-60" />
                  <div className="flex flex-col flex-1 truncate">
                    <span className="body-sm font-medium truncate">{file.file_name}</span>
                    <span className="caption opacity-60">{(file.file_size / 1024).toFixed(1)} KB</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex items-center justify-between border-t border-hairline pt-md">
          <div className="flex items-center space-x-lg">
            <button onClick={handleLike} className="flex items-center space-x-xs text-ink hover:text-primary transition-colors">
              <ThumbsUp size={20} />
              <span className="body-sm font-medium">{post.likes_count}</span>
            </button>
            <button onClick={handleDislike} className="flex items-center space-x-xs text-ink hover:text-primary transition-colors">
              <ThumbsDown size={20} />
              <span className="body-sm font-medium">{post.dislikes_count}</span>
            </button>
          </div>
          
          {user && user.username === post.author?.username && (
            <div className="flex items-center space-x-sm">
              <Link to={`/post/${slug}/edit`} className="btn-secondary py-xs px-sm flex items-center space-x-xs">
                <Edit3 size={16} />
                <span>Edit</span>
              </Link>
              <button onClick={handleDelete} className="btn-primary bg-accent-magenta hover:bg-ink py-xs px-sm flex items-center space-x-xs">
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
