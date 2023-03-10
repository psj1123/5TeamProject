import React from 'react';
import { Card } from 'react-bootstrap';

function Cards(props) {
  return (
    <div>
      <Card
        bg={'Light'.toLowerCase()}
        className="mb-2"
      >
        <div className="test1">
          <Card.Header align="center">프로젝트</Card.Header>
          <Card.Body>
            <Card.Title align="center" className="ellipsis">
              <h4>이름1</h4>
            </Card.Title>
            <Card.Text
              align="center"
              className=""
              style={{ marginTop: '-10px' }}
            >
              이름2
            </Card.Text>
            <h6
              align="center"
              className="ellipsis"
              style={{ marginTop: '10px' }}
            >
              이름3
            </h6>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
}

export default Cards;
