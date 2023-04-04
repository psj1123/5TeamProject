import React from 'react';

const ProjectPostList = ({ idx, post, postOpen }) => {
  const openThisPost = (e) => {
    postOpen(e);
  };

  return (
    <div className={idx === 0 ? 'postList firstPostList' : 'postList'}>
      <div className="postListLeft">
        <div>{post.postnum}</div>
      </div>

      <div className="postListCenter">
        <div id={post.postnum} onClick={openThisPost}>
          {post.posttitle}
        </div>
      </div>

      <div className="postListRight">
        <div>{post.posteddate}</div>
      </div>
    </div>
  );
};

export default ProjectPostList;
