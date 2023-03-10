import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/NotFound.css';

const NotFoundSection = () => {
  return (
    <section>
      <div className="Box404">
        <img className="image404" src="./img/404.png" alt="404 error" />
      </div>
      <Link to="/">
        <div className="home">
          홈으로 가기
        </div>
      </Link>
    </section>
  );
};

export default NotFoundSection;
