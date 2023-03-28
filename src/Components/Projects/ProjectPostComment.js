import React, { useState, useRef } from 'react';
import ProjectPostReple from './ProjectPostReple';

const ProjectPostComment = ({
  state,
  projectInfo,
  comment,
  updateComment,
  deleteComment,
}) => {
  const [commentUpdate, setCommentUpdate] = useState(false);
  const [reples, setReples] = useState();
  const [repleOpen, setRepleOpen] = useState(false);

  const commentUpdateRef = useRef();

  const updateCommentBtn = () => {
    const value = commentUpdateRef.current.value;
    updateComment(comment.commentnum, value);
  };

  const deleteCommentBtn = () => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      deleteComment(comment.commentnum);
    } else {
      return;
    }
  };

  return (
    <div className="commentBox">
      <div className="commentWriter">{comment.nickname}</div>

      {commentUpdate ? (
        <div className="commentUpdateBox">
          <div className="commentUpdate">
            <input
              type="text"
              maxLength="200"
              defaultValue={comment.commentcontent}
              ref={commentUpdateRef}
            />
          </div>
          <div
            className="commentUpdateBtn"
            onClick={async () => {
              await updateCommentBtn();
              await setCommentUpdate(false);
            }}
          >
            수정
          </div>
        </div>
      ) : (
        <div className="commentContent">{comment.commentcontent}</div>
      )}

      <div className="repleBtnAndOthersBox">
        <div
          className="repleBtnBox"
          onClick={async (e) => {
            (await repleOpen) ? setRepleOpen(false) : setRepleOpen(true);
            (await repleOpen)
              ? (e.target.innerText = '답글 ▼')
              : (e.target.innerText = '답글 ▲');
          }}
        >
          답글 ▼
        </div>
        <div className="OthersBox">
          {comment.cowriteremail === state.email ? (
            <>
              <div
                className="updateComment"
                onClick={() => {
                  commentUpdate
                    ? setCommentUpdate(false)
                    : setCommentUpdate(true);
                }}
              >
                수정
              </div>
              <div className="deleteComment" onClick={deleteCommentBtn}>
                삭제
              </div>
            </>
          ) : comment.cowriteremail === projectInfo.creatoremail ? (
            <>
              <div className="deleteComment" onClick={deleteCommentBtn}>
                삭제
              </div>
            </>
          ) : (
            <></>
          )}
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
