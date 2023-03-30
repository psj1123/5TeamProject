import React, { useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Header from '../Components/Header.js';
import Footer from '../Components/Footer.js';
import './../Styles/Login.css';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const loginEmail = window.sessionStorage.getItem('email');

  // 로그인 유효성 검사
  const loginCheck = () => {
    if (emailRef.current.value === '') {
      alert('이메일을 입력해주세요.');
    } else if (passwordRef.current.value === '') {
      alert('비밀번호를 입력해주세요.');
    } else {
      loginProcess();
    }
  };

  // 로그인
  const loginProcess = () => {
    axios
      .post('/loginProcess', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        if (res.data === -1) {
          emailRef.current.value = '';
          emailRef.current.focus();
          alert('존재하지 않는 이메일입니다.');
        } else if (res.data === 0) {
          passwordRef.current.value = '';
          passwordRef.current.focus();
          alert('비밀번호가 올바르지 않습니다.');
        } else {
          window.sessionStorage.setItem('email', res.data[0].email);
          window.sessionStorage.setItem('nickname', res.data[0].nickname);
          navigate('/myprojectslist?email=' + res.data[0].email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 로그인한 상태라면 자신의 프로젝트 리스트 페이지로 이동
  if (loginEmail !== null) {
    const myprojectslist = '/myprojectslist?email=' + loginEmail;
    return <Navigate to={myprojectslist} replace={true} />;
  } else {
    return (
      <>
        <Header page={'Login'} />
        <section>
          <div className="login-container">
            <div className="login-image">
              <img src="img/LoginImage.png" alt="login" />
            </div>

            <div className="login-form">
              <h2>Jellabo</h2>

              <br />

              <div className="login-form-input">
                <input
                  type="email"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      passwordRef.current.focus();
                    }
                  }}
                  placeholder=" 이메일"
                  ref={emailRef}
                />
              </div>

              <div className="login-form-input">
                <input
                  type="password"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      loginCheck();
                    }
                  }}
                  placeholder=" 비밀번호"
                  ref={passwordRef}
                />
              </div>

              <div className="login-form-button">
                <button onClick={loginCheck}>로그인</button>
              </div>

              <div className="signup">
                <p>계정이 아직 없으신가요?</p>
              </div>

              <div className="signup-link">
                <div>
                  <Link to="/register">
                    <p>회원가입</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }
};

export default Login;
