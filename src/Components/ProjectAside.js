import React, { useEffect } from 'react';
import ProjectAsideCategory from './Project/ProjectAsideCategory';
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
  postWriteBtnClick,
}) => {
  const loginEmail = sessionStorage.getItem('email');

  useEffect(() => {
    getCategories();
  }, [selectedCategory]);

  const createCategoryBtn = () => {
    const maxLength = 15;
    let checkCancel;
    let categoryName;

    while (true) {
      categoryName = prompt('추가할 카테고리 이름을 입력하세요. (최대 15글자)');

      if (categoryName === '★ 개요') {
        alert('"★ 개요" 는 카테고리로 사용할 수 없습니다.\n다시 입력해주세요.');
      } else if (categoryName === '') {
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
      <aside className="aside">
        <div className="asideTop">
          <div className="blockBox"></div>
          <div className="projectTitleAndDescription">
            <div className="projectCreator">
              <p>관리자: {projectInfo.nickname}</p>
              <p title={projectInfo.creatoremail}>
                ({projectInfo.creatoremail})
              </p>
            </div>
          </div>

          <div className="projectCategory">
            <ul>
              <li
                title="★ 개요"
                className={
                  selectedCategory === '★ 개요'
                    ? 'categoryBox categoryActive'
                    : 'categoryBox'
                }
                onClick={changeSelectedCategory}
              >
                <div className="category">★ 개요</div>
              </li>
              <li
                title="공지사항"
                className={
                  selectedCategory === '공지사항'
                    ? 'categoryBox categoryActive'
                    : 'categoryBox'
                }
                onClick={changeSelectedCategory}
              >
                <div className="category">공지사항</div>
              </li>
              {categories.map((category) => {
                if (category === '공지사항') {
                  return null;
                } else {
                  return (
                    <ProjectAsideCategory
                      key={category}
                      projectInfo={projectInfo}
                      loginEmail={loginEmail}
                      category={category}
                      selectedCategory={selectedCategory}
                      changeSelectedCategory={changeSelectedCategory}
                      deleteCategory={deleteCategory}
                    />
                  );
                }
              })}
              {projectInfo.creatoremail === loginEmail ? (
                <li className="addCategoryBox" onClick={createCategoryBtn}>
                  <div className="category">카테고리 추가</div>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>

        <div className="asideBottom">
          <div className="writeAndUserListAndSettings">
            <div className="writeBtn" onClick={postWriteBtnClick}>
              글 작성
            </div>
            {projectInfo.creatoremail === loginEmail ? (
              <div className="settingsBtn" onClick={modalOpen}>
                설정
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default React.memo(ProjectAside);
