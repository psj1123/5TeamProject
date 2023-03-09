import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserDataConsumer } from '../Contexts/UserData';
import Header from '../Components/Header.js';
import ReturnTop from '../Components/ReturnTop.js';
import ProjectSection from '../Components/ProjectSection';
import ProjectAside from '../Components/ProjectAside';
import Modal from '../Components/Modals/ProjectModal';

const Project = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState(0);

  const modalOpen = (e) => {
    console.log(e);
    if (e.target.innerText === '자세히 보기') {
      setModalMode(0);
    } else if (e.target.innerText === '글 작성') {
      setModalMode(1);
    } else if (e.target.innerText === '설정') {
      setModalMode(2);
    }
    setIsOpen(true);
  };

  const modalClose = () => {
    setIsOpen(false);
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
            <div>
              <Modal
                isOpen={isOpen}
                modalMode={modalMode}
                modalClose={modalClose}
              />
              <Header page={'Project'} />
              <ProjectAside
                isOpen={isOpen}
                modalMode={modalMode}
                modalOpen={modalOpen}
              />
              <ProjectSection
                isOpen={isOpen}
                modalMode={modalMode}
                modalOpen={modalOpen}
              />
              <ReturnTop />
            </div>
          );
        }
      }}
    </UserDataConsumer>
  );
};

export default Project;

// 이 밑으로 성준님 파일

// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import { Navigate } from 'react-router-dom';
// import Header from '../Components/Header.js';
// import { UserDataConsumer } from '../Contexts/UserData';
// import axios from 'axios';
// import 'react-quill/dist/quill.snow.css';
// import '../Styles/Project.css';

// const Project = () => {
//   const [content, setContent] = useState('');
//   const [deadline, setDeadline] = useState('');
//   const [categories, setCategories] = useState([
//     { id: 1, name: '개요' },
//     { id: 2, name: '공지사항' },
//   ]);

//   const addCategory = () => {
//     const id = categories.length + 1;
//     const name = prompt('새로운 카테고리 이름을 입력하세요.');
//     if (name) {
//       const newCategory = { id, name, selected: false }; // 선택 상태를 추가
//       setCategories([...categories, newCategory]);
//     }
//   };

//   const selectCategory = (id) => {
//     setCategories(
//       categories.map((category) =>
//         category.id === id
//           ? { ...category, selected: true }
//           : { ...category, selected: false }
//       )
//     );
//   };

//   const deleteCategory = (id) => {
//     if (id <= 2) {
//       // 개요와 공지사항은 삭제되지 않도록 조건문 추가
//       return;
//     }
//     setCategories(categories.filter((category) => category.id !== id));
//   };

//   const handleContentChange = (value) => {
//     setContent(value);
//   };

//   const handleDeadlineChange = (event) => {
//     setDeadline(event.target.value); // 입력값을 state에 저장
//   };

//   const handlePublish = () => {
//     const selectedCategories = categories.filter(
//       (category) => category.selected
//     );

//     const data = {
//       content: content,
//       deadline: deadline,
//       categories: selectedCategories,
//       author: '사용자명', // 변경해야 함
//     };
//     // axios
//     //   .post('전송할 URL', data)
//     //   .then((response) => {
//     //     console.log(response.data);
//     //   })
//     //   .catch((error) => {
//     //     console.log(error);
//     //   });
//     console.log(data);
//   };

//   return (
//     <UserDataConsumer>
//       {({ state }) => {
//         // 로그인 여부를 판단, 로그인되지 않은 상태라면 로그인 페이지로 강제 이동
//         if (!state.isLoggedIn) {
//           return <Navigate to="/login" replace={true} />;
//         } else {
//           // 정상적인 경우에 아래의 리턴문이 컴포넌트 결과로 출력됩니다.
//           return (
//             <>
//               <Header />
//               <div className="projectContainer">
//                 {/* aside 컴포넌트 */}
//                 <aside className="projectAside">
//                   <div className="projectContainer">
//                     <div className="projectAside">
//                       <div classNmae="projectMaster">
//                         <h2>프로젝트 작성자</h2>
//                         {/* 작성자 계정정보 */}
//                       </div>
//                       <div className="projectDeadlineContainer">
//                         마감기한
//                         <input
//                           type="date"
//                           value={deadline}
//                           onChange={handleDeadlineChange}
//                         />
//                       </div>
//                       <div className="projectCategoryList">
//                         카테고리
//                         {categories.map((category) => (
//                           <div
//                             className={`projectCategoryItem ${
//                               category.selected ? 'selected' : ''
//                             }`}
//                             key={category.id}
//                             onClick={() => selectCategory(category.id)}
//                             onDoubleClick={() => deleteCategory(category.id)} // 더블클릭 이벤트 리스너 등록
//                           >
//                             {category.name}
//                           </div>
//                         ))}
//                         <div className="projectCategoryItem projectAddCategory">
//                           <button
//                             className="addCategoryButton"
//                             onClick={addCategory}
//                           >
//                             +
//                           </button>
//                         </div>
//                       </div>
//                       <div className="projectButtonContainer">
//                         <button className="projectButton">설정</button>
//                         <button className="projectButton">참여자 목록</button>
//                         <button
//                           className="projectButton"
//                           onClick={handlePublish}
//                         >
//                           게시
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </aside>

//                 {/* ReactQuill 컴포넌트 */}
//                 <div className="projectQuillContainer">
//                   <ReactQuill
//                     className="projectQuill"
//                     onChange={handleContentChange}
//                     value={content}
//                   />
//                 </div>
//               </div>
//             </>
//           );
//         }
//       }}
//     </UserDataConsumer>
//   );
// };

// export default Project;
