import React from 'react';
import ProjectAsideCategory from './Projects/ProjectAsideCategory';
import '../Styles/ProjectAside.css';

const ProjectAside = ({ modalOpen }) => {
  return (
    <>
      <aside>
        <div className="asideTop">
          <div className="blockBox"></div>
          <div className="projectCreator">
            <p>관리자</p>
            <p>(관리자이메일@example.com)</p>
          </div>
          <div className="projectCategory">
            <ul>
              <li>★ 개요</li>
              <li>공지사항</li>
              <li>분류 1</li>
              <li>분류 1</li>
              <li>분류 1</li>
              <li>분류 1</li>
              <li>분류 1</li>
              <li>분류 1</li>
              <li>분류 1</li>
              <li>분류 1</li>
              <li>분류 1</li>
              <li>분류 1</li>
              <li>분류 1</li>
              <li>분류 1</li>
              <li>분류 1</li>
              <li>분류 1</li>
              <li>분류 1</li>
              <li>분류 1</li>
              <li>분류 1</li>
              <li>분류 1</li>
              {/*<li>카테고리 추가</li>*/}
            </ul>
          </div>
        </div>

        <div className="asideBottom">
          <div className="writeAndUserListAndSettings">
            <div>
              <div className="writeBtn" onClick={modalOpen}>
                글 작성
              </div>
              <div className="settingsBtn" onClick={modalOpen}>
                설정
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ProjectAside;
