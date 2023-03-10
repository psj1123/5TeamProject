import React, { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import '../../Styles/ProjectModal.css';
import axios from 'axios';

const ProjectModal = ({
  isOpen,
  modalMode,
  modalClose,
  setModalMode,
  reSettingProject,
  code,
  selectedCategory,
  projectInfo,
  deleteProject,
  categories,
  state,
  getposts,
  pageload,
  nowPost,
  setNowPost,
}) => {
  const [userlist, setUserlist] = useState([]);
  const [isGeneralTabSelected, setIsGeneralTabSelected] = useState(true);
  const forceUpdate = useRef(null);

  const createCategoryRef = useRef();
  const createTitleRef = useRef();
  const createContentRef = useRef();
  const createDeadlineRef = useRef();

  const updateCategoryRef = useRef();
  const updateTitleRef = useRef();
  const updateContentRef = useRef();
  const updateDeadlineRef = useRef();

  const settingTitleRef = useRef();
  const settingDescriptionRef = useRef();
  const settingDeadlineRef = useRef();

  useEffect(() => {
    loadUserlist();
  }, []);

  const loadUserlist = () => {
    axios
      .post(`/project/${code}/${selectedCategory}/userlist`, {})
      .then((res) => {
        const { data } = res;
        console.log(data);
        setUserlist(data);
      })
      .finally(() => {
        forceUpdate.current();
      });
  };

  const addUser = (targetEmail) => {
    console.log(targetEmail);
    axios
      .post(`/project/${code}/${selectedCategory}/adduser`, {
        email: targetEmail,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === 0) {
          alert('존재하지 않는 유저입니다.');
        } else if (res.data === 1) {
          alert('이미 참여중인 유저입니다.');
        } else if (res.data === 2) {
          alert('멤버 추가 성공');
        }
      })
      .finally(loadUserlist());
  };

  const kickUser = (targetEmail) => {
    axios
      .post(`/project/${code}/${selectedCategory}/kickuser`, {
        email: targetEmail,
      })
      .then((res) => {
        if (res.data === 1) {
          alert('멤버 추방 성공');
        }
      })
      .finally(loadUserlist());
  };

  const writePost = (postData) => {
    axios
      .post(`/project/${code}/${selectedCategory}/writepost/write`, {
        category: postData.category,
        posttitle: postData.title,
        postcontent: postData.content,
        postdeadline: postData.deadline,
        email: state.email,
      })
      .then((res) => {
        if (res.data === 1) {
          alert('등록 완료');
          createCategoryRef.current.value = '';
          createTitleRef.current.value = '';
          createContentRef.current.value = '';
          createDeadlineRef.current.value = '';
          modalClose();
          getposts();
          pageload();
        }
      })
      .finally(() => {
        forceUpdate.current();
      });
  };

  const updatePost = (postData) => {
    axios
      .post(`/project/${code}/${selectedCategory}/${nowPost.postnum}/update`, {
        category: postData.category,
        posttitle: postData.title,
        postcontent: postData.content,
        postdeadline: postData.deadline,
      })
      .then((res) => {
        if (res.data === 1) {
          alert('수정 완료');
          updateCategoryRef.current.value = '';
          updateTitleRef.current.value = '';
          updateContentRef.current.value = '';
          updateDeadlineRef.current.value = '';
          modalClose();
          getposts();
          pageload();
        }
      })
      .finally(() => {
        forceUpdate.current();
      });
  };

  const deletePost = () => {
    axios
      .post(
        `/project/${code}/${selectedCategory}/${nowPost.postnum}/delete`,
        {}
      )
      .then((res) => {
        if (res.data === 1) {
          alert('삭제 완료');
          modalClose();
          getposts();
          pageload();
        }
      })
      .finally(() => {
        forceUpdate.current();
      });
  };

  const projectResetting = () => {
    if (settingTitleRef.current.value === '') {
      alert('프로젝트 제목을 입력해주세요');
      settingTitleRef.current.focus();
      return;
    }
    if (settingDescriptionRef.current.value === '') {
      alert('프로젝트 설명을 입력해주세요');
      settingDescriptionRef.current.focus();
      return;
    }
    if (settingDeadlineRef.current.value === '') {
      alert('프로젝트 마감일을 입력해주세요');
      settingDeadlineRef.current.focus();
      return;
    }
    const data = {
      title: settingTitleRef.current.value,
      description: settingDescriptionRef.current.value,
      deadline: settingDeadlineRef.current.value,
    };
    reSettingProject(data);
  };

  const addUserBtn = () => {
    let checkCancel;
    let targetEmail;

    while (true) {
      targetEmail = prompt('추가할 멤버의 E-mail을 입력하세요.');
      if (targetEmail === null) {
        checkCancel = true;
        break;
      } else {
        checkCancel = false;
        break;
      }
    }

    if (checkCancel) {
      return;
    } else {
      return addUser(targetEmail);
    }
  };

  const kickUserBtn = (e) => {
    if (!window.confirm('이 멤버를 추방하시겠습니까?')) {
      return;
    } else {
      kickUser(e.target.id);
    }
  };

  const deleteProjectBtn = () => {
    if (!window.confirm('정말 프로젝트를 삭제하시겠습니까?')) {
      return;
    } else {
      deleteProject();
    }
  };

  const writePostBtn = () => {
    if (createCategoryRef.current.value === '') {
      alert('카테고리를 설정해주세요');
      createCategoryRef.current.focus();
      return;
    }
    if (createTitleRef.current.value === '') {
      alert('제목을 입력해주세요');
      createTitleRef.current.focus();
      return;
    }
    if (createContentRef.current.value === '') {
      alert('내용을 입력해주세요');
      createContentRef.current.focus();
      return;
    }
    if (createDeadlineRef.current.value === '') {
      alert('마감일을 입력해주세요');
      createDeadlineRef.current.focus();
      return;
    }

    const postData = {
      category: createCategoryRef.current.value,
      title: createTitleRef.current.value,
      content: createContentRef.current.value,
      deadline: createDeadlineRef.current.value,
    };

    writePost(postData);
  };

  const updatePostBtn = () => {
    if (updateCategoryRef.current.value === '') {
      alert('카테고리를 설정해주세요');
      updateCategoryRef.current.focus();
      return;
    }
    if (updateTitleRef.current.value === '') {
      alert('제목을 입력해주세요');
      updateTitleRef.current.focus();
      return;
    }
    if (updateContentRef.current.value === '') {
      alert('내용을 입력해주세요');
      updateContentRef.current.focus();
      return;
    }
    if (updateDeadlineRef.current.value === '') {
      alert('마감일을 입력해주세요');
      updateDeadlineRef.current.focus();
      return;
    }

    const postData = {
      category: updateCategoryRef.current.value,
      title: updateTitleRef.current.value,
      content: updateContentRef.current.value,
      deadline: updateDeadlineRef.current.value,
    };

    updatePost(postData);
  };

  const deletePostBtn = () => {
    if (!window.confirm('정말 이 글을 삭제하시겠습니까?')) {
      return;
    } else {
      deletePost();
    }
  };

  // modalMode
  // 0: 글 상세보기 모달 (글 수정, 삭제 버튼)
  // 1: 글 수정 모달
  // 2: 글 작성 모달
  // 3: 설정 모달
  if (modalMode === 0) {
    return (
      <ReactModal
        className="projectModal"
        overlayClassName="projectModalOverlay"
        isOpen={isOpen}
      >
        <div className="closeModal" onClick={modalClose}></div>
        <section className="detailSection">
          <div>
            <div className="detailTitle" aria-label="글 제목">
              {nowPost.posttitle}
            </div>
            <div className="detailescription">{nowPost.postcontent}</div>
          </div>
          <div>
            <div className="detailWriter">{nowPost.postwriter}</div>
            <div className="detailDate">{nowPost.postdate}</div>
          </div>
        </section>
        <div className="buttonContainer">
          <button
            className="editButton"
            onClick={() => {
              setModalMode(1);
            }}
          >
            수정
          </button>
          <button className="deleteButton" onClick={deletePostBtn}>
            삭제
          </button>
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
        <label htmlFor="selectCategory">
          <h4>카테고리</h4>
        </label>
        <div className="categoryContainer">
          <select
            name="category"
            id="selectCategory"
            defaultValue={nowPost.category}
            ref={updateCategoryRef}
          >
            <option value="">---- 선택 ----</option>
            {categories.categorieslist.map((category) => {
              return (
                <option key={category.category} value={category.category}>
                  {category.category}
                </option>
              );
            })}
          </select>
        </div>

        <div className="inputGroup">
          <label htmlFor="noteTitle">글 제목</label>
          <input
            id="noteTitle"
            type="text"
            maxLength="40"
            ref={updateTitleRef}
            defaultValue={nowPost.posttitle}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="noteDescription">글 내용</label>
          <textarea
            id="noteDescription"
            maxLength="5000"
            ref={updateContentRef}
            defaultValue={nowPost.postcontent}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="noteEndDate">마감일</label>
          <input id="noteEndDate" type="date" ref={updateDeadlineRef} />
        </div>

        <button className="updateNoteButton" onClick={updatePostBtn}>
          수정 완료
        </button>

        <div
          className="closeModal"
          onClick={() => {
            setNowPost({});
            modalClose();
          }}
        ></div>
      </ReactModal>
    );
  } else if (modalMode === 2) {
    return (
      <ReactModal
        className="projectModal"
        overlayClassName="projectModalOverlay"
        isOpen={isOpen}
      >
        <label htmlFor="selectCategory">
          <h4>카테고리</h4>
        </label>
        <div className="categoryContainer">
          <select name="category" id="selectCategory" ref={createCategoryRef}>
            <option value="">---- 선택 ----</option>
            {categories.categorieslist.map((category) => {
              return (
                <option key={category.category} value={category.category}>
                  {category.category}
                </option>
              );
            })}
          </select>
        </div>

        <div className="inputGroup">
          <label htmlFor="noteTitle">글 제목</label>
          <input
            id="noteTitle"
            type="text"
            maxLength="40"
            ref={createTitleRef}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="noteDescription">글 내용</label>
          <textarea
            id="noteDescription"
            maxLength="5000"
            ref={createContentRef}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="noteEndDate">마감일</label>
          <input id="noteEndDate" type="date" ref={createDeadlineRef} />
        </div>

        <button className="writeNoteButton" onClick={writePostBtn}>
          작성 완료
        </button>

        <div className="closeModal" onClick={modalClose}></div>
      </ReactModal>
    );
  } else if (modalMode === 3) {
    const handleTabClick = (e) => {
      setIsGeneralTabSelected(e.target.id === 'general-tab');
    };

    return (
      <ReactModal
        className="projectModal"
        overlayClassName="projectModalOverlay"
        isOpen={isOpen}
      >
        <div
          className="closeModal"
          onClick={() => {
            setIsGeneralTabSelected(true);
            modalClose();
          }}
        ></div>
        <div className="settingModalContainer">
          <div className="settingModalSidebar">
            <ul>
              <li
                id="general-tab"
                className={isGeneralTabSelected ? 'active' : ''}
                onClick={handleTabClick}
              >
                프로젝트 설정
              </li>
              <li
                id="member-tab"
                className={!isGeneralTabSelected ? 'active' : ''}
                onClick={handleTabClick}
              >
                멤버 관리 설정
              </li>
            </ul>
          </div>
          <div className="settingModalMain">
            {isGeneralTabSelected && (
              <>
                <h2>프로젝트 설정</h2>
                <div className="inputGroup">
                  <label htmlFor="project-title">프로젝트 제목</label>
                  <input id="project-title" type="text" ref={settingTitleRef} />
                </div>
                <div className="inputGroup">
                  <label htmlFor="project-description">프로젝트 설명</label>
                  <textarea
                    id="project-description"
                    ref={settingDescriptionRef}
                  />
                </div>
                <div className="inputGroup">
                  <label htmlFor="project-deadline">프로젝트 마감일</label>
                  <input
                    id="project-deadline"
                    type="date"
                    ref={settingDeadlineRef}
                  />
                </div>
                <div className="saveCloseContainer">
                  <button className="saveClose" onClick={projectResetting}>
                    저장
                  </button>
                </div>
                <div className="delProject" onClick={deleteProjectBtn}>
                  프로젝트 삭제
                </div>
              </>
            )}
            {!isGeneralTabSelected && (
              <div className="memberManagement">
                <h2>멤버 관리 설정</h2>
                <ul>
                  {userlist.map((user) => {
                    return (
                      <li key={user.email}>
                        <div>
                          {user.nickname}({user.name})
                        </div>
                        {user.email !== projectInfo.email && (
                          <div id={user.email} onClick={kickUserBtn}>
                            추방
                          </div>
                        )}
                        {user.email === projectInfo.email && (
                          <div
                            id={user.email}
                            style={{
                              width: '47px',
                              cursor: 'default',
                            }}
                          >
                            관리자
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <div className="addUserBtnContainer">
                  <button onClick={addUserBtn}>멤버 추가</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </ReactModal>
    );
  }
};

export default React.memo(ProjectModal);
