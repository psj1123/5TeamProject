import React from 'react';
import '../Styles/ProjectSection.css';
import ProjectNoteCard from './Projects/ProjectNoteCard';

const ProjectSection = ({ isOpen, modalMode, modalOpen }) => {
  const list = [1, 2, 3, 4, 5];
  return (
    <section className="projectSection">
      <div className="whiteBoard">
        <div className="noteCard">
          <div className="pin">#1</div>
          <div>
            <div className="noteTitle">
              글제목Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
            <div className="noteDescription">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              praesentium esse, pariatur, numquam, dolorem in labore ad atque
              quas asperiores commodi et quo dicta! Nulla adipisci porro
              officiis eaque aperiam. Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Excepturi, voluptate consectetur, nostrum odio
              laboriosam numquam, ex itaque dolor porro nam quisquam suscipit
              laborum esse mollitia! Cum reprehenderit necessitatibus eveniet
              neque!
            </div>
          </div>
          <div>
            <div className="noteWriter">작성자sfasfsadfsadfassdfsfasf</div>
            <div className="noteDate">03-07-23</div>
            <div className="noteOption" onClick={modalOpen}>
              자세히 보기
            </div>
          </div>
        </div>
        {list.map((item) => {
          return <ProjectNoteCard item={item} modalOpen={modalOpen} />;
        })}
      </div>
    </section>
  );
};

export default ProjectSection;
