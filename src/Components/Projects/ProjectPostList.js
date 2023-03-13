import React from 'react';

const ProjectPostList = ({ post }) => {
  return (
    <li className="postList">
      <div className="postListLeftbox">
        <div>{post.postnum}</div>
        <div>{post.posttitle}</div>
      </div>
      <div className="postListRightbox">
        <div>{post.postdate}</div>
      </div>
    </li>
  );
};

export default ProjectPostList;
