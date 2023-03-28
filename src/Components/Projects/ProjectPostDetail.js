import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ProjectPostComment from './ProjectPostComment';

const ProjectPostDetail = ({
  state,
  projectInfo,
  nowPost,
  setIsPostOpened,
  setIsPostUpdating,
  postDelete,
}) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const commentWriteRef = useRef();

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = () => {
    axios
      .post(
        `/project/${projectInfo.code}/${nowPost.postCategory}/${nowPost.postNum}/loadComments`,
        {}
      )
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

  const addComment = () => {
    axios
      .post(
        `/project/${projectInfo.code}/${nowPost.postCategory}/${nowPost.postNum}/addComment`,
        {
          code: projectInfo.code,
          postnum: nowPost.postNum,
          commentcontent: commentWriteRef.current.value,
          cowriteremail: state.email,
        }
      )
      .then((res) => {
        if (res.data === 0) {
          alert('댓글 작성에 실패했습니다');
        } else {
          loadComments();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateComment = (num, value) => {
    axios
      .post(
        `/project/${projectInfo.code}/${nowPost.postCategory}/${nowPost.postNum}/updateComment`,
        {
          code: projectInfo.code,
          commentnum: num,
          content: value,
        }
      )
      .then((res) => {
        loadComments();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteComment = (num) => {
    axios
      .post(
        `/project/${projectInfo.code}/${nowPost.postCategory}/${nowPost.postNum}/deleteComment`,
        {
          code: projectInfo.code,
          commentnum: num,
        }
      )
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
      <div className="postVeiwBox">
        <div className="postView">
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
              {nowPost.writerEmail === state.email ? (
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
              ) : projectInfo.creatoremail === state.email ? (
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
                    state={state}
                    projectInfo={projectInfo}
                    comment={comment}
                    updateComment={updateComment}
                    deleteComment={deleteComment}
                  />
                );
              })
            )}
            <div className="commentWriteBox">
              <div className="commentWrite">
                <input type="text" maxLength="200" ref={commentWriteRef} />
              </div>
              <div className="commentWriteBtn" onClick={addComment}>
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
