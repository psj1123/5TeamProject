import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './list.css';

function Managedlist(props) {
  let Navigate = useNavigate();
  let find = props.list.find((x) => x.id == props.list[props.num].id);
  const onClick = () => {
    Navigate('/project/' + find.id);
  };

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
            <div className="listCard" style={{ minHeight: '160px' }}>
              <Card.Header align="center">프로젝트</Card.Header>
              <Card.Body>
                <Card.Title align="center" className="listHeadEllipsis">
                  <h4>{props.list[props.num].projectName}</h4>
                </Card.Title>
                <Card.Text
                  align="center"
                  className="listHeadEllipsis"
                  style={{ marginTop: '-10px' }}
                >
                  {props.list[props.num].content}
                </Card.Text>
                <h6
                  align="center"
                  className="listHeadEllipsis"
                  style={{ marginTop: '10px' }}
                >
                  {props.list[props.num].deadline}
                </h6>
              </Card.Body>
            </div>
          </Card>
        </Col>
      ) : null}
    </>
  );
}

export default Managedlist;
