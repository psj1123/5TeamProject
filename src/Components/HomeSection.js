import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/HomeSection.css';

const HomeSection = () => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#5e308c');

  useEffect(() => {
    const typeTitle = (text, i) => {
      if (i < text.length) {
        setTitle((prevTitle) => prevTitle + text.charAt(i));
        setTimeout(() => {
          typeTitle(text, i + 1);
        }, 100);
      } else {
        setTimeout(() => {
          eraseTitle(text.length - 1);
        }, 2000);
      }
    };

    const eraseTitle = (i) => {
      if (i >= 0) {
        setTitle((prevTitle) => prevTitle.slice(0, -1));
        setTimeout(() => {
          eraseTitle(i - 1);
        }, 100);
      } else {
        setColor((prevColor) =>
          prevColor === '#5e308c' ? 'black' : '#5e308c'
        );
        setTimeout(() => {
          typeTitle('Jellabo', 0);
        }, 1500);
      }
    };

    typeTitle('Jellabo', 0);
  }, []);

  return (
    <section>
      <div className="homeArticle">
        <div className="homeTextContainer">
          <div className="homeTitle">
            <span style={{ color: color }}>{title} </span>에 오신 것을
            환영합니다!
          </div>
        </div>
      </div>

      <div className="homeSectionContainer">
        <div className="homeSectionHead_Container">
          <div className="homeSectionHead_image">
            <img src="./img/HomeImage01.jpg" alt="사진1" />
          </div>
          <div className="homeSectionHeader">
            <h1>내 노트, 팀 프로젝트</h1>
            <h2>
              간편하고 효율적으로 진행하세요<br />
              성공적인 협업을 위한 Jellabo
            </h2>
            <Link to="/login">
              <div className="login">무료로 시작하기</div>
            </Link>
          </div>
        </div>

        <br />
        <br />

        <div className="homeArticle">
          <div className="homeTextContainer">
            <div className="homeTitle1">
              <span>
                나만의 NOTE를 <br />
                생성하세요
              </span>
            </div>
            <div className="homeContent1">
              <span>
                Jellabo는 어디에서나 사용하는 <br />
                협업 공유노트입니다.
                <br />
                여러 개의 노트를 생성해서 <br />
                개인용과 협업용으로 사용할 수 있어요.
              </span>
            </div>
          </div>
          <div className="homeImage">
            <img src="./img/HomeImage02.jpg" alt="사진2" />
          </div>
        </div>

        <div className="homeArticle">
          <div className="homeImage">
            <img src="./img/HomeImage03.jpg" alt="사진3" />
          </div>
          <div className="homeTextContainer">
            <div className="homeTitle2">
              <span>
                나만의 프로젝트를 <br />
                진행하세요
              </span>
            </div>
            <div className="homeContent2">
              <span>
                팀원에게 작업을 할당하고
                <br />
                프로젝트 진행 상황을 공유하여
                <br />
                효율적으로 프로젝트를 관리해보세요
              </span>
            </div>
          </div>
        </div>

        <div className="homeArticle">
          <div className="homeTextContainer">
            <div className="homeTitle3">
              <span>지금 바로 시작해보세요!</span>
            </div>
            <Link to="/login">
              <div className="login">무료로 시작하기</div>
            </Link>

            <div className="homeImage">
              <img src="./img/HomeImage04.jpg" alt="사진4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
