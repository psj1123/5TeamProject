import React, { useRef } from 'react';

const ProjectPostUpdate = ({
  categories,
  projectInfo,
  nowPost,
  postUpdate,
  setIsPostOpened,
  setIsPostUpdating,
}) => {
  const updateCategoryRef = useRef();
  const updateTitleRef = useRef();
  const updateContentRef = useRef();

  const updatePostBtn = () => {
    const category = updateCategoryRef.current.value;
    const title = updateTitleRef.current.value;
    const content = updateContentRef.current.value;

    if (category === '') {
      alert('카테고리를 지정해주세요.');
      updateCategoryRef.current.focus();
      return;
    } else if (title === '') {
      alert('제목을 입력해주세요.');
      updateTitleRef.current.focus();
      return;
    } else if (content === '') {
      alert('내용을 입력해주세요.');
      updateContentRef.current.focus();
      return;
    } else {
      if (window.confirm('수정하시겠습니까?')) {
        const postData = {
          category: category,
          title: title,
          content: content,
        };
        postUpdate(postData);
      } else {
        return;
      }
    }
  };

  return (
    <div className="postBox">
      <div className="updateCategoryBox">
        <label htmlFor="updateCategory">카테고리 : </label>
        <select
          id="updateCategory"
          defaultValue={nowPost.postCategory}
          ref={updateCategoryRef}
        >
          <option value="">----- 선택 -----</option>
          {categories.categorieslist.map((category) => {
            return (
              <option key={category.category} value={category.category}>
                {category.category}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label>제목 : </label>
        <input
          className="writeTitle"
          id="updateTitle"
          maxLength="40"
          type="text"
          size="88"
          ref={updateTitleRef}
          defaultValue={nowPost.postTitle}
        />
      </div>
      <div maxLength="5000">
        <label htmlFor="updateContent"></label>
        <textarea
          className="updateContentBox"
          id="updateContent"
          cols="145"
          rows="14"
          ref={updateContentRef}
          defaultValue={nowPost.postContent}
        ></textarea>
      </div>
      <div className="updateButtonFix">
        <button
          className="updateButton"
          onClick={() => {
            if (window.confirm('글 수정을 취소하겠습니까?')) {
              setIsPostUpdating(false);
            } else {
              return;
            }
          }}
        >
          취소
        </button>
        <button onClick={updatePostBtn} className="updateButton">
          수정 완료
        </button>
      </div>
    </div>
  );
};

export default ProjectPostUpdate;
