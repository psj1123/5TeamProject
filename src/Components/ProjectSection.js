import React, { useEffect, useState } from 'react';
import '../Styles/ProjectSection.css';
import '../Styles/ProjectSection_PostDetail.css';
import axios from 'axios';
import ProjectPostList from './Projects/ProjectPostList';
import ProjectPostDetail from './Projects/ProjectPostDetail';
import ProjectPostUpdate from './Projects/ProjectPostUpdate';
import ProjectPostWrite from './Projects/ProjectPostWrite';

const ProjectSection = ({
  state,
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
        if (res.data === 0) {
          alert('존재하지 않는 글입니다!');
        } else {
          const { data } = res;
          setNowPost({
            postCategory: data[0].category,
            postNum: data[0].postnum,
            postTitle: data[0].posttitle,
            postContent: data[0].postcontent,
            postWriter: data[0].nickname,
            postedDate: data[0].postdate,
            writerEmail: data[0].powriteremail,
          });

          setIsPostOpened(true);
        }
      });
  };

  const postWrite = (postData) => {
    axios
      .post(`/project/${projectInfo.code}/${selectedCategory}/writePost`, {
        code: projectInfo.code,
        category: postData.category,
        posttitle: postData.title,
        postcontent: postData.content,
        email: state.email,
      })
      .then((res) => {
        if (res.data === 1) {
          setIsPostWriting(false);
          getposts();
        }
      });
  };

  const postDelete = () => {
    axios
      .post(
        `/project/${projectInfo.code}/${selectedCategory}/${nowPost.postNum}/delete`,
        {}
      )
      .then((res) => {
        if (res.data === 1) {
          setIsPostOpened(false);
          getposts();
        }
      });
  };

  const postUpdate = (postData) => {
    axios
      .post(
        `/project/${projectInfo.code}/${selectedCategory}/${nowPost.postNum}/update`,
        {
          code: projectInfo.code,
          postnum: nowPost.postNum,
          category: postData.category,
          posttitle: postData.title,
          postcontent: postData.content,
        }
      )
      .then((res) => {
        if (res.data === 1) {
          getposts();
          setIsPostUpdating(false);
          setIsPostOpened(false);
        }
      });
  };

  const deadline = new Date(projectInfo.deadline);
  const today = new Date();
  const diffTime = deadline - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const result =
    diffDays > 0 ? `D - ${diffDays}` : diffDays === 0 ? 'D-day' : '종료';

  if (selectedCategory === '★ 개요') {
    return (
      <div className="projectSection">
        <div className="pjSectionMainBox">
          <div className="pjSectionMain">
            <div className="overview_container">
              <table className="overview_table">
                <tr>
                  <td className="overview_title">
                    <p> 프로젝트 제목 &nbsp;</p>
                  </td>
                  <td>
                    <p>{projectInfo.title}</p>
                  </td>
                </tr>
                <tr>
                  <td className="overview_title">
                    <p> 프로젝트 설명 &nbsp;</p>
                  </td>
                  <td>
                    <p>{projectInfo.description}</p>
                  </td>
                </tr>
                <tr>
                  <td className="overview_title">
                    <p> 프로젝트 마감일 &nbsp;</p>
                  </td>
                  <td>
                    <p>{projectInfo.deadline}</p>
                  </td>
                </tr>
                <tr>
                  <td className="overview_title">
                    <p> 프로젝트 D-Day &nbsp;</p>
                  </td>
                  <td>
                    <p>
                      {result > 0
                        ? 'D - ' + result
                        : result === 0
                        ? 'D - day'
                        : '종료'}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="overview_title">
                    <p> 관리자 &nbsp;</p>
                  </td>
                  <td>
                    <p>
                      {projectInfo.nickname} ({projectInfo.email})
                    </p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isPostOpened) {
    if (!isPostUpdating) {
      return (
        <div>
          <div className="projectSection">
            <ProjectPostDetail
              state={state}
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
              categories={categories}
              projectInfo={projectInfo}
              nowPost={nowPost}
              postUpdate={postUpdate}
              setIsPostOpened={setIsPostOpened}
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
            <div className="pjSectionMain"></div>
          </div>
        </div>
      );
    } else {
      if (posts[0] === undefined) {
        return (
          <div className="projectSection">
            <div className="pjSectionMainBox">
              <div className="pjSectionMain">
                <h3 className="noPosts">작성된 글이 없습니다!</h3>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="projectSection">
            <div className="pjSectionMainBox">
              <div className="pjSectionMain">
                <ul>
                  <li className="postList postList-firstLine">
                    <div className="postListLeftbox">
                      <div>번호</div>
                      <div className="postListTitle">제목</div>
                    </div>
                    <div className="postListRightbox">
                      <div>작성일</div>
                    </div>
                  </li>
                  {posts.map((post) => {
                    return (
                      <ProjectPostList
                        key={post.postnum}
                        post={post}
                        postOpen={postOpen}
                      />
                    );
                  })}
                </ul>
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
