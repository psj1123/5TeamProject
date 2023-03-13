import React, { useEffect, useState, useRef } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { UserDataConsumer } from '../Contexts/UserData';
import Header from '../Components/Header.js';
import ReturnTop from '../Components/ReturnTop.js';
import ProjectSection from '../Components/ProjectSection';
import ProjectAside from '../Components/ProjectAside';
import Modal from '../Components/Modals/ProjectModal';
import axios from 'axios';

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
  const [nowPost, setNowPost] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState(0);

  useEffect(() => {}, []);

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
      .post(`http://localhost:8008/project/${code}/${selectedCategory}`, {
        email: state.email,
      })
      .then((res) => {
        if (res.data === 0 || res.data === 1) {
          return;
        } else {
          const { data } = res;
          setProjectInfo({
            ...projectInfo,
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
      })
      .catch((e) => {
        console.error(e);
      });
  };

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

  const modalOpen = (e) => {
    console.log(e);
    if (e.target.innerText === '자세히 보기') {
      axios
        .post(`/project/${code}/${selectedCategory}/${e.target.id}/detail`, {})
        .then((res) => {
          const { data } = res;
          setNowPost(data[0]);
        })
        .finally(() => {
          setModalMode(0);
          setIsOpen(true);
        });
    } else if (e.target.innerText === '글 작성') {
      setModalMode(2);
      setIsOpen(true);
    } else if (e.target.innerText === '설정') {
      setModalMode(3);
      setIsOpen(true);
    }
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
                modalMode={modalMode}
                setModalMode={setModalMode}
                reSettingProject={reSettingProject}
                code={code}
                selectedCategory={selectedCategory}
                projectInfo={projectInfo}
                deleteProject={deleteProject}
                categories={categories}
                state={state}
                getposts={getposts}
                pageload={pageload}
                nowPost={nowPost}
                setNowPost={setNowPost}
              />
              <Header page={'Project'} />
              <ProjectAside
                isOpen={isOpen}
                modalMode={modalMode}
                modalOpen={modalOpen}
                projectInfo={projectInfo}
                categories={categories}
                getCategories={getCategories}
                selectedCategory={selectedCategory}
                changeSelectedCategory={changeSelectedCategory}
                createCategory={createCategories}
                deleteCategory={deleteCategory}
              />
              <ProjectSection
                isOpen={isOpen}
                modalMode={modalMode}
                modalOpen={modalOpen}
                posts={posts}
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
