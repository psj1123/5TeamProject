import React, { useRef } from 'react';

const ProjectPostWrite = ({ categories, postWrite, setIsPostWriting }) => {
  const createCategoryRef = useRef();
  const createTitleRef = useRef();
  const createContentRef = useRef();

  const createPostBtn = () => {
    const category = createCategoryRef.current.value;
    const title = createTitleRef.current.value;
    const content = createContentRef.current.value;

    if (category === '') {
      alert('카테고리를 지정해주세요.');
      createCategoryRef.current.focus();
      return;
    } else if (title === '') {
      alert('제목을 입력해주세요.');
      createTitleRef.current.focus();
      return;
    } else if (content === '') {
      alert('내용을 입력해주세요.');
      createContentRef.current.focus();
      return;
    } else {
      if (window.confirm('등록하시겠습니까?')) {
        const postData = {
          category: category,
          title: title,
          content: content,
        };
        postWrite(postData);
      } else {
        return;
      }
    }
  };

  return (
    <div className="postBox">
      <div className="createCategoryBox">
        <label htmlFor="createCategory">카테고리</label>
        <select id="createCategory" ref={createCategoryRef}>
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
      <div className="createTitleBox">
        <label htmlFor="createTitle">제목</label>
        <input
          id="createTitle"
          maxLength="40"
          type="text"
          ref={createTitleRef}
        />
      </div>
      <div maxLength="5000" className="createContentBox">
        <label htmlFor="createContent">내용</label>
        <textarea
          id="createContent"
          cols="30"
          rows="10"
          ref={createContentRef}
        ></textarea>
      </div>
      <button
        onClick={() => {
          if (window.confirm('글 작성을 취소하겠습니까?')) {
            setIsPostWriting(false);
          } else {
            return;
          }
        }}
      >
        취소
      </button>
      <button onClick={createPostBtn}>작성 완료</button>
    </div>
  );
};

export default ProjectPostWrite;
