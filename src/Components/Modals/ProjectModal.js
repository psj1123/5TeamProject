import React, { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import '../../Styles/ProjectModal.css';
import axios from 'axios';

const ProjectModal = ({
  isOpen,
  modalClose,
  userlist,
  loadUserlist,
  reSettingProject,
  projectInfo,
  selectedCategory,
  deleteProject,
  state,
  pageload,
}) => {
  const [isGeneralTabSelected, setIsGeneralTabSelected] = useState(true);

  const settingTitleRef = useRef();
  const settingDescriptionRef = useRef();
  const settingDeadlineRef = useRef();

  const addUser = (targetEmail) => {
    axios
      .post(`/project/${projectInfo.code}/${selectedCategory}/addUserProcess`, {
        code: projectInfo.code,
        email: targetEmail,
      })
      .then((res) => {
        if (res.data === -1) {
          alert('존재하지 않는 유저입니다.');
        } else if (res.data === 0) {
          alert('이미 참여중인 유저입니다.');
        } else if (res.data === 1) {
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loadUserlist();
      });
  };

  const kickUser = (targetEmail) => {
    axios
      .post(
        `/project/${projectInfo.code}/${selectedCategory}/kickUserProcess`,
        {
          code: projectInfo.code,
          email: targetEmail,
        }
      )
      .then((res) => {
        if (res.data === 1) {
        }
      })
      .finally(loadUserlist());
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
};

export default React.memo(ProjectModal);
