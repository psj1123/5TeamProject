import React, { useState } from 'react';
import { Col, Card, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Participatinglist = (props) => {
  let Navigate = useNavigate();
  // 배열의 props.num 번째에 위치한 id의 값을 가진 객체의 정보를 가져옴
  let find = props.list.find((x) => x.id == props.list[props.num].id);

  const onClick = () => {
    // 가져온 객체의 id 페이지로 이동
    Navigate('/project/' + find.id);
  };

  return (
    <>
      {props.list[props.num].join == 1 ? ( // join값이 1이면 참여중인 프로젝트에 보여짐
        <Col className="" sm={2}>
          <Card
            bg={'Light'.toLowerCase()}
            style={{ width: '11rem' }}
            className="mb-2"
            onClick={onClick}
          >
            <div className="listCard" style={{ minHeight: '160px' }}>
              {/* --- 카드 최상단 --- */}
              <Card.Header align="center">프로젝트</Card.Header>
              {/* --- 카드 최상단 --- */}

              <Card.Body>
                {/* --- 카드 상단 프로젝트 명 --- */}
                <Card.Title align="center" className="listHeadEllipsis">
                  <h5>{props.list[props.num].projectName}</h5>
                </Card.Title>
                {/* --- 카드 상단 프로젝트 명 --- */}

                {/* --- 카드 중단 프로젝트 내용 --- */}
                <Card.Text
                  align="center"
                  className="listHeadEllipsis"
                  style={{ marginTop: '-10px' }}
                >
                  {props.list[props.num].content}
                </Card.Text>
                {/* --- 카드 중단 프로젝트 내용 --- */}

                {/* --- 카드 하단 프로젝트 마감일 --- */}
                <h6
                  align="center"
                  className="listHeadEllipsis"
                  style={{ marginTop: '10px' }}
                >
                  {props.list[props.num].deadline}
                </h6>
                {/* --- 카드 하단 프로젝트 마감일 --- */}
              </Card.Body>
            </div>
          </Card>
        </Col>
      ) : null}
    </>
  );
};

export default Participatinglist;
