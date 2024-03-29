import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../Components/Header.js';
import ReturnTop from '../Components/ReturnTop.js';
import ProjectSection from '../Components/ProjectSection';
import ProjectAside from '../Components/ProjectAside';
import Modal from '../Components/Modals/ProjectModal';
import axios from 'axios';

const Project = () => {
  const loginEmail = window.sessionStorage.getItem('email');

  const navigate = useNavigate();
  const code = window.location.href.split('/')[4];
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
        alert('접근할 수 없는 프로젝트입니다.');
        navigate('/login');
      } else {
        await loadProjectInfo();
        await loadUserList();
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    getposts();
  }, [selectedCategory]);

  const loadProjectInfo = () => {
    axios
      .post(`/loadProjectInfo`, {
        code: code,
        email: loginEmail,
      })
      .then((res) => {
        if (res.data === -1 || res.data === 0) {
          alert('접근할 수 없는 프로젝트입니다.');
          navigate(`/myprojectslist?email=${loginEmail}`);
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
      });
  };

  const getposts = async () => {
    await setIsLoading(true);
    await axios
      .get(`/project/${code}/${selectedCategory}/loadPost`, {})
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
      });
    await setIsLoading(false);
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
        if (res.data === 0) {
          alert('이미 존재하는 카테고리입니다.');
        } else if (res.data === 1) {
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
        if (res.data === 0) {
          alert('카테고리 삭제 실패');
        } else if (res.data === 1) {
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
        loadProjectInfo();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  async function changeSelectedCategory(e) {
    let selectedCategory;
    const txt = e.target.innerHTML.substr(0, 2);
    if (txt === '<d') {
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

    await navigate(`/project/${code}/${selectedCategory}`);
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
    await navigate(`/project/${code}/${selectedCategory}`);
    await getposts();
  }

  const deleteProject = () => {
    axios
      .post('/deleteProjectProcess', {
        code: code,
        email: loginEmail,
      })
      .then((res) => {
        if (res.data === 0) {
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
        <ReturnTop />
      </div>
    );
  }
};

export default Project;
