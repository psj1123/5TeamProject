import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import Managedlist from './Managedlist';
import ProjectListModalAdd from '../ListPageModals/ProjectListModalAdd';
import ProjectListModalJoin from '../ListPageModals/ProjectListModalJoin';
import '../ListPageModals/ProjectListModal.css';
import '../../Styles/Cards.css';
import './list.css';

function Listpage({ state }) {
  const [modalIsOpen, setModalIsOpen] = useState(false); // 프로젝트 추가 모달 State
  const [modalIsOpen1, setModalIsOpen1] = useState(false); // 프로젝트 참여 모달 State
  const [joinedProjectlist, setJoinedProjectlist] = useState({
    joinedProjectlist: [], // 참여 중인 프로젝트 리스트
  });
  const [pjList, setPjList] = useState(false); // 참여 중인 프로젝트가 없으면 false, 있으면 true

  // 최초 페이지 접근 시 참여중인 프로젝트 리스트 불러오기
  useEffect(() => {
    getJoinedlist();
  }, []);

  // 참여중인 프로젝트 리스트 불러오기
  const getJoinedlist = () => {
    axios
      .get(`/myprojectslist/${state.email}`, {})
      .then((res) => {
        // 참여 중인 프로젝트가 없음
        if (res.data === 0) {
          setPjList(false);
          return;
        } // 참여 중인 프로젝트가 있음
        else {
          const { data } = res;
          setJoinedProjectlist({
            joinedProjectlist: data,
          });
          setPjList(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 프로젝트 생성하기
  const createProject = (data) => {
    axios
      .post(`/myprojectslist/${state.email}/createPjProcess`, {
        title: data.title,
        description: data.description,
        creatoremail: state.email, // 로그인 중인 유저 이메일
        deadline: data.deadline,
      })
      .then((res) => {
        if (res.data === 1) {
          getJoinedlist();
        } else {
          alert('예기치 않은 오류로 프로젝트 생성에 실패했습니다.');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 프로젝트 참여하기
  const joinProject = (data) => {
    axios
      .post(`/myprojectslist/${state.email}/joinPjProcess`, {
        email: state.email,
        code: data,
      })
      .then((res) => {
        if (res.data === -1) {
          alert('존재하지 않는 프로젝트 코드입니다.');
        } else if (res.data === 0) {
          alert('이미 참여 중인 프로젝트입니다.');
        } else if (res.data === 1) {
          setModalIsOpen1(false);
          getJoinedlist();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exitProject = (code) => {
    axios
      .post(`/myprojectslist/${state.email}/exitPjProcess`, {
        email: state.email,
        code: code,
      })
      .then((res) => {
        if (res.data === 1) {
          getJoinedlist();
        } else {
          alert('본인이 생성한 프로젝트는 탈퇴할 수 없습니다.');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section>
      {/* --------- 상단 , 참여중인 프로젝터 --------- */}
      <div className="Project_Container">
        <div className="Project_Name">
          <h4>
            {state.nickname}님!
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
                        <ProjectListModalAdd
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
                        <ProjectListModalJoin
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
          <div className="Project_Name">
            <h4>참여중인 프로젝트로 가보아요</h4>
          </div>
          {pjList ? (
            <div className="top_Project">
              <Container className="listBorderBottom">
                <Row>
                  {joinedProjectlist.joinedProjectlist[0] !== undefined &&
                    joinedProjectlist.joinedProjectlist.map((project) => {
                      return (
                        <Managedlist
                          key={project.code}
                          state={state}
                          project={project}
                          exitProject={exitProject}
                        />
                      );
                    })}
                </Row>
              </Container>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
}

export default Listpage;
