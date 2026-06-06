import React, { useState, useEffect } from 'react';
import api from '../api';
import PostCard from '../components/PostCard';
import SkeletonPost from '../components/SkeletonPost';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('posts/');
        setPosts(res.data.results || res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full pb-xl">
      {/* Hero Section */}
      <div className="color-block-lilac text-center flex flex-col items-center justify-center">
        <h1 className="display-xl mb-md">Welcome to B1naryB00k.</h1>
        <p className="subhead max-w-[600px] mb-lg px-lg font-mono italic">
          "Decoding the digital world, one byte at a time."
        </p>
      </div>

      {/* Feed Section */}
      <div className="max-w-[1280px] mx-auto px-lg">
        <h2 className="eyebrow mb-xl text-center">Latest Stories</h2>
        
        <div className="flex flex-col items-center">
          {loading ? (
            <>
              <SkeletonPost />
              <SkeletonPost />
              <SkeletonPost />
            </>
          ) : (
            posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <p className="body-text text-ink opacity-60">No posts found.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
