import React, { useRef, useState } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import '../../Styles/ProjectModal.css';

const ProjectModal = ({
  isOpen,
  modalClose,
  userlist,
  loadUserList,
  reSettingProject,
  projectInfo,
  deleteProject,
}) => {
  const [isGeneralTabSelected, setIsGeneralTabSelected] = useState(true);

  const settingTitleRef = useRef();
  const settingDescriptionRef = useRef();
  const settingDeadlineRef = useRef();

  const addUser = (targetEmail) => {
    axios
      .post('/addUserProcess', {
        code: projectInfo.code,
        email: targetEmail,
      })
      .then((res) => {
        const { data } = res;
        if (data === -1) {
          alert('존재하지 않는 유저입니다.');
        } else if (data === 0) {
          alert('이미 참여중인 유저입니다.');
        } else if (data === 1) {
          loadUserList();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const kickUser = (targetEmail) => {
    axios
      .post('/kickUserProcess', {
        code: projectInfo.code,
        email: targetEmail,
      })
      .then((res) => {
        const { data } = res;
        if (data === 1) {
          loadUserList();
        } else {
          alert('예기치 않은 오류가 발생했습니다.');
        }
      })
      .catch((err) => {
        console.error(err);
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
              멤버 관리
            </li>
          </ul>
        </div>
        <div className="settingModalMain">
          {isGeneralTabSelected && (
            <>
              <h2>프로젝트 설정</h2>
              <div className="inputGroup">
                <label htmlFor="project-title">프로젝트 제목</label>
                <input
                  id="project-title"
                  type="text"
                  defaultValue={projectInfo.title}
                  ref={settingTitleRef}
                />
              </div>
              <div className="inputGroup">
                <label htmlFor="project-description">프로젝트 설명</label>
                <textarea
                  id="project-description"
                  defaultValue={projectInfo.description}
                  ref={settingDescriptionRef}
                />
              </div>
              <div className="inputGroup">
                <label htmlFor="project-deadline">프로젝트 마감일</label>
                <input
                  id="project-deadline"
                  type="date"
                  defaultValue={projectInfo.deadline}
                  ref={settingDeadlineRef}
                />
              </div>
              <div className="saveCloseContainer">
                <button
                  className="saveClose"
                  onClick={() => {
                    projectResetting();
                    setIsGeneralTabSelected(true);
                    modalClose();
                  }}
                >
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
              <h2>멤버 관리</h2>
              <ul>
                {userlist.map((user) => {
                  return (
                    <li key={user.email}>
                      <div>
                        {user.nickname}({user.name})
                      </div>
                      {user.email !== projectInfo.creatoremail && (
                        <div
                          id={user.email}
                          className="kickUserBtn"
                          onClick={kickUserBtn}
                        >
                          추방
                        </div>
                      )}
                      {user.email === projectInfo.creatoremail && (
                        <div id={user.email} className="manager">
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
