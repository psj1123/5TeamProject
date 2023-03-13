import React, { useEffect } from 'react';
import '../Styles/ProjectSection.css';
import ProjectPostList from './Projects/ProjectPostList';

const ProjectSection = ({ posts }) => {
  // 글 페이지 수 저장용 변수. 10post 당 1page
  // postPages - 1 * 10 한 값 = offset
  // SELECT * FROM post난수 ORDER BY postnum DESC LIMIT offset, 10; = 1페이지 당 10개의 글 출력 가능
  const postPages = Math.ceil(posts.length / 10);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  if (posts.postslist[0] === undefined) {
    return (
      <div>
        <div className="projectSection">
          <div className="postBoard">
            <div className="noPosts">
              <h3>작성된 글이 없어요!</h3>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="projectSection">
        <div className="postBoard">
          {posts.postslist.map((post) => {
            return <ProjectPostList key={post.postnum} post={post} />;
          })}
        </div>
        <div></div>
      </div>
    );
  }
};

export default React.memo(ProjectSection);
