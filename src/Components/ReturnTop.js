import React, { useEffect, useState } from 'react';
import '../Styles/ReturnTop.css';

const ReturnTop = () => {
  const [ScrollY, setScrollY] = useState(0);
  const [isTop, setIsTop] = useState(true);

  const handleScrollY = () => {
    setScrollY(window.scrollY);
    if (ScrollY > 100) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }
  };

  const onClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setScrollY(0);
    setIsTop(true);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleScrollY);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleScrollY);
    };
  });

  return (
    <div
      className={!isTop ? 'returnTop activeReturnTop' : 'returnTop'}
      onClick={onClick}
    ></div>
  );
};

export default ReturnTop;
