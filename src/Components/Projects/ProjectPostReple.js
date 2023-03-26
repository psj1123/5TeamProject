import React, { useState } from 'react';

const ProjectPostReple = () => {
  const [repleUpdate, setRepleUpdate] = useState(false);

  return (
    <div className="repleBox">
      <div className="repleWriter">답글 작성자</div>

      {repleUpdate ? (
        <div className="repleUpdateBox">
          <div className="repleUpdate">
            <input type="text" maxLength="200" />
          </div>
          <div className="repleUpdateBtn">수정</div>
        </div>
      ) : (
        <div className="repleContent">답글 내용</div>
      )}
      <div className="repleDeleteAndUpdateBox">
        <div
          className="updateReple"
          onClick={() => {
            repleUpdate ? setRepleUpdate(false) : setRepleUpdate(true);
          }}
        >
          수정
        </div>
        <div className="deleteReple">삭제</div>
      </div>
    </div>
  );
};

export default ProjectPostReple;
