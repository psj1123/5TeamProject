import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import ProjectCards from './MyProjectsList/ProjectsListCards';
import MyProjectsListModalAdd from './MyProjectsList/MyProjectsListModalAdd';
import MyProjectsListModalJoin from './MyProjectsList/MyProjectsListModalJoin';
import '../Styles/ProjectsList.css';

function MyProjectsList() {
  const loginEmail = window.sessionStorage.getItem('email');
  const loginNickname = window.sessionStorage.getItem('nickname');

  const [modalIsOpen, setModalIsOpen] = useState(false); // 프로젝트 추가 모달 State
  const [modalIsOpen1, setModalIsOpen1] = useState(false); // 프로젝트 참여 모달 State
  const [joinedProjectlist, setJoinedProjectlist] = useState([]); // 참여 중인 프로젝트 리스트
  const [pjList, setPjList] = useState(false); // 참여 중인 프로젝트가 없으면 false, 있으면 true

  // 최초 페이지 접근 시 참여중인 프로젝트 리스트 불러오기
  useEffect(() => {
    getJoinedlist();
  }, []);

  // 참여중인 프로젝트 리스트 불러오기
  const getJoinedlist = () => {
    axios
      .get(`/myprojectslist?email=${loginEmail}`, {})
      .then((res) => {
        const { data } = res;
        // 참여 중인 프로젝트가 없음
        if (data === '') {
          setPjList(false);
          return;
        } // 참여 중인 프로젝트가 있음
        else {
          setJoinedProjectlist(data);
          setPjList(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 프로젝트 생성하기
  const createProject = (data) => {
    axios
      .post(`/createProjectProcess`, {
        title: data.title,
        description: data.description,
        creatoremail: loginEmail, // 로그인 중인 유저 이메일
        deadline: data.deadline,
      })
      .then((res) => {
        const { data } = res;
        if (data === 1) {
          getJoinedlist();
        } else {
          alert('예기치 않은 오류가 발생했습니다.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 프로젝트 참여하기
  const joinProject = (code) => {
    axios
      .post(`/joinProjectProcess`, {
        code: code,
        email: loginEmail,
      })
      .then((res) => {
        const { data } = res;
        if (data === -1) {
          alert('존재하지 않는 프로젝트 코드입니다.');
        } else if (data === 0) {
          alert('이미 참여 중인 프로젝트입니다.');
        } else if (data === 1) {
          setModalIsOpen1(false);
          getJoinedlist();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 프로젝트 탈퇴하기
  const exitProject = (code) => {
    axios
      .post(`/exitProjectProcess`, {
        code: code,
        email: loginEmail,
      })
      .then((res) => {
        const { data } = res;
        if (data === 1) {
          getJoinedlist();
        } else {
          alert('본인이 생성한 프로젝트는 탈퇴할 수 없습니다.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <section>
      {/* --------- 상단 , 참여중인 프로젝터 --------- */}
      <div className="Project_Container">
        <div className="Project_Name">
          <h4>
            {loginNickname}님!
            <br />
            프로젝트를 생성하거나 참여해보세요
          </h4>
        </div>
        <div>
          <Container className="listBorderTop">
            <Row className="row">
              <Col sm={2} className="ProjectContent">
                <br />
                <div className="projectButton">
                  {/* ----- 프로젝트 [추가] 모달창 구현 , 버튼 ----- */}
                  <div className="addModalh">
                    <Button
                      className="btn_add"
                      variant="outline-secondary"
                      onClick={() => setModalIsOpen(true)}
                    >
                      프로젝트 생성
                    </Button>
                    <Modal
                      className="addModal addmodalBody"
                      isOpen={modalIsOpen}
                      onRequestClose={() => setModalIsOpen(false)}
                    >
                      <div className="projectAdd">
                        <MyProjectsListModalAdd
                          setModalIsOpen={setModalIsOpen}
                          createProject={createProject}
                        />
                      </div>
                    </Modal>
                    {/* ----- 프로젝트 [추가] 모달창 구현 ----- */}
                  </div>
                  <br />
                  {/* ----- 프로젝트 [참여] 모달창 구현 , 버튼 ----- */}
                  <div className="addModalh1">
                    <Button
                      className="btn_join"
                      variant="outline-secondary"
                      onClick={() => setModalIsOpen1(true)}
                    >
                      프로젝트 참여
                    </Button>
                    <Modal
                      className="joinModal joinmodalBody"
                      isOpen={modalIsOpen1}
                      onRequestClose={() => setModalIsOpen1(false)}
                    >
                      <div>
                        <MyProjectsListModalJoin
                          setModalIsOpen={setModalIsOpen1}
                          joinProject={joinProject}
                        />
                      </div>
                    </Modal>
                  </div>
                  {/* ----- 프로젝트 [참여] 모달창 구현 ----- */}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      {/* --------- 참여중인 프로젝트 --------- */}
      <div className="listSection" align="center">
        <div className="Project_Container">
          {pjList ? (
            <>
              <div className="Project_Name">
                <h4>참여중인 프로젝트로 가보아요</h4>
              </div>
              <div className="top_Project">
                <Container className="listBorderBottom">
                  <Row>
                    {joinedProjectlist[0] !== undefined &&
                      joinedProjectlist.map((project) => {
                        return (
                          <ProjectCards
                            key={project.code}
                            project={project}
                            exitProject={exitProject}
                          />
                        );
                      })}
                  </Row>
                </Container>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
}

export default MyProjectsList;
