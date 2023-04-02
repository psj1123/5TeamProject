import React from 'react';

const AsideCategory = ({
  projectInfo,
  loginEmail,
  category,
  selectedCategory,
  changeSelectedCategory,
  deleteCategory,
}) => {
  const categoryArticle = category.category;
  const selected = selectedCategory === categoryArticle;
  const deleteClick = (e) => {
    if (window.confirm('이 카테고리를 삭제하시겠습니까?\n' + e.target.id)) {
      deleteCategory(e);
    } else {
      return;
    }
  };
  // selected ? 'categoryBox categoryActive' : 'categoryBox'
  return (
    <li
      className={selected ? 'categoryBox categoryActive' : 'categoryBox'}
      onClick={changeSelectedCategory}
    >
      <div
        title={categoryArticle}
        className={
          projectInfo.email === loginEmail
            ? 'category category_manager'
            : 'category category_user'
        }
      >
        {categoryArticle}
      </div>
      {projectInfo.email === loginEmail ? (
        <button
          id={categoryArticle}
          className="deleteCategory"
          onClick={deleteClick}
        >
          X
        </button>
      ) : (
        <></>
      )}
    </li>
  );
};

export default AsideCategory;
