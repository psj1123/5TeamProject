import React, { useCallback, useRef } from 'react';

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

  // const textarea = useRef();

  const handleResizeHeight = (e) => {
    // 기능 미구현
    createContentRef.current.style.height = 'auto'; //height 초기화
    createContentRef.current.style.height =
      createContentRef.current.scrollHeight + 'px';
  };

  return (
    <div className="postBox">
      <div className="createCategoryBox">
        <label htmlFor="createCategory">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </label>
        <select
          className="selectCategory"
          id="createCategory"
          ref={createCategoryRef}
          // style={{ color: '#909090' }}
        >
          <option value="">카테고리</option>
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
        <label htmlFor="createTitle">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </label>
        <input
          className="writeTitle"
          id="createTitle"
          maxLength="40"
          type="text"
          ref={createTitleRef}
          size="74"
          placeholder="제목을 입력하세요."
        />
      </div>
      <div maxLength="5000" className="createContentBox">
        <label htmlFor="createContent">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </label>
        <textarea
          className="writeContent"
          id="createContent"
          cols="123"
          rows="30"
          ref={createContentRef}
          // onInput={handleResizeHeight}
          placeholder="내용을 입력하세요."
        ></textarea>
      </div>
      <div className="writeButtonFix">
        <button
          className="writeButton"
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
        <button className="writeButton" onClick={createPostBtn}>
          완료
        </button>
        {/* <Button variant="dark" onClick={createPostBtn}>
        완료
      </Button> */}
      </div>
      {/* ck에디터 실험 */}
      {/* <div className="App">
        <CKEditor
          editor={ClassicEditor}
          config={{
            placeholder: '내용을 입력하세요.',
          }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
      </div> */}
    </div>
  );
};

export default ProjectPostWrite;
