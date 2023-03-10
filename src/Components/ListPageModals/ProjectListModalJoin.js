import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../../Styles/ListModal.css';

function ProjectListModalJoin({setModalIsOpen, joinProject}) {
  const input_code = useRef('');
  const change = (e) => {
    console.log(e.target.name, ':', e.target.value);
  };
  const onInsert = () => {
    if (input_code.current.value === '') {
      // 입력이 주어지지 않으면
      alert('프로젝트 코드를 입력해주세요!');
      input_code.current.focus();
      return;
    } else {
      
      joinProject(input_code.current.value)
    }
  };

  return (
    <Form>
      {/* ---프로젝트 이름 입력--- */}
      <Form.Group className="mb-3 joinTop" controlId="formBasicEmail">
        <Form.Label>프로젝트 이름</Form.Label>
        {/* 엔터키 버그 해결을 위한 보이지 않는 인풋 */}
        <input type="text" style={{ display: 'none' }} />
        <Form.Control
          onChange={change}
          ref={input_code}
          placeholder="프로젝트 코드"
          autoFocus
        />
        <Form.Text className="text-muted">
          참여하려는 프로젝트의 코드를 입력해주세요.
        </Form.Text>
      </Form.Group>
      {/* ---프로젝트 이름 입력--- */}

      {/* --- 제출 버튼--- */}
      <Button
        variant="primary"
        type="button"
        className="submit"
        onClick={onInsert}
      >
        저장
      </Button>

      {/* --- 리셋버튼--- */}
      <Button
        variant="secondary"
        style={{ marginLeft: '5px' }}
        type="reset"
        className="reset"
      >
        초기화
      </Button>

      {/* --- 나가기버튼--- */}
      <Button
        variant="secondary"
        className="exit"
        style={{ marginLeft: '100px' }}
        onClick={() => {
          setModalIsOpen(false);
        }}
      >
        나가기
      </Button>
    </Form>
  );
}

export default ProjectListModalJoin;