import { Link, Navigate } from 'react-router-dom';

const HeaderRight = ({ page, state, actions }) => {
  // 로그아웃 이벤트
  const logoutClick = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      actions.setIsLoggedIn(false);
      actions.setEmail('');
      actions.setNickname('');
      return <Navigate to="/login" />;
    } else {
      return;
    }
  };

  if (state.isLoggedIn) {
    const myprojectslist = '/myprojectslist' + state.email;
    // 로그인 한 상태에서, Home 페이지인 경우
    if (page === 'Home') {
      return (
        <div className="rightLogin">
          <Link to={myprojectslist}>
            <div>나의 프로젝트 리스트</div>
          </Link>
          <div onClick={logoutClick}>로그아웃</div>
        </div>
      );
    }
    // 로그인 한 상태에서, 오류 페이지인 경우
    else if (page === 'NotFound') {
      return (
        <div className="headerRight">
          <div className="rightLogin">
            <Link to={myprojectslist} replace={true}>
              <div>프로젝트 리스트</div>
            </Link>
          </div>
          <div className="rightLogin">
            <div onClick={logoutClick}>로그아웃</div>
          </div>
        </div>
      );
    }
    // 로그인 한 상태에서, Home, 오류 페이지 모두 아닌 경우
    else {
      return (
        <div className="headerRight">
          <div className="rightLogin">
            <div>
                {state.nickname} {'(' + state.email + ')'}
            </div>
          </div>
          <div className="rightLogin">
            <div onClick={logoutClick}>로그아웃</div>
          </div>
        </div>
      );
    }
  }
  // 로그인 하지 않은 상태인 경우
  else {
    return (
      <div className="headerRight">
        <div className="rightLogin">
          <Link to="/login">
            <div>로그인</div>
          </Link>
        </div>
        <div className="rightLogin">
          <Link to="/register">
            <div>회원가입</div>
          </Link>
        </div>
      </div>
    );
  }
};

export default HeaderRight;