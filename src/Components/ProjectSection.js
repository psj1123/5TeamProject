import React from 'react';
import '../Styles/ProjectSection.css';
import ProjectNoteCard from './Projects/ProjectNoteCard';

const ProjectSection = ({ isOpen, modalMode, modalOpen, posts }) => {
  if (posts.postslist[0] === undefined) {
    return (
      <section>
        <div className="projectSection">
          <div className="whiteBoard">
            <div className="noPosts">작성된 글이 없습니다</div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="projectSection">
        <div className="whiteBoard">
          {posts.postslist.map((post) => {
            return (
              <ProjectNoteCard
                key={post.postnum}
                post={post}
                modalOpen={modalOpen}
              />
            );
          })}
        </div>
      </section>
    );
  }
};

export default React.memo(ProjectSection);
