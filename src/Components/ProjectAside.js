import React, { useEffect, useState } from 'react';
import ProjectAsideCategory from './Projects/ProjectAsideCategory';
import '../Styles/ProjectAside.css';

const ProjectAside = ({
  modalOpen,
  projectInfo,
  categories,
  getCategories,
  selectedCategory,
  changeSelectedCategory,
  createCategory,
  deleteCategory,
  isPostWriting,
  postWriteBtnClick,
}) => {
  useEffect(() => {
    getCategories();
  }, [categories]);

  const [showDialogBox, setShowDialogBox] = useState(false);
  const createCategoryBtn = () => {
    const maxLength = 15;
    let checkCancel;
    let categoryName;

    while (true) {
      categoryName = prompt('추가할 카테고리 이름을 입력하세요. (최대 15글자)');
      if (categoryName === '') {
        alert('공백은 카테고리로 사용할 수 없습니다.\n다시 입력해주세요.');
        continue;
      } else if (categoryName.length > maxLength) {
        alert('카테고리 이름은 15글자를 넘길 수 없습니다.\n다시 입력해주세요.');
        continue;
      } else if (categoryName === null) {
        checkCancel = true;
        break;
      } else {
        checkCancel = false;
        break;
      }
    }

    if (checkCancel) {
      return;
    } else {
      return createCategory(categoryName);
    }
  };

  return (
    <>
      <aside>
        <div className="asideTop">
          <div className="blockBox"></div>
          <div
            className="projectTitleAndDescription"
            onClick={() => setShowDialogBox(true)}
          >
            <div className="projectCreator">
              <p>관리자: {projectInfo.nickname}</p>
              <p>({projectInfo.email})</p>
            </div>
          </div>

          <div className="projectCategory">
            <ul>
              <li
                className={
                  selectedCategory === '★ 개요' ? 'categoryActive' : ''
                }
                onClick={changeSelectedCategory}
              >
                <div>★ 개요</div>
              </li>
              <li
                className={
                  selectedCategory === '공지사항' ? 'categoryActive' : ''
                }
                onClick={changeSelectedCategory}
              >
                <div>공지사항</div>
              </li>
              {categories.categorieslist.map((category) => {
                if (
                  category.category === '★ 개요' ||
                  category.category === '공지사항'
                ) {
                  return;
                } else {
                  return (
                    <ProjectAsideCategory
                      key={category.category}
                      category={category}
                      selectedCategory={selectedCategory}
                      changeSelectedCategory={changeSelectedCategory}
                      deleteCategory={deleteCategory}
                    />
                  );
                }
              })}
              <li onClick={createCategoryBtn}>
                <div>카테고리 추가</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="asideBottom">
          <div className="writeAndUserListAndSettings">
            <div>
              <div className="writeBtn" onClick={postWriteBtnClick}>
                글 작성
              </div>
              <div className="settingsBtn" onClick={modalOpen}>
                설정
              </div>
            </div>
          </div>
        </div>
        {/* {showDialogBox && (
          <div className="dialogBox">
            <h2>{projectInfo.title}</h2>
            <p>{projectInfo.description}</p>
            <button onClick={() => setShowDialogBox(false)}>Close</button>
          </div>
        )} */}
      </aside>
    </>
  );
};

export default React.memo(ProjectAside);
