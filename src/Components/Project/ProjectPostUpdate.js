import React, { useRef } from 'react';
import '../../Styles/ProjectPostUpdate.css';

const ProjectPostUpdate = ({
  loginEmail,
  categories,
  projectInfo,
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
    <div className="pjSectionMainBox">
      <div className="pjSectionMain">
        <div className="pjSectionInnerBox">
          <div className="updateCategoryBox">
            <label htmlFor="updateCategory">카테고리</label>
            <select
              className="updateCategory"
              id="updateCategory"
              defaultValue={nowPost.postCategory}
              ref={updateCategoryRef}
            >
              <option value="">----- 선택 -----</option>
              {categories.map((category) => {
                if (
                  category === '공지사항' &&
                  loginEmail === projectInfo.creatoremail
                ) {
                  return (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  );
                } else if (
                  category === '공지사항' &&
                  loginEmail !== projectInfo.creatoremail
                ) {
                  return null;
                } else {
                  return (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div className="updatePostTitleBox">
            <label htmlFor="updateTitle">제목</label>
            <input
              className="updatePostTitle"
              id="updateTitle"
              maxLength="40"
              type="text"
              ref={updateTitleRef}
              defaultValue={nowPost.postTitle}
              placeholder="제목 입력... (최대 40자)"
            />
          </div>
          <div className="updatePostContentBox">
            <label htmlFor="updateContent">내용</label>
            <textarea
              className="updatePostContent"
              id="updateContent"
              maxLength="5000"
              ref={updateContentRef}
              defaultValue={nowPost.postContent}
              placeholder="내용 입력... (최대 5000자)"
            ></textarea>
          </div>
          <div className="updatePostBtnBox">
            <button
              className="updatePostCancelBtn"
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
            <button className="updatePostBtn" onClick={updatePostBtn}>
              수정 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPostUpdate;
