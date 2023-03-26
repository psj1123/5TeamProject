import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Managedlist from './Managedlist';
import Modal from 'react-modal';
import ProjectListModalAdd from '../ListPageModals/ProjectListModalAdd';
import '../ListPageModals/ProjectListModal.css';
import '../../Styles/Cards.css';
import ProjectListModalJoin from '../ListPageModals/ProjectListModalJoin';
import './list.css';
import axios from 'axios';

function Listpage({ state }) {
  const [modalIsOpen, setModalIsOpen] = useState(false); // 프로젝트 추가 모달 State
  const [modalIsOpen1, setModalIsOpen1] = useState(false); // 프로젝트 참여 모달 State
  const [pjList, setPjList] = useState(false);
  const [joinedProjectlist, setJoinedProjectlist] = useState({
    joinedProjectlist: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        getJoinedlist();
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  // 참여중인 프로젝트 리스트 불러오기
  const getJoinedlist = () => {
    axios.post(`/myprojectslist/${state.email}/joinedlist`, {}).then((res) => {
      if (res.data === 0) {
        setPjList(false);
        return;
      } else {
        const { data } = res;
        setJoinedProjectlist({
          joinedProjectlist: data,
        });
        setPjList(true);
      }
    });
  };

  // 프로젝트 생성하기
  const createProject = (data) => {
    axios
      .post(`/myprojectslist/${state.email}/createproject`, {
        title: data.title,
        description: data.description,
        deadline: data.deadline,
      })
      .then((res) => {
        if (res.data === 1) {
          alert('프로젝트 생성 성공');
          getJoinedlist();
        } else {
          alert('예기치 않은 오류로 프로젝트 생성에 실패했습니다.');
        }
      });
  };

  // 프로젝트 참여하기
  const joinProject = (data) => {
    axios
      .post(`/myprojectslist/${state.email}/joinproject`, { code: data })
      .then((res) => {
        if (res.data === 0) {
          alert('존재하지 않는 프로젝트 코드입니다.');
        } else if (res.data === 1) {
          alert('이미 참여 중인 프로젝트입니다.');
        } else if (res.data === 2) {
          alert('프로젝트 참여 성공');
          setModalIsOpen1(false);
          getJoinedlist();
        }
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
                      프로젝트 추가
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
                          project={project}
                          state={state}
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
