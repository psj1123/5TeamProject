import React, { useState } from 'react';
import ReactModal from 'react-modal';
import '../../Styles/ProjectModal.css';
import NoteCard from '../Projects/ProjectNoteCard';

const ProjectModal = ({ isOpen, modalMode, modalClose }) => {
  const [isGeneralTabSelected, setIsGeneralTabSelected] = useState(true);
  const [titleInputValue, setTitleInputValue] = useState('');
  const [descriptionInputValue, setDescriptionInputValue] = useState('');
  const [writtenDateInputValue, setWrittenDateInputValue] = useState('');
  const [deadlineInputValue, setDeadlineInputValue] = useState('');
  const [categories, setCategories] = useState([
    { id: 1, name: '개요' },
    { id: 2, name: '공지사항' },
  ]);
  const addCategory = () => {
    const id = categories.length + 1;
    const name = prompt('새로운 카테고리 이름을 입력하세요.');
    if (name) {
      const newCategory = { id, name };
      setCategories([...categories, newCategory]);
    }
  };

  const selectCategory = (id) => {
    setCategories(
      categories.map((category) =>
        category.id === id
          ? { ...category, selected: true }
          : { ...category, selected: false }
      )
    );
  };

  const deleteCategory = (id) => {
    if (id <= 2) {
      return;
    }
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // NoteCard에 전달할 props를 객체로 설정
    const noteCardProps = {
      title: titleInputValue,
      description: descriptionInputValue,
      writtenDate: writtenDateInputValue,
      modalOpen: modalClose,
      category: categories.find((category) => category.selected)?.name,
    };

    const createNoteCardComponent = ({
      title,
      description,
      date,
      modalOpen,
      category,
    }) => {
      return (
        <NoteCard
          title={title}
          description={description}
          date={date}
          modalOpen={modalOpen}
          category={category}
        />
      );
    };
    const noteCardComponent = createNoteCardComponent(noteCardProps);
    console.log(noteCardComponent);
  };

  // modalMode 0: 글 상세보기 모달
  // 1: 글 작성 모달
  // 2: 참여자 목록 모달(삭제)
  // 2: 설정 모달
  if (modalMode === 0) {
    return (
      <ReactModal
        className="projectModal"
        overlayClassName="projectModalOverlay"
        isOpen={isOpen}
      >
        <div className="closeModal" onClick={modalClose}>
          X
        </div>
        <section className="detailSection">
          <div>
            <div className="detailTitle" aria-label="글 제목">
              글제목Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
            <div className="detailescription">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              praesentium esse, pariatur, numquam, dolorem in labore ad atque
              quas asperiores commodi et quo dicta! Nulla adipisci porro
              officiis eaque aperiam. Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Excepturi, voluptate consectetur, nostrum odio
              laboriosam numquam, ex itaque dolor porro nam quisquam suscipit
              laborum esse mollitia! Cum reprehenderit necessitatibus eveniet
              neque!
            </div>
          </div>
          <div>
            <div className="detailWriter">작성자sfasfsadfsadfassdfsfasf</div>
            <div className="detailDate">03-07-23</div>
          </div>
        </section>
        <div className="buttonContainer">
          <button className="editButton">수정</button>
          <button className="deleteButton">삭제</button>
        </div>
      </ReactModal>
    );
  } else if (modalMode === 1) {
    return (
      <ReactModal
        className="projectModal"
        overlayClassName="projectModalOverlay"
        isOpen={isOpen}
      >
        <h4>카테고리</h4>
        <div className="categoryContainer">
          {categories.map((category) => (
            <div
              className={`categoryItem ${category.selected ? 'selected' : ''}`}
              key={category.id}
              onClick={() => selectCategory(category.id)}
              onDoubleClick={() => deleteCategory(category.id)}
            >
              {category.name}
            </div>
          ))}
          <div className="categoryItem addCategory" onClick={addCategory}>
            +
          </div>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="inputGroup">
            <label htmlFor="noteTitle">글 제목</label>
            <input
              id="noteTitle"
              type="text"
              value={titleInputValue}
              onChange={(e) => setTitleInputValue(e.target.value)}
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="noteDescription">글 내용</label>
            <textarea
              id="noteDescription"
              value={descriptionInputValue}
              onChange={(e) => setDescriptionInputValue(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="noteWrittenDate">작성일</label>
            <input
              id="noteWrittenDate"
              type="date"
              value={writtenDateInputValue}
              onChange={(e) => setWrittenDateInputValue(e.target.value)}
            />
            <button className="writeNoteButton" type="submit">
              작성 완료
            </button>
          </div>
        </form>
        <div className="closeModal" onClick={modalClose}>
          X
        </div>
      </ReactModal>
    );
  } else if (modalMode === 2) {
    const handleTabClick = (e) => {
      setIsGeneralTabSelected(e.target.id === 'general-tab');
    };

    const handleTitleInputChange = (e) => {
      setTitleInputValue(e.target.value);
    };

    const handleDescriptionInputChange = (e) => {
      setDescriptionInputValue(e.target.value);
    };

    const handleDeadlineInputChange = (e) => {
      setDeadlineInputValue(e.target.value);
    };

    const handleFormSubmit = (e) => {
      e.preventDefault();
      // 폼 제출 시 처리할 함수
    };
    return (
      <ReactModal
        className="projectModal"
        overlayClassName="projectModalOverlay"
        isOpen={isOpen}
      >
        <div className="settingModalContent">
          <div className="settingModalSidebar">
            <ul>
              <li
                id="general-tab"
                className={isGeneralTabSelected ? 'active' : ''}
                onClick={handleTabClick}
              >
                일반
              </li>
              <li
                id="member-tab"
                className={!isGeneralTabSelected ? 'active' : ''}
                onClick={handleTabClick}
              >
                멤버 관리
              </li>
            </ul>
          </div>
          <div className="settingModalMain">
            {isGeneralTabSelected && (
              <form onSubmit={handleFormSubmit}>
                <div className="inputGroup">
                  <label htmlFor="project-title">프로젝트 제목</label>
                  <input
                    id="project-title"
                    type="text"
                    value={titleInputValue}
                    onChange={handleTitleInputChange}
                  />
                </div>
                <div className="inputGroup">
                  <label htmlFor="project-description">프로젝트 설명</label>
                  <textarea
                    id="project-description"
                    value={descriptionInputValue}
                    onChange={handleDescriptionInputChange}
                  />
                </div>
                <div className="inputGroup">
                  <label htmlFor="project-deadline">데드라인</label>
                  <input
                    id="project-deadline"
                    type="date"
                    value={deadlineInputValue}
                    onChange={handleDeadlineInputChange}
                  />
                </div>
                <button className="saveClose" type="submit">
                  저장
                </button>
              </form>
            )}
            {!isGeneralTabSelected && (
              <div class="memberManagement">
                <h2>멤버 관리</h2>
                <ul>
                  <li>사용자 1</li>
                  <li>사용자 2</li>
                  <li>사용자 3</li>
                </ul>
                <button>추가</button>
              </div>
            )}
          </div>
        </div>
        <button className="settingClose" onClick={modalClose}>
          닫기
        </button>
      </ReactModal>
    );
  }
};

export default ProjectModal;
