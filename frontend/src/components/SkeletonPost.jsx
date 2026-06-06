import React from 'react';

const SkeletonPost = () => {
  return (
    <div className="bg-canvas border border-hairline rounded-lg p-lg animate-pulse w-full max-w-[600px] mx-auto mb-lg">
      <div className="flex items-center space-x-sm mb-md">
        <div className="w-10 h-10 bg-hairline rounded-full"></div>
        <div className="flex flex-col space-y-xxs">
          <div className="w-24 h-4 bg-hairline rounded-xs"></div>
          <div className="w-16 h-3 bg-hairline rounded-xs"></div>
        </div>
      </div>
      
      <div className="w-3/4 h-6 bg-hairline rounded-xs mb-sm"></div>
      <div className="w-full h-4 bg-hairline rounded-xs mb-xxs"></div>
      <div className="w-full h-4 bg-hairline rounded-xs mb-xxs"></div>
      <div className="w-5/6 h-4 bg-hairline rounded-xs mb-md"></div>

      <div className="w-full h-48 bg-hairline rounded-md mb-md"></div>

      <div className="flex space-x-md">
        <div className="w-12 h-6 bg-hairline rounded-pill"></div>
        <div className="w-12 h-6 bg-hairline rounded-pill"></div>
      </div>
    </div>
  );
};

export default SkeletonPost;
