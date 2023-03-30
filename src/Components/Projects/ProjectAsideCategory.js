import React from 'react';

const AsideCategory = ({
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

  return (
    <li
      className={selected ? 'categoryActive' : ''}
      onClick={changeSelectedCategory}
    >
      <div>{categoryArticle}</div>

      <button
        id={categoryArticle}
        className="deleteCategory"
        onClick={deleteClick}
      >
        X
      </button>
    </li>
  );
};

export default AsideCategory;
