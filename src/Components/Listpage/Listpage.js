import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Managedlist from './Managedlist';
import Participatinglist from './Participatinglist';
import Modal from 'react-modal';
import ProjectListModalAdd from '../ListPageModals/ProjectListModalAdd';
import '../ListPageModals/ProjectListModal.css';
import '../../Styles/Cards.css';
import ProjectListModalJoin from '../ListPageModals/ProjectListModalJoin';
import data from './data';
import './list.css';

function Listpage(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false); // 프로젝트 추가 모달 State
  const [modalIsOpen1, setModalIsOpen1] = useState(false); // 프로젝트 참여 모달 State

  let [list, setList] = useState([]); // 생성된 프로젝트 데이터를 다루는 State
  let [nextNum, setNextNum] = useState(1); // 생성된 프로젝트 데이터의  고유한 ID 부여를 위한 State

  let [listBorder, setListBorder] = useState('');
  useEffect(() => {
    // 프로젝트 테두리 border 컨트롤
    if (list.length === 0) {
      setListBorder('');
    } else {
      setListBorder('listBorderTop');
    }
  });

  return (
    <section>
      {/* --------- 상단 , 참여중인 프로젝터 --------- */}
      <div className="Project_Container">
        <div className="Project_Name">
          <h4> {props.nickname} 노트를 생성해보세요</h4>
        </div>
        <div>
          <Container className="listBorderTop">
            <Row className="row">
              {list.map(function (a, i) {
                return (
                  <Participatinglist key={i} num={i} list={list} con={a} />
                );
              })}
              <Col sm={2} className="ProjectContent">
                <Card
                  bg={'Light'.toLowerCase()}
                  style={{ width: '11rem' }}
                  className="mb-2 addCard"
                >
                  <br />
                  <div className="projectButton">
                    {/* ----- 프로젝트 [추가] 모달창 구현 , 버튼 ----- */}
                    <div className="addModalh">
                      <Button
                        className="btn_add"
                        variant="outline-secondary"
                        onClick={() => setModalIsOpen(true)}
                      >
                        노트 추가
                      </Button>
                      <Modal
                        className="addModal addmodalBody"
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                      >
                        <div className="projectAdd">
                          <ProjectListModalAdd
                            setModalIsOpen={setModalIsOpen}
                            list={list}
                            setList={setList}
                            nextNum={nextNum}
                            setNextNum={setNextNum}
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
                        협업 노트 참여
                      </Button>
                      <Modal
                        className="joinModal joinmodalBody"
                        isOpen={modalIsOpen1}
                        onRequestClose={() => setModalIsOpen1(false)}
                      >
                        <div>
                          <ProjectListModalJoin
                            setModalIsOpen={setModalIsOpen1}
                            list={list}
                            setList={setList}
                            nextNum={nextNum}
                            setNextNum={setNextNum}
                          />
                        </div>
                      </Modal>
                    </div>
                    {/* ----- 프로젝트 [참여] 모달창 구현 ----- */}
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      {/* --------- 상단 , 참여중인 프로젝터 --------- */}

      {/* --------- 하단 , 관리중인 프로젝터 --------- */}
      <div className="listSection" align="center">
        <div className="Project_Container">
          <div className="Project_Name">
            <h4>생성한 노트로 가보아요</h4>
          </div>
          <div className="top_Project">
            <Container className={listBorder}>
              <Row>
                {list.map(function (a, i) {
                  return <Managedlist key={i} num={i} list={list} con={a} />;
                })}
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Listpage;
