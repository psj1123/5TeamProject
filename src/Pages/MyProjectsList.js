// import React from 'react';
// import { Link, Navigate } from 'react-router-dom';
// import { UserDataConsumer } from '../Contexts/UserData';
// import Header from '../Components/Header.js';
// import Footer from '../Components/Footer.js';
// import ReturnTop from '../Components/ReturnTop';

// const MyProjectsList = () => {
//   return (
//     <UserDataConsumer>
//       {({ state }) => {
//         // 로그인 여부를 판단, 로그인되지 않은 상태라면 로그인 페이지로 강제 이동
//         if (!state.isLoggedIn) {
//           return <Navigate to="/login" replace={true} />;
//         } else {
//           // 정상적인 경우에 아래의 리턴문이 컴포넌트 결과로 출력됩니다.
//           return (
//             <div>
//               <Header page={'MyProjectList'} />
//               {/* 이곳에 프로젝트 리스트 섹션 컴포넌트 작성해주세요!!
//               테스트용*/}
//               <div
//                 style={{
//                   display: 'inline-block',
//                   backgroundColor: '#000000',
//                   color: '#ffffff',
//                   cursor: 'pointer',
//                 }}
//               >
//                 <Link to="/project">프로젝트</Link>
//               </div>
//               <ReturnTop />
//               <Footer />
//             </div>
//           );
//         }
//       }}
//     </UserDataConsumer>
//   );
// };

// export default MyProjectsList;

import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserDataConsumer } from '../Contexts/UserData';
import Header from '../Components/Header.js';
import Footer from '../Components/Footer.js';
import Modal from 'react-modal';

const MyProjectsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  /* modal 창 닫기 */

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  /* modal 창 내부 */

  const NewPostModal = () => {
    return (
      <div>
        <h1>작성할 내용</h1>
        <button onClick={handleModalClose}>X</button>
      </div>
    );
  };

  return (
    <UserDataConsumer>
      {({ state }) => {
        // 로그인 여부를 판단, 로그인되지 않은 상태라면 로그인 페이지로 강제 이동
        if (!state.isLoggedIn) {
          return <Navigate to="/login" replace={true} />;
        } else {
          // 정상적인 경우에 아래의 리턴문이 컴포넌트 결과로 출력됩니다.
          return (
            <div
              style={{
                marginTop: '120px',
              }}
            >
              <Header page={'MyProjectList'} />
              {/* 이곳에 프로젝트 리스트 섹션 컴포넌트 작성해주세요!! 
              테스트용*/}
              <button>
                <Link to="/project">프로젝트</Link>
              </button>
              <div>
                <button onClick={handleModalOpen}>새 프로젝트</button>
                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={handleModalClose}
                  contentLabel="새 프로젝트"
                >
                  <NewPostModal />
                </Modal>
              </div>
              <Footer />
            </div>
          );
        }
      }}
    </UserDataConsumer>
  );
};

export default MyProjectsList;
