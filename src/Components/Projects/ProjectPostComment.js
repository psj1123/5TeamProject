import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ProjectPostReple from './ProjectPostReple';

const ProjectPostComment = ({
  projectInfo,
  nowPost,
  comment,
  updateComment,
  deleteComment,
}) => {
  const loginEmail = window.sessionStorage.getItem('email');

  const [commentUpdate, setCommentUpdate] = useState(false);
  const [repleOpen, setRepleOpen] = useState(false);
  const [reples, setReples] = useState([]);

  const commentUpdateRef = useRef();
  const repleWriteRef = useRef();

  const updateCommentBtn_Bottom = comment.commentnum + 'Btn';

  useEffect(() => {
    loadReples();
  }, []);

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

  const loadReples = () => {
    axios
      .post('/loadReples', {
        code: projectInfo.code,
        commentnum: comment.commentnum,
      })
      .then((res) => {
        setReples(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const writeReple = () => {
    axios
      .post('/writeReple', {
        code: projectInfo.code,
        postnum: nowPost.postNum,
        commentnum: comment.commentnum,
        replecontent: repleWriteRef.current.value,
        rewriteremail: loginEmail,
      })
      .then((res) => {
        if (res.data !== 1) {
          alert('답글 작성에 실패했습니다');
        } else {
          repleWriteRef.current.value = '';
          loadReples();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateReple = (num, value) => {
    axios
      .post('/updateReple', {
        code: projectInfo.code,
        replenum: num,
        replecontent: value,
      })
      .then((res) => {
        if (res.data !== 1) {
          alert('답글 수정에 실패했습니다');
        } else {
          loadReples();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteReple = (num) => {
    axios
      .post('/deleteReple', {
        code: projectInfo.code,
        replenum: num,
      })
      .then((res) => {
        if (res.data !== 1) {
          alert('답글 삭제에 실패했습니다');
        } else {
          loadReples();
        }
      })
      .catch((err) => {
        console.error(err);
      });
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
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  updateCommentBtn();
                  await setCommentUpdate(false);
                  await (document.getElementById(
                    updateCommentBtn_Bottom
                  ).innerText = '수정');
                }
              }}
              ref={commentUpdateRef}
            />
          </div>
          <div
            className="commentUpdateBtn"
            onClick={async () => {
              updateCommentBtn();
              await setCommentUpdate(false);
              await (document.getElementById(
                updateCommentBtn_Bottom
              ).innerText = '수정');
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
            repleOpen ? setRepleOpen(false) : setRepleOpen(true);
            (await repleOpen)
              ? (e.target.innerText = '답글 ▼')
              : (e.target.innerText = '답글 ▲');
          }}
        >
          답글 ▼
        </div>
        <div className="OthersBox">
          {loginEmail === comment.cowriteremail ? (
            <>
              <div
                id={updateCommentBtn_Bottom}
                className="updateComment"
                onClick={async (e) => {
                  commentUpdate
                    ? setCommentUpdate(false)
                    : setCommentUpdate(true);
                  (await commentUpdate)
                    ? (e.target.innerText = '수정')
                    : (e.target.innerText = '취소');
                }}
              >
                수정
              </div>
              <div className="deleteComment" onClick={deleteCommentBtn}>
                삭제
              </div>
            </>
          ) : loginEmail === projectInfo.email ? (
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
          {reples[0] === undefined ? (
            <div>답글이 없습니다</div>
          ) : (
            reples.map((reple) => {
              return (
                <ProjectPostReple
                  key={reple.replenum}
                  projectInfo={projectInfo}
                  reple={reple}
                  updateReple={updateReple}
                  deleteReple={deleteReple}
                />
              );
            })
          )}

          <div className="repleWriteBox">
            <div className="repleWrite">
              <input
                type="text"
                maxLength="200"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    writeReple();
                  }
                }}
                ref={repleWriteRef}
              />
            </div>
            <div className="repleWriteBtn" onClick={writeReple}>
              답글 작성
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProjectPostComment;
