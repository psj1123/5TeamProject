import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/HomeSection.css';

const HomeSection = () => {
  return (
    <section>
      <div className="homeSectionContainer">
        <div className="homeSectionHeader">
          <img src="./img/HomeImage01.jpg" alt="사진1" />
          <div>
            <h2>
              간편하게, 효율적으로
              <br />
              성공적인 협업을 위한 플랫폼
            </h2>
            <h1>OXOXO</h1>
          </div>
        </div>
        <br />
        <br />
        <div className="homeArticle">
          <div className="homeTextContainer">
            <div className="homeTitle">
              <span>OXOXO에 오신 것을 환영합니다!</span>
            </div>
            <div className="homeContent">
              <span>
                OXOXO에서는 보다 효율적이고 효과적으로 협업하는 데에
                <br />
                도움이 되는 시스템을 제공하고 있습니다.
              </span>
            </div>
          </div>
        </div>

        <div className="homeArticle">
          <div className="homeTextContainer">
            <div className="homeTitle">
              <span>프로젝트 관리</span>
            </div>
            <div className="homeContent">
              <span>
                팀원에게 작업을 할당하고
                <br />
                프로젝트 진행 상황을 공유하여
                <br />
                효율적으로 프로젝트를 관리해보세요
              </span>
            </div>
          </div>
          <img src="./img/HomeImage02.jpg" alt="사진2" />
        </div>

        <div className="homeArticle">
          <img src="./img/HomeImage03.jpg" alt="사진3" />
          <div className="homeTextContainer">
            <div className="homeTitle">
              <span>자료 공유</span>
            </div>
            <div className="homeContent">
              <span>
                프로젝트 작업에 필요한 자료를
                <br />
                이곳에서 팀원들과 공유해보세요
              </span>
            </div>
          </div>
        </div>

        <div className="homeArticle">
          <div className="homeTextContainer">
            <div className="homeTitle">
              <span>지금 바로 시작해보세요!</span>
              <Link to="/register">
                <div className="register">
                  회원가입
                </div>
              </Link>
            </div>
          </div>
        </div>
        <img src="./img/HomeImage04.jpg" alt="사진4" />
      </div>
    </section>
  );
};

export default HomeSection;
