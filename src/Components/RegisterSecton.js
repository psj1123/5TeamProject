/* eslint-disable no-restricted-globals */
import React, { useRef } from 'react';
import '../Styles/Register.css';
import axios from 'axios';

const RegisterSection = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const nameRef = useRef();
  const nicknameRef = useRef();
  const dateOfBirthRef = useRef();

  //여기에도 사용자가 양식을 제출할 때 등록 완료됨을 알림 수 있음
  const handleFormSubmit = () => {
    // 여기서 회원가입 정보를 데이터베이스에 저장
    axios
      .post('/register/commit', {
        email: emailRef.current.value,
        password1: passwordRef.current.value,
        name: nameRef.current.value,
        nickname: nicknameRef.current.value,
        birthday: dateOfBirthRef.current.value,
      })
      .then((res) => {
        if (res.data === 0) {
          alert('이미 등록된 이메일입니다.');
        } else {
          alert('회원가입이 완료되었습니다.\n\n로그인 화면으로 이동합니다.');
          window.location.assign('/login');
        }
      })
      .catch((error) => {
        alert('예상치 못한 오류가 발생했습니다. ' + error.message);
      });
  };

  const handleButtonClick = () => {
    try {
      switch (true) {
        case !emailRef.current.value ||
          !passwordRef.current.value ||
          !confirmPasswordRef.current.value ||
          !nameRef.current.value ||
          !nicknameRef.current.value ||
          !dateOfBirthRef.current.value:
          alert('입력하지 않은 항목이 존재합니다.');
          break;
        case !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
          passwordRef.current.value
        ):
          alert('비밀번호는 8자 이상, 대/소문자와 숫자가 포함되어야 합니다.');
          passwordRef.current.value = '';
          passwordRef.current.focus();
          break;
        case passwordRef.current.value !== confirmPasswordRef.current.value:
          alert('두 비밀번호가 일치하지 않습니다.');
          passwordRef.current.value = '';
          confirmPasswordRef.current.value = '';
          passwordRef.current.focus();
          break;
        case !/\S+@\S+\.\S+/.test(emailRef.current.value):
          alert('이메일 양식이 올바르지 않습니다.');
          emailRef.current.value = '';
          emailRef.current.focus();
          break;
        default:
          handleFormSubmit();
          break;
      }
    } catch (e) {
      alert('예상치 못한 오류가 발생했습니다.' + e);
      return;
    }
  };

  return (
    <>
      <section>
        <form className="register_form" onSubmit={handleFormSubmit}>
          <br />
          <h1>회원가입</h1>

          <div className="inputContainer">
            <div className="inputName">
              <label htmlFor="email">Email</label>
            </div>
            <div className="inputbox">
              <input
                type="email"
                id="email"
                placeholder="이메일을 입력하세요"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    passwordRef.current.focus();
                  }
                }}
                ref={emailRef}
              />
            </div>
          </div>

          <div className="inputContainer">
            <div className="inputName">
              <label htmlFor="password">비밀번호</label>
            </div>
            <div className="inputbox">
              <input
                type="password"
                id="password"
                placeholder="비밀번호"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    confirmPasswordRef.current.focus();
                  }
                }}
                ref={passwordRef}
              />
            </div>
          </div>

          <div className="inputContainer">
            <div className="inputName">
              <label htmlFor="confirmPassword">비밀번호 확인</label>
            </div>
            <div className="inputbox">
              <input
                type="password"
                id="confirmPassword"
                placeholder="비밀번호 확인"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    nameRef.current.focus();
                  }
                }}
                ref={confirmPasswordRef}
              />
            </div>
          </div>

          <div className="inputContainer">
            <div className="inputName">
              <label htmlFor="name">이름</label>
            </div>
            <div className="inputbox">
              <input
                type="text"
                id="name"
                placeholder="이름"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    nicknameRef.current.focus();
                  }
                }}
                ref={nameRef}
              />
            </div>
          </div>

          <div className="inputContainer">
            <div className="inputName">
              <label htmlFor="nickname">닉네임</label>
            </div>
            <div className="inputbox">
              <input
                type="text"
                id="nickname"
                placeholder="활동할 닉네임"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    dateOfBirthRef.current.focus();
                  }
                }}
                ref={nicknameRef}
              />
            </div>
          </div>

          <div className="inputContainer">
            <div className="inputName">
              <label htmlFor="dateOfBirth">생년월일</label>
            </div>
            <div className="inputbox">
              <input
                type="date"
                id="dateOfBirth"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleButtonClick();
                  }
                }}
                ref={dateOfBirthRef}
              />
            </div>
          </div>
          <br />

          <div className="inputContainer">
            <button className="registerSubmit" onClick={handleButtonClick}>
              회원가입
            </button>
          </div>
        </form>
        <div className="inputContainer2">
          <br />
          <p>
            위의 "회원가입" 버튼을 클릭하면 Jellabo의 이용약관 및
            개인정보보호정책을 읽고
            <br />
            이해했으며 그에 동의하는 것으로 간주합니다.
          </p>
        </div>
      </section>
    </>
  );
};

export default RegisterSection;
