import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Managedlist from './Managedlist';
import Participatinglist from './Participatinglist';
import Modal from 'react-modal';
import ProjectListModalAdd from '../ListPageModals/ProjectListModalAdd';
import '../ListPageModals/ProjectListModal.css';
import '../../Styles/Cards.css';
import ProjectListModalJoin from '../ListPageModals/ProjectListModalJoin';
import axios from 'axios';

const Listpage = ({ state }) => {
  const forceUpdate = useRef(null);
  const [listBorder, setListBorder] = useState('');
  const [joinedProjectlist, setJoinedProjectlist] = useState({
    joinedProjectlist: [],
  });
  let havejoinedproject;

  useEffect(() => {
    // 불러올 리스트가 없을 때 보더라인을 지움
    if (joinedProjectlist.joinedProjectlist[0] === undefined) {
      setListBorder('');
    } else {
      setListBorder('listBorderTop');
    }

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
        havejoinedproject = false;
        return;
      } else {
        havejoinedproject = true;
        const { data } = res;
        setJoinedProjectlist({
          joinedProjectlist: data,
        });
      }
    });
  };

  // 프로젝트 생성하기
  const createProject = (data) => {
    axios.post(`/myprojectslist/${state.email}/createproject`, {
      title: data.title,
      description: data.description,
      deadline: data.deadline,
    })
    .then((res) => {
      if (res.data === 1) {
        alert('프로젝트 생성 성공')
      } else {
        alert('예기치 않은 오류로 프로젝트 생성에 실패했습니다.')
      }
    })
    .fianlly(() => {
      forceUpdate.current();
    })
  }

  // 프로젝트 참여하기
  const joinProject = (data) => {
    axios.post(`/myprojectslist/${state.email}/joinproject`, {code: data.code})
    .then((res) => {
      if (res.data === 0) {
alert('존재하지 않는 프로젝트 코드입니다.')
      } else if (res.data === 1) {
alert('이미 참여 중인 프로젝트입니다.')
      } else if (res.data === 2) {
alert('프로젝트 참여 성공')
setModalIsOpen1(false)
forceUpdate.current();
      }
    })
  }

  const [modalIsOpen, setModalIsOpen] = useState(false); // 프로젝트 추가 모달 State
  const [modalIsOpen1, setModalIsOpen1] = useState(false); // 프로젝트 참여 모달 State

  return (
    <>
      {/* --------- 상단 , 관리중인 프로젝터 --------- */}
      <div align="center" className="top">
        <h4>관리중인 프로젝트</h4>
      </div>
      <div>
        <Container className={listBorder}>
          <Row>
            {joinedProjectlist.joinedProjectlist[0] !== undefined && joinedProjectlist.joinedProjectlist.map((project) => {
              return <Managedlist key={project.code} project={project} state={state} />;
            })}
          </Row>
        </Container>
      </div>
      {/* --------- 상단 , 관리중인 프로젝터 --------- */}
      <hr align="center" />
      {/* --------- 하단 , 참여중인 프로젝터 --------- */}
      <div align="center">
        <h4>참여중인 프로젝트</h4>
      </div>
      <div>
        <Container>
          <Row>
            {/* {joinedProjectlist.joinedProjectlist.map((project) => {
              return <Participatinglist key={project.code} project={project} />;
            })} */}
            <Col sm={2}>
              <Card
                bg={'Light'.toLowerCase()}
                style={{ width: '11rem' }}
                className="mb-2"
              >
                <div>
                  <Card.Header align="center" className="header">
                    프로젝트 추가
                  </Card.Header>
                  <Card.Body align="center">
                    {/* ----- 프로젝트 추가 모달창 구현 ----- */}
                    <div style={{ marginTop: '7px' }}>
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
                        <div>
                          <ProjectListModalAdd
                            setModalIsOpen={setModalIsOpen}
                            createProject={createProject}
                          />
                        </div>
                      </Modal>
                      {/* ----- 프로젝트 추가 모달창 구현 ----- */}
                    </div>
                    {/* ----- 프로젝트 참여 모달창 구현 ----- */}
                    <div style={{ marginTop: '25px', marginBottom: '5px' }}>
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
                    {/* ----- 프로젝트 참여 모달창 구현 ----- */}
                  </Card.Body>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {/* --------- 하단 , 참여중인 프로젝터 --------- */}
    </>
  );
};

export default Listpage;
