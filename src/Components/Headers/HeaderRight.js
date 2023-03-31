import { Link, useNavigate } from 'react-router-dom';

const HeaderRight = ({ page }) => {
  const navigate = useNavigate();

  const loginEmail = window.sessionStorage.getItem('email');
  const loginNickname = window.sessionStorage.getItem('nickname');

  const email = loginEmail.split('@');

  // 로그아웃 이벤트
  const logoutClick = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      window.sessionStorage.clear();
      return navigate('/login');
    } else {
      return false;
    }
  };

  if (loginEmail !== null) {
    const myprojectslist = '/myprojectslist?email=' + loginEmail;
    // 로그인 한 상태에서, Home 페이지인 경우
    if (page === 'Home') {
      return (
        <div className="headerRight">
          <div className="rightLogin">
            <Link to={myprojectslist}>
              <div className="hoverLine">나의 프로젝트 리스트</div>
            </Link>
          </div>
          <div className="rightLogin">
            <div className="hoverLine" onClick={logoutClick}>
              로그아웃
            </div>
          </div>
        </div>
      );
    }
    // 로그인 한 상태에서, 오류 페이지인 경우
    else if (page === 'NotFound') {
      return (
        <div className="headerRight">
          <div className="rightLogin">
            <Link to={myprojectslist} replace={true}>
              <div className="hoverLine">나의 프로젝트 리스트</div>
            </Link>
          </div>
          <div className="rightLogin">
            <div className="hoverLine" onClick={logoutClick}>
              로그아웃
            </div>
          </div>
        </div>
      );
    }
    // 로그인 한 상태에서, Home, 오류 페이지 모두 아닌 경우
    else {
      return (
        <div className="headerRight">
          <div className="rightLogin">
            <div>{loginNickname}</div>
          </div>
          <div className="rightLogin">
            <div className="hoverLine" onClick={logoutClick}>
              로그아웃
            </div>
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
            <div className="hoverLine">로그인</div>
          </Link>
        </div>
        <div className="rightLogin">
          <Link to="/register">
            <div className="hoverLine">회원가입</div>
          </Link>
        </div>
      </div>
    );
  }
};

export default HeaderRight;
