import React from 'react';

const ProjectPostDetail = ({
  state,
  projectInfo,
  nowPost,
  setIsPostOpened,
  setIsPostUpdating,
  postDelete,
}) => {
  return (
    <div className="postBox">
      <div className="postTitleBox">{nowPost.postTitle}</div>
      <div className="postContentBox">{nowPost.postContent}</div>
      <div className="postWriterBox">{nowPost.postWriter}</div>
      <div className="postedDateBox">{nowPost.postedDate}</div>
      <button
        onClick={() => {
          if (state.email === nowPost.writerEmail) {
            setIsPostUpdating(true);
          } else {
            alert('작성자만 수정이 가능합니다.');
          }
        }}
      >
        수정
      </button>
      <button
        onClick={() => {
          if (
            state.email === nowPost.writerEmail ||
            state.email === projectInfo.email
          ) {
            if (window.confirm('정말 삭제하시겠습니까?')) {
              postDelete();
            } else {
              return;
            }
          } else {
            alert('작성자 또는 관리자만 삭제가 가능합니다.');
          }
        }}
      >
        삭제
      </button>
      <button
        onClick={() => {
          setIsPostOpened(false);
        }}
      >
        목록으로 돌아가기
      </button>
    </div>
  );
};

export default ProjectPostDetail;
