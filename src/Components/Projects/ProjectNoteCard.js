import React from 'react';

const NoteCard = ({ post, modalOpen }) => {
  return (
    <div className="noteCard">
      <div className="pin">#{post.postnum}</div>
      <div>
        <div className="noteTitle">{post.posttitle}</div>
        <div className="noteDescription">{post.postcontent}</div>
      </div>
      <div>
        <div className="noteWriter">{post.postwriter}</div>
        <div className="noteDate">{post.postdate}</div>
        <div id={post.postnum} className="noteOption" onClick={modalOpen}>
          자세히 보기
        </div>
      </div>
    </div>
  );
};

export default React.memo(NoteCard);
