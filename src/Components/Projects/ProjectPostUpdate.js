import React, { useRef } from 'react';

const ProjectPostUpdate = ({
  categories,
  nowPost,
  postUpdate,
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
        <label htmlFor="updateCategory">카테고리</label>
        <select
          id="updateCategory"
          defaultValue={nowPost.postCategory}
          ref={updateCategoryRef}
        >
          <option value="">----- 선택 -----</option>
          {categories.map((category) => {
            return (
              <option key={category.category} value={category.category}>
                {category.category}
              </option>
            );
          })}
        </select>
      </div>
      <div className="updateTitleBox">
        <label htmlFor="updateTitle">제목</label>
        <input
          id="updateTitle"
          maxLength="40"
          type="text"
          ref={updateTitleRef}
          defaultValue={nowPost.postTitle}
        />
      </div>
      <div maxLength="5000" className="updateContentBox">
        <label htmlFor="updateContent">내용</label>
        <textarea
          id="updateContent"
          cols="30"
          rows="10"
          ref={updateContentRef}
          defaultValue={nowPost.postContent}
        ></textarea>
      </div>
      <button
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
      <button onClick={updatePostBtn}>수정 완료</button>
    </div>
  );
};

export default ProjectPostUpdate;
