import React from 'react';

import '../../lib/styles/Board.css';

const Board = ({ boardIndex, closeBoard }) => {
  if (boardIndex === null || boardIndex === false) return null;

  let boardContent;

  switch (boardIndex) {
    case 0:
      boardContent = (
        <div>
          <h1>This is the Profile Page</h1>
          <div>안녕하세요 저는 최재호 입니다.</div>
          <div>사진, 정보, 학교 등..</div>
        </div>
      );
      break;
    case 1:
      boardContent = (
        <div>
          <h1>This is the About Me Page</h1>
          <div>자기소개</div>
        </div>
      );
      break;
    case 2:
      boardContent = <h1>깃허브 주소 or 바로 이동/새창열기</h1>;
      break;
    case 3:
      boardContent = <h1>review 대체할 페이지 혹은 삭제</h1>;
      break;
    case 4:
      boardContent = (
        <div>
          <h1>This is the Stack Page</h1>
          <div>프로젝트 별 스택,img 포함</div>
        </div>
      );
      break;
    case 5:
      boardContent = (
        <div>
          <h1>This is the Portfolio Page</h1>
          <div>포트폴리오 사이트 링크, 이미지, 설명</div>
        </div>
      );
      break;
    default:
      boardContent = <h1>Welcome</h1>;
  }

  return (
    <div className={`board ${boardIndex !== null ? 'open' : ''}`}>
      <button className="close-button" onClick={closeBoard}>
        X
      </button>
      {boardContent}
    </div>
  );
};

export default Board;
