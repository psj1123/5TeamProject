import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../../Styles/ListModal.css';

function ProjectListModalJoin(props) {
  const input_name = useRef('');
  const change = (e) => {
    console.log(e.target.name, ':', e.target.value);
  };
  const onInsert = () => {
    let find = props.list.findIndex(
      // Input 내용과 일치하는 프로젝트명의 data를 찾음
      (x) => x.projectName == input_name.current.value
    );
    if (
      // 프로젝트 이름이 입력되고, 입력된 값의 이름이 데이터에 존재하면 실행
      input_name.current.value !== '' &&
      find !== -1 &&
      props.list[find].join === 0
    ) {
      let copy = [...props.list];
      copy[find].join = 1;
      props.setList(copy);

      input_name.current.value = '';
      props.setModalIsOpen(false);
    } else if (input_name.current.value === '') {
      // 입력이 주어지지 않으면
      alert('프로젝트명을 입력해주세요!');
      input_name.current.focus();
    } else if (input_name.current.value !== '' && find === -1) {
      // 입력값과 일치하는 프로젝트명이 없으면
      alert('일치하는 프로젝트명이 없습니다!');
    } else {
      alert('이미 참여중인 프로젝트 입니다!');
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
          ref={input_name}
          placeholder="프로젝트 이름"
          autoFocus
        />
        <Form.Text className="text-muted">
          참여하려는 프로젝트명을 적어주세요.
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
          props.setModalIsOpen(false);
        }}
      >
        나가기
      </Button>
    </Form>
  );
}

export default ProjectListModalJoin;
