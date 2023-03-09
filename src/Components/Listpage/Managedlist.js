import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './list.css';
import '../../Styles/Cards.css';

function Managedlist(props) {
  let Navigate = useNavigate();
  // 배열의 props.num 번째에 위치한 id의 값을 가진 객체의 정보를 가져옴
  let find = props.list.find((x) => x.id == props.list[props.num].id);
  const onClick = () => {
    Navigate('/project/' + find.id);
  };

  /* D-day를 위한 시간 함수  */
  const today = new Date();
  let dday = new Date(props.list[props.num].deadline).getTime();
  let gap = dday - today;
  let result = Math.floor(gap / (1000 * 60 * 60 * 24)) + 1; // 밀리초를 일수로 변경하는 식

  return (
    <>
      {props.list[props.num].management === 1 ? ( // management값이 1이면 관리중인 프로젝트에 보여짐
        <Col className="" sm={2}>
          <Card
            bg={'Light'.toLowerCase()}
            style={{ width: '11rem' }}
            className="mb-2"
            onClick={onClick}
          >
            <div className="listCard">
              {/* --- 카드 최상단 --- */}
              <Card.Header align="center" className="header">
                프로젝트
              </Card.Header>
              {/* --- 카드 최상단 --- */}

              <Card.Body>
                {/* --- 카드 상단 프로젝트 명 --- */}
                <Card.Title align="center" className="listHeadEllipsis">
                  <h4>{props.list[props.num].projectName}</h4>
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
                  {result !== 0 ? 'D-' + result : 'D-day'}
                </h6>
                {/* --- 카드 하단 프로젝트 마감일 --- */}
              </Card.Body>
            </div>
          </Card>
        </Col>
      ) : null}
    </>
  );
}

export default Managedlist;
