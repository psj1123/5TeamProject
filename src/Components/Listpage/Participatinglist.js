import React, { useState } from 'react';
import { Col, Card, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Cards.css';

const Participatinglist = (props) => {
  let Navigate = useNavigate();
  // 배열의 props.num 번째에 위치한 id의 값을 가진 객체의 정보를 가져옴
  let find = props.list.find((x) => x.id == props.list[props.num].id);

  const onClick = () => {
    // 가져온 객체의 id 페이지로 이동
    Navigate('/project/' + find.id);
  };

  /* D-day를 위한 시간 함수  */
  const today = new Date();
  let dday = new Date(props.list[props.num].deadline).getTime();
  let gap = dday - today;
  let result = Math.floor(gap / (1000 * 60 * 60 * 24)) + 1; // 밀리초를 일수로 변경하는 식

  return (
    <>
      {props.list[props.num].join === 1 ? (
        <Col className="" sm={2}>
          <Card
            bg={'Light'.toLowerCase()}
            style={{ width: '11rem' }}
            className="mb-2"
            onClick={onClick}
          >
            <div className="listCard" style={{ minHeight: '160px' }}>
              <Card.Header align="center" className="header">
                프로젝트
              </Card.Header>
              <Card.Body>
                <Card.Title align="center" className="ellipsis">
                  <h4>{props.list[props.num].projectName}</h4>
                </Card.Title>
                <Card.Text
                  align="center"
                  className="ellipsis"
                  style={{ marginTop: '-10px' }}
                >
                  {props.list[props.num].content}
                </Card.Text>
                <h6
                  align="center"
                  className="ellipsis"
                  style={{ marginTop: '10px' }}
                >
                  {result !== 0 ? 'D-' + result : 'D-day'}
                </h6>
              </Card.Body>
            </div>
          </Card>
        </Col>
      ) : null}
    </>
  );
};

export default Participatinglist;
