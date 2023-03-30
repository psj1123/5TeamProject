import React, { useRef, useState } from 'react';

const ProjectPostReple = ({ projectInfo, reple, updateReple, deleteReple }) => {
  const loginEmail = window.sessionStorage.getItem('email');

  const [repleUpdate, setRepleUpdate] = useState(false);

  const repleUpdateRef = useRef();

  const updateRepleBtn_Bottom = reple.replenum + 'Btn';

  const updateRepleBtn = () => {
    const value = repleUpdateRef.current.value;
    updateReple(reple.replenum, value);
  };

  const deleteRepleBtn = () => {
    if (window.confirm('답글을 삭제하시겠습니까?')) {
      deleteReple(reple.replenum);
    } else {
      return;
    }
  };

  return (
    <div className="repleBox">
      <div className="repleWriter">{reple.nickname}</div>

      {repleUpdate ? (
        <div className="repleUpdateBox">
          <div className="repleUpdate">
            <input
              type="text"
              maxLength="200"
              defaultValue={reple.replecontent}
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  updateRepleBtn();
                  await setRepleUpdate(false);
                  await (document.getElementById(
                    updateRepleBtn_Bottom
                  ).innerText = '수정');
                }
              }}
              ref={repleUpdateRef}
            />
          </div>
          <div
            className="repleUpdateBtn"
            onClick={async () => {
              updateRepleBtn();
              await setRepleUpdate(false);
              await (document.getElementById(updateRepleBtn_Bottom).innerText =
                '수정');
            }}
          >
            수정
          </div>
        </div>
      ) : (
        <div className="repleContent">{reple.replecontent}</div>
      )}

      {loginEmail === reple.rewriteremail ? (
        <>
          <div className="repleDeleteAndUpdateBox">
            <div
              id={updateRepleBtn_Bottom}
              className="updateReple"
              onClick={async (e) => {
                repleUpdate ? setRepleUpdate(false) : setRepleUpdate(true);
                (await repleUpdate)
                  ? (e.target.innerText = '수정')
                  : (e.target.innerText = '취소');
              }}
            >
              수정
            </div>
            <div className="deleteReple" onClick={deleteRepleBtn}>
              삭제
            </div>
          </div>
        </>
      ) : loginEmail === projectInfo.email ? (
        <>
          <div className="repleDeleteAndUpdateBox">
            <div className="deleteReple" onClick={deleteRepleBtn}>
              삭제
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProjectPostReple;
