import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ProjectPostComment from './ProjectPostComment';

const ProjectPostDetail = ({
  projectInfo,
  nowPost,
  setIsPostOpened,
  setIsPostUpdating,
  postDelete,
}) => {
  const loginEmail = window.sessionStorage.getItem('email');

  const [commentOpen, setCommentOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const commentWriteRef = useRef();

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = () => {
    axios
      .post(`/loadComments`, {
        code: projectInfo.code,
        postnum: nowPost.postNum,
      })
      .then((res) => {
        const { data } = res;
        if (data === 0) {
          setComments([]);
        } else {
          setComments(data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const writeComment = () => {
    axios
      .post(`/writeComment`, {
        code: projectInfo.code,
        postnum: nowPost.postNum,
        commentcontent: commentWriteRef.current.value,
        cowriteremail: loginEmail,
      })
      .then((res) => {
        if (res.data === 0) {
          alert('댓글 작성에 실패했습니다');
        } else {
          commentWriteRef.current.value = '';
          loadComments();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateComment = (num, value) => {
    axios
      .post(`/updateComment`, {
        code: projectInfo.code,
        commentnum: num,
        content: value,
      })
      .then((res) => {
        loadComments();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteComment = (num) => {
    axios
      .post(`/deleteComment`, {
        code: projectInfo.code,
        commentnum: num,
      })
      .then((res) => {
        if (res.data === 0) {
          alert('댓글 삭제 실패');
        } else {
          loadComments();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="pjSectionMainBox">
        <div className="pjSectionMain">
          <div className="postTitleBox">
            <div>{nowPost.postTitle}</div>
          </div>

          <div className="postWirterAndDateBox">
            <div className="postWriterBox">
              <div>{nowPost.postWriter}</div>
            </div>
            <div className="postedDateBox">
              <div>{nowPost.postedDate}</div>
            </div>
          </div>

          <div className="postContentBox">
            <div>{nowPost.postContent}</div>
          </div>

          <div className="buttons">
            <div className="commentAndBackToListBox">
              <div
                className="commentBtn"
                onClick={async () => {
                  loadComments();
                  (await commentOpen)
                    ? setCommentOpen(false)
                    : setCommentOpen(true);
                }}
              >
                댓글
              </div>

              <div
                className="backToList"
                onClick={() => {
                  setIsPostOpened(false);
                }}
              >
                목록으로 돌아가기
              </div>
            </div>

            <div className="deleteAndUpdateBox">
              {nowPost.writerEmail === loginEmail ? (
                <>
                  <div
                    className="deletePost"
                    onClick={() => {
                      if (window.confirm('정말 삭제하시겠습니까?')) {
                        postDelete();
                      } else {
                        return;
                      }
                    }}
                  >
                    삭제
                  </div>

                  <div
                    className="updatePost"
                    onClick={() => {
                      setIsPostUpdating(true);
                    }}
                  >
                    수정
                  </div>
                </>
              ) : projectInfo.email === loginEmail ? (
                <>
                  <div
                    className="deletePost"
                    onClick={() => {
                      if (window.confirm('정말 삭제하시겠습니까?')) {
                        postDelete();
                      } else {
                        return;
                      }
                    }}
                  >
                    삭제
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      {commentOpen ? (
        <div className="commentViewBox">
          <div className="commentView">
            {comments[0] === undefined ? (
              <div>첫 댓글을 작성해보세요</div>
            ) : (
              comments.map((comment) => {
                return (
                  <ProjectPostComment
                    key={comment.commentnum}
                    projectInfo={projectInfo}
                    nowPost={nowPost}
                    comment={comment}
                    updateComment={updateComment}
                    deleteComment={deleteComment}
                  />
                );
              })
            )}
            <div className="commentWriteBox">
              <div className="commentWrite">
                <input
                  type="text"
                  maxLength="200"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      writeComment();
                    }
                  }}
                  ref={commentWriteRef}
                />
              </div>
              <div className="commentWriteBtn" onClick={writeComment}>
                댓글 작성
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProjectPostDetail;
