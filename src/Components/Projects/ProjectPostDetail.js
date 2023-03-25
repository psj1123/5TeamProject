import axios from 'axios';
import React, { useState } from 'react';
import ProjectPostComment from './ProjectPostComment';

const ProjectPostDetail = ({
  state,
  projectInfo,
  nowPost,
  setIsPostOpened,
  setIsPostUpdating,
  postDelete,
}) => {
  const [comments, setComments] = useState({ commentlist: [] });
  const [commentOpen, setCommentOpen] = useState(false);

  const loadComments = () => {
    axios
      .post(
        `/project/${projectInfo.code}/${nowPost.postCategory}/${nowPost.postnum}/detail/comments`,
        {}
      )
      .then((res) => {
        const { data } = res;
        if (data === 0) {
          setComments({ commentlist: null });
        } else {
          setComments({ commentlist: data });
        }
      });
  };

  const deleteComment = (num) => {
    axios
      .post(
        `/project/${projectInfo.code}/${nowPost.postCategory}/${nowPost.postnum}/detail/delete`,
        {}
      )
      .then((res) => {
        if (res.data === 0) {
          alert('댓글 삭제 실패');
        }
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
              <div
                className="deletePost"
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
              </div>

              <div
                className="updatePost"
                onClick={() => {
                  if (state.email === nowPost.writerEmail) {
                    setIsPostUpdating(true);
                  } else {
                    alert('작성자만 수정이 가능합니다.');
                  }
                }}
              >
                수정
              </div>
            </div>
          </div>
        </div>
      </div>
      {commentOpen ? (
        <div className="commentViewBox">
          <div className="commentView">
            {comments.commentlist.map((comment) => {
              return (
                <ProjectPostComment
                  key={comment.commentnum}
                  num={comment.commentnum}
                  content={comment.commentcontent}
                  writer={comment.nickname}
                  deleteComment={deleteComment}
                />
              );
            })}
            <ProjectPostComment />
            <div className="commentWriteBox">
              <div className="commentWrite">
                <input type="text" maxLength="200" />
              </div>
              <div className="commentWriteBtn">댓글 작성</div>
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
