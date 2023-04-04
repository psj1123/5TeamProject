import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header.js';
import ReturnTop from '../Components/ReturnTop.js';
import ProjectSection from '../Components/ProjectSection';
import ProjectAside from '../Components/ProjectAside';
import Modal from '../Components/Project/ProjectModal';

const Project = () => {
  const loginEmail = window.sessionStorage.getItem('email');

  const navigate = useNavigate();
  const code = window.location.href.split('/')[4].split('?')[0];
  const [isLoading, setIsLoading] = useState(false);
  const [projectInfo, setProjectInfo] = useState({
    code: '',
    title: '',
    description: '',
    nickname: '',
    email: '',
    deadline: '',
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('★ 개요');
  const [posts, setPosts] = useState([]);
  const [isPostOpened, setIsPostOpened] = useState(false);
  const [isPostUpdating, setIsPostUpdating] = useState(false);
  const [isPostWriting, setIsPostWriting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userlist, setUserlist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (loginEmail === null) {
        navigate('/login');
      } else {
        await loadProjectInfo();
        await loadUserList();
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getposts();
    };
    fetchData();
  }, [selectedCategory]);

  const loadProjectInfo = () => {
    axios
      .post(`/loadProjectInfo`, {
        code: code,
        email: loginEmail,
      })
      .then((res) => {
        const { data } = res;
        if (data.code === -1) {
          alert('존재하지 않는 프로젝트입니다.');
          navigate(`/myprojectslist?email=${loginEmail}`);
        } else if (data.code === 0) {
          alert('접근할 수 없는 프로젝트입니다.');
          navigate(`/myprojectslist?email=${loginEmail}`);
        } else {
          setProjectInfo({
            code: data.code,
            title: data.title,
            description: data.description,
            nickname: data.nickname,
            creatoremail: data.creatoremail,
            deadline: data.deadline,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const loadUserList = () => {
    axios
      .post('/loadUserList', {
        code: code,
      })
      .then((res) => {
        const { data } = res;
        setUserlist(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getposts = async () => {
    await setIsLoading(true);
    await axios
      .get(`/project/${code}/${selectedCategory}`, {})
      .then((res) => {
        const { data } = res;
        if (data === 0) {
          setPosts([]);
        } else {
          setPosts(data);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getCategories = () => {
    axios
      .post('/loadCategories', {
        code: code,
      })
      .then((res) => {
        const { data } = res;
        setCategories(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const createCategories = (categoryName) => {
    axios
      .post('/createCategoryProcess', {
        code: code,
        category: categoryName,
      })
      .then((res) => {
        const { data } = res;
        if (data === 0) {
          alert('이미 존재하는 카테고리입니다.');
        } else if (data === 1) {
          getCategories();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteCategories = (categoryName) => {
    axios
      .post('/deleteCategoryProcess', {
        code: code,
        category: categoryName,
      })
      .then((res) => {
        const { data } = res;
        if (data === 0) {
          alert('카테고리 삭제 실패');
        } else if (data === 1) {
          getCategories();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const reSettingProject = (data) => {
    axios
      .post('/resettingProjectProcess', {
        code: code,
        title: data.title,
        description: data.description,
        deadline: data.deadline,
      })
      .then((res) => {
        const { data } = res;
        if (data === 0) {
          alert('예기지 않은 오류가 발생했습니다.');
        } else if (data === 1) {
          loadProjectInfo();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const changeSelectedCategory = async (e) => {
    let selectedCategory;
    if (e.target.innerText === 'X') {
      return;
    } else if (e.target.lastChild.innerText === 'X') {
      selectedCategory = e.target.lastChild.id;
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
    await setSelectedCategory(selectedCategory);

    if (document.querySelector('.aside').className === 'aside asideToggle') {
      toggleAside();
    }
  };

  const deleteCategory = async (e) => {
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
        setIsPostOpened(false);
      }
      nowChangeCategory = '★ 개요';
    } else {
      nowChangeCategory = selectedCategory;
    }
    await deleteCategories(targetCategory);
    await setSelectedCategory(nowChangeCategory);
  };

  const deleteProject = () => {
    axios
      .post('/deleteProjectProcess', {
        code: code,
        email: loginEmail,
      })
      .then((res) => {
        const { data } = res;
        if (data === 0) {
          alert('프로젝트 관리자만 삭제할 수 있습니다.');
        } else {
          navigate(`/myprojectslist?email=${loginEmail}`);
        }
      })
      .catch((err) => {
        console.error(err);
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
      } else {
        return;
      }
    } else if (isPostWriting) {
      return;
    } else if (!isPostUpdating && isPostOpened) {
      setIsPostOpened(false);
    }
    setIsPostWriting(true);

    if (document.querySelector('.aside').className === 'aside asideToggle') {
      toggleAside();
    }
  };

  const toggleAside = () => {
    const aside = document.querySelector('.aside');
    aside.classList.toggle('asideToggle');
  };

  const modalOpen = () => {
    setIsOpen(true);
  };

  const modalClose = () => {
    setIsOpen(false);
  };

  // 로그인 여부를 판단, 로그인되지 않은 상태라면 로그인 페이지로 강제 이동
  if (loginEmail === null) {
    return <Navigate to="/login" replace={true} />;
  } else {
    // 정상적인 경우에 아래의 리턴문이 컴포넌트 결과로 출력됩니다.
    return (
      <div>
        <Modal
          isOpen={isOpen}
          modalClose={modalClose}
          userlist={userlist}
          loadUserList={loadUserList}
          reSettingProject={reSettingProject}
          projectInfo={projectInfo}
          selectedCategory={selectedCategory}
          deleteProject={deleteProject}
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
          postWriteBtnClick={postWriteBtnClick}
        />
        <ProjectSection
          posts={posts}
          isLoading={isLoading}
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
        <div className="asideBtn" onClick={toggleAside}>
          <div></div>
        </div>
        <ReturnTop />
      </div>
    );
  }
};

export default Project;
