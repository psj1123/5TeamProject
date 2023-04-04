import React from 'react';

const AsideCategory = ({
  projectInfo,
  loginEmail,
  category,
  selectedCategory,
  changeSelectedCategory,
  deleteCategory,
}) => {
  const selected = selectedCategory === category;
  const deleteClick = (e) => {
    if (window.confirm('이 카테고리를 삭제하시겠습니까?\n' + e.target.id)) {
      deleteCategory(e);
    } else {
      return;
    }
  };

  return (
    <li
      className={selected ? 'categoryBox categoryActive' : 'categoryBox'}
      onClick={changeSelectedCategory}
    >
      <div
        title={category}
        className={
          projectInfo.creatoremail === loginEmail
            ? 'category category_manager'
            : 'category category_user'
        }
      >
        {category}
      </div>
      {projectInfo.creatoremail === loginEmail ? (
        <button id={category} className="deleteCategory" onClick={deleteClick}>
          X
        </button>
      ) : (
        <></>
      )}
    </li>
  );
};

export default AsideCategory;
