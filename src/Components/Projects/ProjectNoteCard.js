import React from 'react';

const NoteCard = ({
  item,
  modalOpen,
  title,
  description,
  writtenDate,
  category,
}) => {
  return (
    <div className="noteCard">
      <div className="pin">#{item}</div>
      <div>
        <div className="noteCategory">{category}</div>
        <div className="noteTitle">{title}</div>
        <div className="noteDescription">{description}</div>
      </div>
      <div>
        <div className="noteWriter">작성자</div>
        <div className="noteDate">{writtenDate}</div>
        <div className="noteOption" onClick={modalOpen}>
          자세히 보기
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
