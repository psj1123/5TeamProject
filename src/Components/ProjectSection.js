import React, { useState } from 'react';
import '../Styles/ProjectSection.css';
import '../Styles/ProjectSection_PostDetail.css';
import axios from 'axios';
import ProjectPostList from './Projects/ProjectPostList';
import ProjectPostDetail from './Projects/ProjectPostDetail';
import ProjectPostUpdate from './Projects/ProjectPostUpdate';
import ProjectPostWrite from './Projects/ProjectPostWrite';

const ProjectSection = ({
  posts,
  isLoading,
  getposts,
  categories,
  projectInfo,
  selectedCategory,
  isPostOpened,
  setIsPostOpened,
  isPostUpdating,
  setIsPostUpdating,
  isPostWriting,
  setIsPostWriting,
}) => {
  const loginEmail = sessionStorage.getItem('email');

  const [nowPost, setNowPost] = useState({
    postCategory: '',
    postNum: '',
    postTitle: '',
    postContent: '',
    postWriter: '',
    postedDate: '',
    writerEmail: '',
  });

  const postOpen = (e) => {
    axios
      .get(
        `/project/${projectInfo.code}/${selectedCategory}/${e.target.id}`,
        {}
      )
      .then((res) => {
        const { data } = res;
        if (data === '') {
          alert('존재하지 않는 글입니다!');
        } else {
          const { data } = res;
          setNowPost({
            postCategory: data.category,
            postNum: data.postnum,
            postTitle: data.posttitle,
            postContent: data.postcontent,
            postWriter: data.nickname,
            postedDate: data.posteddate,
            writerEmail: data.powriteremail,
          });

          setIsPostOpened(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const postWrite = (postData) => {
    axios
      .post(`/writePost`, {
        code: projectInfo.code,
        category: postData.category,
        posttitle: postData.title,
        postcontent: postData.content,
        powriteremail: loginEmail,
      })
      .then((res) => {
        const { data } = res;
        if (data === 1) {
          setIsPostWriting(false);
          getposts();
        } else {
          alert('예상치 못한 문제가 발생했습니다.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const postDelete = () => {
    axios
      .post(`/deletePost`, {
        code: projectInfo.code,
        postnum: nowPost.postNum,
      })
      .then((res) => {
        const { data } = res;
        if (data === 1) {
          setIsPostOpened(false);
          getposts();
        } else {
          alert('예상치 못한 문제가 발생했습니다.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const postUpdate = (postData) => {
    axios
      .post(`/updatePost`, {
        code: projectInfo.code,
        postnum: nowPost.postNum,
        category: postData.category,
        posttitle: postData.title,
        postcontent: postData.content,
      })
      .then(async (res) => {
        const { data } = res;
        if (data === 1) {
          await getposts();
          await postOpen({ target: { id: nowPost.postNum } });
          await setIsPostUpdating(false);
        } else {
          alert('예상치 못한 문제가 발생했습니다.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const today = new Date();
  const dday = new Date(projectInfo.deadline).getTime();
  const gap = dday - today;
  const result = Math.floor(gap / (1000 * 60 * 60 * 24)) + 1;

  if (isPostOpened) {
    if (!isPostUpdating) {
      return (
        <div>
          <div className="projectSection">
            <ProjectPostDetail
              projectInfo={projectInfo}
              nowPost={nowPost}
              setIsPostOpened={setIsPostOpened}
              setIsPostUpdating={setIsPostUpdating}
              postDelete={postDelete}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="projectSection">
            <ProjectPostUpdate
              loginEmail={loginEmail}
              categories={categories}
              projectInfo={projectInfo}
              nowPost={nowPost}
              postUpdate={postUpdate}
              setIsPostUpdating={setIsPostUpdating}
            />
          </div>
        </div>
      );
    }
  } else if (isPostWriting) {
    return (
      <div>
        <div className="projectSection">
          <ProjectPostWrite
            projectInfo={projectInfo}
            loginEmail={loginEmail}
            categories={categories}
            postWrite={postWrite}
            setIsPostWriting={setIsPostWriting}
          />
        </div>
      </div>
    );
  } else {
    if (isLoading) {
      return (
        <div className="projectSection">
          <div className="pjSectionMainBox">
            <div className="pjSectionMain">
              <div className="pjSectionInnerBox"></div>
            </div>
          </div>
        </div>
      );
    } else {
      if (selectedCategory === '★ 개요') {
        return (
          <div className="projectSection">
            <div className="pjSectionMainBox">
              <div className="pjSectionMain">
                <div className="pjSectionInnerBox">
                  <div className="overview_container">
                    <div>
                      <div className="ovCodeBox">
                        <div className="ovCodeLabel">프로젝트 코드</div>
                        <div className="ovCode">{projectInfo.code}</div>
                      </div>
                      <div className="ovTitleBox">
                        <div className="ovTitleLabel">프로젝트 제목</div>
                        <div className="ovTitle">{projectInfo.title}</div>
                      </div>
                      <div className="ovDescriptionBox">
                        <div className="ovDescriptionLabel">프로젝트 설명</div>
                        <div className="ovDescription">
                          {projectInfo.description}
                        </div>
                      </div>
                      <div className="ovManagerBox">
                        <div className="ovManagerLabel">프로젝트 매니저</div>
                        <div className="ovManager">
                          {projectInfo.nickname}({projectInfo.email})
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="ovDeadlineBox">
                        <div className="ovDeadlineLabel">프로젝트 마감일</div>
                        <div className="ovDeadline">{projectInfo.deadline}</div>
                      </div>
                      <div className="ovDdayBox">
                        <div className="ovDdayLabel">프로젝트 D - Day</div>
                        <div className="ovDday">
                          {result > 0
                            ? 'D - ' + result
                            : result === 0
                            ? 'D - day'
                            : '종료'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (posts[0] === undefined) {
        return (
          <div className="projectSection">
            <div className="pjSectionMainBox">
              <div className="pjSectionMain">
                <div className="pjSectionInnerBox">
                  <h3 className="noPosts">작성된 글이 없습니다!</h3>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="projectSection">
            <div className="pjSectionMainBox">
              <div className="pjSectionMain">
                <div className="pjSectionInnerBox">
                  <div className="postListHeader">
                    <div className="postListHeaderLeft">
                      <div>번호</div>
                    </div>

                    <div className="postListHeaderCenter">
                      <div>제목</div>
                    </div>

                    <div className="postListHeaderRight">
                      <div>작성일</div>
                    </div>
                  </div>
                  {posts.map((post, idx) => {
                    return (
                      <ProjectPostList
                        key={post.postnum}
                        idx={idx}
                        post={post}
                        postOpen={postOpen}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* <div>
              <ul>
                {postPageingList.map((Pages, i) => {
                  return (
                    <li key={i}></li>
                  )
                })}
                <li></li>
              </ul>
            </div> */}
          </div>
        );
      }
    }
  }
};

export default React.memo(ProjectSection);
