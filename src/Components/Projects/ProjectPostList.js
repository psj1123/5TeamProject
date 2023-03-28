import React from 'react';

const ProjectPostList = ({ post, postOpen }) => {
  const openThisPost = (e) => {
    postOpen(e);
  };

  return (
    <li className="postList">
      <div className="postListLeftbox">
        <div>{post.postnum}</div>
        <div id={post.postnum} onClick={openThisPost}>
          {post.posttitle}
        </div>
      </div>
      <div className="postListRightbox">
        <div>{post.posteddate}</div>
      </div>
    </li>
  );
};

export default ProjectPostList;
