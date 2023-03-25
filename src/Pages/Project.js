import React, { useEffect, useState, useRef } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { UserDataConsumer } from '../Contexts/UserData';
import Header from '../Components/Header.js';
import ReturnTop from '../Components/ReturnTop.js';
import ProjectSection from '../Components/ProjectSection';
import ProjectAside from '../Components/ProjectAside';
import Modal from '../Components/Modals/ProjectModal';
import axios from 'axios';

/*!프로젝트 페이지 접근 시 D day 체크하고 오버된 페이지면 강제로 리스트페이지로 돌아가는 기능 추가하기 */

const Project = () => {
  const forceUpdate = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const code = location.state.code;
  const state = location.state.state;
  const [projectInfo, setProjectInfo] = useState({
    code: '',
    title: '',
    description: '',
    nickname: '',
    email: '',
    deadline: '',
  });
  const [categories, setCategories] = useState({ categorieslist: [] });
  const [selectedCategory, setSelectedCategory] = useState('★ 개요');
  const [posts, setPosts] = useState({ postslist: [] });
  const [isPostOpened, setIsPostOpened] = useState(false);
  const [isPostUpdating, setIsPostUpdating] = useState(false);
  const [isPostWriting, setIsPostWriting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        pageload();
        await getposts();
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [selectedCategory]);

  const pageload = () => {
    axios
      .post(`/project/${code}/${selectedCategory}`, {
        email: state.email,
      })
      .then((res) => {
        if (res.data === 0 || res.data === 1) {
          return;
        } else {
          const { data } = res;
          setProjectInfo({
            code: data[0].code,
            title: data[0].title,
            description: data[0].description,
            nickname: data[0].nickname,
            email: data[0].creatoremail,
            deadline: data[0].deadline,
          });
        }
      });
  };

  const getposts = () => {
    axios
      .post(`/project/${code}/${selectedCategory}/loadpost`, {})
      .then((res) => {
        const { data } = res;
        if (data === 0) {
          setPosts({
            postslist: [],
          });
        } else {
          setPosts({
            postslist: data,
          });
        }
      });
  };

  const getCategories = () => {
    axios
      .post(`/project/${code}/${selectedCategory}/loadcategories`, {})
      .then((res) => {
        const { data } = res;
        setCategories({
          categorieslist: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const createCategories = (categoryName) => {
    axios
      .post(`/project/${code}/${selectedCategory}/createcategory`, {
        category: categoryName,
      })
      .then((res) => {
        if (res.data === 0) {
          alert('이미 존재하는 카테고리입니다.');
        } else if (res.data === 1) {
          alert('카테고리 추가 완료!');
        }
      });
  };

  const deleteCategories = (categoryName) => {
    axios
      .post(`/project/${code}/${selectedCategory}/deletecategory`, {
        category: categoryName,
      })
      .then((res) => {
        if (res.data === 0) {
          alert('카테고리 삭제 실패');
        } else if (res.data === 1) {
          alert('카테고리 삭제 완료');
        }
      });
  };

  const reSettingProject = (data) => {
    axios
      .post(`/project/${code}/${selectedCategory}/resetting`, {
        title: data.title,
        description: data.description,
        deadline: data.deadline,
      })
      .then((res) => {
        alert('프로젝트 설정 저장 완료');
        pageload();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  async function changeSelectedCategory(e) {
    let selectedCategory;
    const abc = e.target.innerHTML.substr(0, 2);
    if (abc === '<d') {
      selectedCategory = e.target.lastChild.id;
    } else if (e.target.innerText === 'X') {
      return;
    } else {
      selectedCategory = e.target.innerText;
    }

    if (isPostUpdating && isPostOpened) {
      if (
        window.confirm(
          '현재 수정 중인 글이 존재합니다.\n정말 카테고리를 변경하시겠습니까?\n\n수정 중인 내용이 사라집니다.'
        )
      ) {
        setIsPostOpened(false);
        setIsPostUpdating(false);
      } else {
        return;
      }
    } else if (isPostWriting) {
      if (
        window.confirm(
          '현재 작성 중인 글이 존재합니다.\n정말 카테고리를 변경하시겠습니까?\n\n작성 중인 내용이 사라집니다.'
        )
      ) {
        setIsPostOpened(false);
        setIsPostWriting(false);
      } else {
        return;
      }
    } else if (!isPostUpdating && isPostOpened) {
      setIsPostOpened(false);
    }

    await navigate(`/project/${code}/${selectedCategory}`, {
      state: { code, state },
    });
    await setSelectedCategory(selectedCategory);
    await getCategories();
  }

  async function deleteCategory(e) {
    let nowChangeCategory;
    const targetCategory = e.target.id;
    if (targetCategory === selectedCategory) {
      if (isPostUpdating && isPostOpened) {
        if (
          window.confirm(
            '현재 수정 중인 글 내용이 사라집니다.\n그래도 삭제하시겠습니까?'
          )
        ) {
          setIsPostOpened(false);
          setIsPostUpdating(false);
        } else {
          return;
        }
      } else if (isPostWriting) {
        if (
          window.confirm(
            '현재 작성 중인 글 내용이 사라집니다.\n그래도 삭제하시겠습니까?'
          )
        ) {
          setIsPostOpened(false);
          setIsPostWriting(false);
        } else {
          return;
        }
      } else if (!isPostUpdating && isPostOpened) {
        return;
      }
      nowChangeCategory = '★ 개요';
    } else {
      nowChangeCategory = selectedCategory;
    }
    await deleteCategories(targetCategory);
    await setSelectedCategory(nowChangeCategory);
    await getCategories();
    await navigate(`/project/${code}/${selectedCategory}`, {
      state: { code, state },
    });
    await getposts();
  }

  const deleteProject = () => {
    axios
      .post(`/project/${code}/${selectedCategory}/deleteproject`, {
        email: state.email,
      })
      .then((res) => {
        if (res.data === 0) {
          alert('프로젝트 관리자만 삭제할 수 있습니다.');
        } else {
          alert('프로젝트 삭제 완료');
          navigate(`/myprojectslist/${state.email}`);
          forceUpdate.current();
        }
      });
  };

  const postWriteBtnClick = () => {
    if (isPostUpdating && isPostOpened) {
      if (
        window.confirm(
          '현재 수정 중인 글 내용이 사라집니다.\n그래도 글 작성을 하시겠습니까?'
        )
      ) {
        setIsPostOpened(false);
        setIsPostUpdating(false);
        setIsPostWriting(true);
      } else {
        return;
      }
    } else if (isPostWriting) {
      return;
    } else if (!isPostUpdating && isPostOpened) {
      setIsPostOpened(false);
      setIsPostWriting(true);
    } else {
      setIsPostWriting(true);
    }
  };

  const modalOpen = () => {
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
                modalClose={modalClose}
                reSettingProject={reSettingProject}
                projectInfo={projectInfo}
                selectedCategory={selectedCategory}
                deleteProject={deleteProject}
                state={state}
                pageload={pageload}
              />
              <Header page={'Project'} />
              <ProjectAside
                modalOpen={modalOpen}
                projectInfo={projectInfo}
                categories={categories}
                getCategories={getCategories}
                selectedCategory={selectedCategory}
                changeSelectedCategory={changeSelectedCategory}
                createCategory={createCategories}
                deleteCategory={deleteCategory}
                isPostWriting={isPostWriting}
                postWriteBtnClick={postWriteBtnClick}
              />
              <ProjectSection
                state={state}
                posts={posts}
                getposts={getposts}
                categories={categories}
                projectInfo={projectInfo}
                selectedCategory={selectedCategory}
                isPostOpened={isPostOpened}
                setIsPostOpened={setIsPostOpened}
                isPostUpdating={isPostUpdating}
                setIsPostUpdating={setIsPostUpdating}
                isPostWriting={isPostWriting}
                setIsPostWriting={setIsPostWriting}
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
