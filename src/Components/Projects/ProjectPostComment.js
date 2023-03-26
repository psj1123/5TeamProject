import React, { useState } from 'react';
import ProjectPostReple from './ProjectPostReple';

const ProjectPostComment = ({ num, content, writer, deleteComment }) => {
  const [commentUpdate, setCommentUpdate] = useState(false);
  const [reples, setReples] = useState();
  const [repleOpen, setRepleOpen] = useState(false);

  const deleteCommentBtn = () => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      deleteComment(num);
    } else {
      return;
    }
  };

  return (
    <div className="commentBox">
      <div className="commentWriter">{writer}작성자</div>

      {commentUpdate ? (
        <div className="commentUpdateBox">
          <div className="commentUpdate">
            <input type="text" maxLength="200" defaultValue={content} />
          </div>
          <div className="commentUpdateBtn">수정</div>
        </div>
      ) : (
        <div className="commentContent">{content}댓글내용</div>
      )}

      <div className="repleBtnAndOthersBox">
        <div
          className="repleBtnBox"
          onClick={async () => {
            (await repleOpen) ? setRepleOpen(false) : setRepleOpen(true);
          }}
        >
          답글보기▼
        </div>
        <div className="OthersBox">
          <div
            className="updateComment"
            onClick={() => {
              commentUpdate ? setCommentUpdate(false) : setCommentUpdate(true);
            }}
          >
            수정
          </div>
          <div className="deleteComment" onClick={deleteCommentBtn}>
            삭제
          </div>
        </div>
      </div>
      {repleOpen ? (
        <div className="repleViewBox">
          <ProjectPostReple />
          <div className="repleWriteBox">
            <div className="repleWrite">
              <input type="text" maxLength="200" />
            </div>
            <div className="repleWriteBtn">답글 작성</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProjectPostComment;
