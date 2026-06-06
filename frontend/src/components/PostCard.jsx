import React from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';

const PostCard = ({ post }) => {
  return (
    <div className="bg-canvas border border-hairline rounded-lg p-lg w-full max-w-[600px] mx-auto mb-lg transition-transform hover:-translate-y-1 hover:shadow-md">
      {/* Author & Date */}
      <div className="flex items-center space-x-sm mb-md">
        {post.author.profile_image ? (
          <img src={post.author.profile_image} alt="Author" className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 bg-surface-soft rounded-full flex items-center justify-center font-mono font-medium text-ink">
            {(post.author.profile_name || post.author.username).charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex flex-col">
          <span className="body-sm font-medium text-ink">{post.author.profile_name || post.author.username}</span>
          <span className="caption text-ink opacity-60">
            {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <Link to={`/post/${post.slug}`}>
        <h2 className="headline mb-sm hover:underline decoration-1 underline-offset-4">{post.title}</h2>
        <p className="body-text text-ink mb-md line-clamp-3">
          {post.content}
        </p>
      </Link>

      {/* Media Preview */}
      {post.images && post.images.length > 0 && (
        <Link to={`/post/${post.slug}`}>
          <img 
            src={post.images[0].image} 
            alt="Post preview" 
            className="w-full h-48 object-cover rounded-md mb-md border border-hairline"
          />
        </Link>
      )}

      {/* Interactions */}
      <div className="flex items-center space-x-lg pt-xs border-t border-hairline-soft">
        <div className="flex items-center space-x-xs text-ink">
          <ThumbsUp size={18} />
          <span className="body-sm font-medium">{post.likes_count}</span>
        </div>
        <div className="flex items-center space-x-xs text-ink opacity-60">
          <ThumbsDown size={18} />
          <span className="body-sm font-medium">{post.dislikes_count}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
