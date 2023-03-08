import React from 'react';
import Header from '../Components/Header';
import ReturnTop from '../Components/ReturnTop';

const NotFound = () => {
  return (
    <>
      <div>
        <Header page={'NotFound'} />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '4vmin',
          fontWeight: 'bold',
          position: 'absolute',
          width: '100%',
          height: 'calc(100% - 115px)',
        }}
      >
        알 수 없는 오류가 발생했습니다!
      </div>
      <ReturnTop />
    </>
  );
};

export default NotFound;
