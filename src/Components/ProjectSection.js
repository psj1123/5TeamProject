import React, { useEffect, useState } from 'react';
import '../Styles/ProjectSection.css';
import axios from 'axios';
import ProjectPostList from './Projects/ProjectPostList';
import ProjectPostDetail from './Projects/ProjectPostDetail';
import ProjectPostUpdate from './Projects/ProjectPostUpdate';
import ProjectPostWrite from './Projects/ProjectPostWrite';

const ProjectSection = ({
  state,
  posts,
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
      .post(
        `/project/${projectInfo.code}/${selectedCategory}/${e.target.id}/detail`,
        {}
      )
      .then((res) => {
        if (res.data === 0) {
          alert('존재하지 않는 포스트입니다!');
        } else {
          const { data } = res;
          setNowPost({
            postCategory: data[0].category,
            postNum: data[0].postnum,
            postTitle: data[0].posttitle,
            postContent: data[0].postcontent,
            postWriter: data[0].postwriter,
            postedDate: data[0].postdate,
            writerEmail: data[0].email,
          });

          setIsPostOpened(true);
        }
      });
  };

  const postWrite = (postData) => {
    axios
      .post(
        `/project/${projectInfo.code}/${selectedCategory}/writepost/write`,
        {
          category: postData.category,
          posttitle: postData.title,
          postcontent: postData.content,
          email: state.email,
        }
      )
      .then((res) => {
        if (res.data === 1) {
          alert('등록 완료');
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
          alert('삭제 성공');
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
          category: postData.category,
          posttitle: postData.title,
          postcontent: postData.content,
        }
      )
      .then((res) => {
        if (res.data === 1) {
          alert('수정 완료!');
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
      <div>
        <div className="projectSection">
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
                  <p> 프로젝트 생성일 &nbsp;</p>
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
                      ? 'D-day'
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
    if (posts.postslist[0] === undefined) {
      return (
        <div>
          <div className="projectSection">
            <div className="postBoard">
              <div className="noPosts">
                <h3>작성된 글이 없습니다!</h3>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="projectSection">
          <div className="postsBoard">
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
              {posts.postslist.map((post) => {
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
      );
    }
  }
};

export default React.memo(ProjectSection);
