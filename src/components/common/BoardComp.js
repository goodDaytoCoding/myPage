import React from 'react';

import '../../lib/styles/Board.css';
import '../../lib/styles/Portfolio.css';
import '../../lib/styles/Stack.css';
import '../../lib/styles/Profile.css';

const BoardComp = ({ boardIndex, closeBoard }) => {
  if (boardIndex === null || boardIndex === false) return null;

  let boardContent;

  switch (boardIndex) {
    case 0:
      boardContent = (
        <div className="profile">
          <h1>Profile</h1>
          <div className="profile-container">
            <img src="public/textures/portfolio.jpg" alt="증명사진" />
            <p>안녕하세요! 상상하는 것을 만들고 싶은 개발자 최재호 입니다.</p>
            <div className="profile-age">
              <h3>나이</h3>
              <p>만 34세</p>
            </div>
            <div className="profile-educationlevel">
              <h3>최종학력</h3>
              <p>Kumoh National Institute of Technology</p>
            </div>
            <div className="profile-specialty">
              <h3>전공</h3>
              <p>전자 공학</p>
            </div>
            <div className="profile-job">
              <h3>목표 직무</h3>
              <p>Frontend Developer</p>
            </div>
            <div className="profile-hobbies">
              <h3>취미</h3>
              <p>독서, 운동, 노래부르기</p>
            </div>
            <div className="profile-contact">
              <h3>Contact</h3>
              <p>010-5393-0614</p>
            </div>
          </div>
        </div>
      );
      break;
    case 1:
      boardContent = (
        <div>
          <h1>About Me</h1>
          <div>자기소개</div>
        </div>
      );
      break;
    case 2:
      boardContent = (
        <div>
          <h1>GitHub Address</h1>
          <a
            href="https://github.com/goodDaytoCoding"
            target="_blank" //새 탭에서 열림
            rel="noopener noreferrer" //새 탭 열릴 때 보안 문제 방지
          >
            Githib : Repository
          </a>
        </div>
      );
      break;
    case 3:
      boardContent = <h1>review 대체할 페이지 혹은 삭제</h1>;
      break;
    case 4:
      boardContent = (
        <div className="stack">
          <h1>Stack</h1>
          <div className="stack-container">
            <div className="stack-front">
              <h3>FrontEnd</h3>
              <img src="public/textures/stack.jpg" alt="stack_img" />
            </div>
            <div className="stack-back">
              <h3>BackEnd</h3>
              <img src="public/textures/stack.jpg" alt="stack_img" />
            </div>
            <div className="stack-version">
              <h3>Version Control</h3>
              <img src="public/textures/stack.jpg" alt="stack_img" />
            </div>
          </div>
        </div>
      );
      break;
    case 5:
      boardContent = (
        <div className="portfolio">
          <h1>Portfolio</h1>
          <div className="portfolio-container">
            <div className="portfolio-items">
              <img src="public/textures/portfolio.jpg" alt="프로젝트 이름" />
              <div className="portfolio-description">
                <h2>이름: Tripper Maker</h2>
                <time datetime="2023-06">2023년 6월 - 2023년 7월</time>
                <span>참여 인원: 3명</span>
                <p>
                  이 프로젝트는 여행을 좋아하는 사람들이 정보와 후기를 공유하는
                  사이트입니다.
                </p>
                <span>
                  링크 :
                  <a
                    href="https://github.com/goodDaytoCoding"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tripper Maker
                  </a>
                </span>
              </div>
            </div>
          </div>
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

export default BoardComp;
