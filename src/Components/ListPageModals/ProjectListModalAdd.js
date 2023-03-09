import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../../Styles/ListModal.css'
import './ProjectListModal.css'

function ProjectListModalAdd(props) {
  const input_name = useRef('');
  const input_contents = useRef('');
  const input_deadline = useRef('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // 앤터키 누르면 다음으로 이동, 내용을 입력안하면 이동 X
      if (e.target.name === 'project' && input_name.current.value !== '') {
        input_contents.current.focus();
      } else if (
        e.target.name === 'contents' &&
        input_contents.current.value !== ''
      ) {
        input_deadline.current.focus();
      }
    }
  };

  const change = (e) => {
    console.log(e.target.name, ':', e.target.value);
  };
  const onInsert = () => {
    let find = props.list.findIndex(
      // 이미 존재하는 프로젝트명이 있는지 검사하기 위한 코드
      (x) => x.projectName === input_name.current.value
    );
    if (
      // 프로젝트 이름,내용,마감일이 모두 입력이 되고 데이터에 동일한 프로젝트명이 없을 때
      input_name.current.value !== '' &&
      input_contents.current.value !== '' &&
      input_deadline.current.value !== '' &&
      find === -1
    ) {
      const nextProjects = props.list.concat({
        id: props.nextNum,
        projectName: input_name.current.value,
        content: input_contents.current.value,
        deadline: input_deadline.current.value,
        management: 1, // 유저가 직접 추가하므로 1 ( 1이 관리중인 프로젝트 )
        join: 0, // 생성시 자동참여 x 상태 default 값 0 ( 1이 참여중인 프로젝트 )
      });

      props.setList(nextProjects);
      props.setNextNum(props.nextNum + 1);
      console.log(props.nextNum);

      input_name.current.value = '';
      input_contents.current.value = '';
      input_deadline.current.value = '';
      props.setModalIsOpen(false); // 입력 완료시 모달창 닫기
    } else if (
      (input_name.current.value === '' ||
        input_contents.current.value === '' ||
        input_deadline.current.value === '') &&
      find === -1
    ) {
      if (input_name.current.value === '') {
        alert('프로젝트명을 입력해주세요!');
        input_name.current.focus();
      } else if (input_contents.current.value === '') {
        alert('프로젝트 내용을 입력해주세요!');
        input_contents.current.focus();
      } else {
        alert('프로젝트 마감일을 선택해주세요!');
      }
    } else {
      alert('이미 존재하는 프로젝트명 입니다!');
      input_name.current.focus();
    }
  };
  return (
    <Form>
      {/* 프로젝트 이름 입력 */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Project Name</Form.Label>
        <Form.Control
          onChange={change}
          onKeyDown={handleKeyPress}
          name="project"
          ref={input_name}
          autoFocus
          placeholder="Write Project Name"
        />
        <Form.Text className="text-muted">
          Please write down the name of the project you want.
        </Form.Text>
      </Form.Group>

      {/* 프로젝트 내용 입력 */}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contents</Form.Label>
        <Form.Control
          onChange={change}
          onKeyDown={handleKeyPress}
          name="contents"
          ref={input_contents}
          placeholder="Write Contents"
        />
        <Form.Text className="text-muted">
          Please write it down briefly.
        </Form.Text>
      </Form.Group>

      {/* 프로젝트 기간 입력 */}
      <Form.Group className="mb-3" controlId="formBasicContents">
        <Form.Label>Deadline</Form.Label>
        <Form.Control
          type="date"
          name="deadline"
          placeholder="Write Deadline"
          onChange={change}
          ref={input_deadline}
        />
        <Form.Text className="text-muted">
          Please write it down Deadline.
        </Form.Text>
      </Form.Group>

      {/* --- 제출 버튼--- */}
      <Button variant="primary" type="button" onClick={onInsert} className='submit'>
        Submit
      </Button>

      {/* --- 리셋 버튼--- */}
      <Button variant="secondary" style={{ marginLeft: '5px' }} type="reset">
        reset
      </Button>

      {/* --- 나가기 버튼--- */}
      <Button
        name='exit'
        className='exit'
        variant="secondary"
        style={{ marginLeft: '200px' }}
        onClick={() => {
          props.setModalIsOpen(false);
        }}
      >
        Exit
      </Button>
    </Form>
  );
}

export default ProjectListModalAdd;