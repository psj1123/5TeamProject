import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../../Styles/ListModal.css';
import './ProjectListModal.css';

function ProjectListModalAdd({setModalIsOpen, createProject}) {
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
    /* 마감일 오체크 확인을 위한 시간 함수  */
    const today = new Date();
    let dday = new Date(input_deadline.current.value).getTime();
    let gap = dday - today;
    let result = Math.floor(gap / (1000 * 60 * 60 * 24)) + 1; // 밀리초를 일수로 변경하는 식

    if (
      // 프로젝트 이름,내용,마감일이 모두 입력이 되고
      input_name.current.value !== '' &&
      input_contents.current.value !== '' &&
      input_deadline.current.value !== '' &&
      result > 0 // 마감일이 내일 이후로 선택 되었다면
    ) {
      const nextProjects = {
        title: input_name.current.value,
        description: input_contents.current.value,
        deadline: input_deadline.current.value,
      };
      input_name.current.value = '';
      input_contents.current.value = '';
      input_deadline.current.value = '';
      setModalIsOpen(false); // 입력 완료시 모달창 닫기
      createProject(nextProjects);
    } else if (input_name.current.value === '' ||
    input_contents.current.value === '' ||
    input_deadline.current.value === '')
      {
      if (input_name.current.value === '') {
        alert('프로젝트명을 입력해주세요!');
        input_name.current.focus();
      } else if (input_contents.current.value === '') {
        alert('프로젝트 내용을 입력해주세요!');
        input_contents.current.focus();
      } else {
        alert('프로젝트 마감일을 선택해주세요!');
      }
    } else if (result <= 0) {
      // 마감일이 오늘 이전으로 체크 되었다면
      alert('마감일을 다음 날 이후로 체크해 주세요!');
    } 
    
  };
  return (
    <Form>
      {/* 프로젝트 이름 입력 */}
      <Form.Group className="mb-3 addTop" controlId="formBasicEmail">
        <Form.Label>프로젝트명</Form.Label>
        <Form.Control
          onChange={change}
          onKeyDown={handleKeyPress}
          name="project"
          ref={input_name}
          autoFocus
          placeholder="프로젝트 이름"
        />
        <Form.Text className="text-muted">
          생성하려는 프로젝트명을 적어주세요.
        </Form.Text>
      </Form.Group>

      {/* 프로젝트 내용 입력 */}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>프로젝트 내용</Form.Label>
        <Form.Control
          onChange={change}
          onKeyDown={handleKeyPress}
          name="contents"
          ref={input_contents}
          placeholder="프로젝트 내용"
        />
        <Form.Text className="text-muted">
          프로젝트 내용을 간단히 적어주세요.
        </Form.Text>
      </Form.Group>

      {/* 프로젝트 기간 입력 */}
      <Form.Group className="mb-3" controlId="formBasicContents">
        <Form.Label>마감일</Form.Label>
        <Form.Control
          type="date"
          name="deadline"
          placeholder="Write Deadline"
          onChange={change}
          ref={input_deadline}
        />
        <Form.Text className="text-muted">마감일을 체크해주세요.</Form.Text>
      </Form.Group>

      {/* --- 제출 버튼--- */}
      <Button
        variant="primary"
        type="button"
        onClick={onInsert}
        className="submit"
      >
        저장
      </Button>

      {/* --- 리셋 버튼--- */}
      <Button
        variant="secondary"
        style={{ marginLeft: '5px' }}
        type="reset"
        className="reset"
      >
        초기화
      </Button>

      {/* --- 나가기 버튼--- */}
      <Button
        name="exit"
        className="exit"
        variant="secondary"
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

export default ProjectListModalAdd;