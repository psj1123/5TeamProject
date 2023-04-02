import React, { useRef } from 'react';
import '../../Styles/ProjectPostWrite.css';

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
    <div className="pjSectionMainBox">
      <div className="pjSectionMain">
        <div className="pjSectionInnerBox">
          <div className="createCategoryBox">
            <label htmlFor="createCategory">카테고리</label>
            <select
              className="createCategory"
              id="createCategory"
              ref={createCategoryRef}
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
          <div className="createPostTitleBox">
            <label htmlFor="createTitle">제목</label>
            <input
              className="createPostTitle"
              id="createTitle"
              maxLength="40"
              type="text"
              ref={createTitleRef}
              placeholder="제목 입력... (최대 40자)"
            />
          </div>
          <div className="createPostContentBox">
            <label htmlFor="createContent">내용</label>
            <textarea
              className="createPostContent"
              id="createContent"
              cols="30"
              rows="10"
              maxLength="5000"
              ref={createContentRef}
              placeholder="내용 입력... (최대 5000자)"
            />
          </div>
          <div className="createPostBtnBox">
            <button
              className="createPostCancelBtn"
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
            <button className="createPostBtn" onClick={createPostBtn}>
              작성 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPostWrite;
