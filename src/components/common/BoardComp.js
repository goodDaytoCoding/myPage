import React from 'react';

import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome/index';
import {
  faBriefcase,
  faCalendar,
  faEnvelope,
  faGraduationCap,
  faHouse,
  faUser,
} from '../../../node_modules/@fortawesome/free-solid-svg-icons/index';
import { faSquarePhone } from '@fortawesome/free-solid-svg-icons';

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
          <div>
            <img src="asset/MYPHOTO.jpg" alt="증명사진" />
            <p>
              안녕하세요.
              <br />
              상상하는 것을 만들고 싶은 개발자 최재호 입니다.
            </p>
          </div>
          <div className="profile-container">
            <div className="profile-item">
              <FontAwesomeIcon icon={faUser} size="3x" />
              <div className="profile-content">
                <h3>이름</h3>
                <p>최재호</p>
              </div>
            </div>
            <div className="profile-item">
              <FontAwesomeIcon icon={faCalendar} size="3x" />
              <div className="profile-content">
                <h3>생년월일</h3>
                <p>1990. 06. 14 (만 34세)</p>
              </div>
            </div>
            <div className="profile-item">
              <FontAwesomeIcon icon={faGraduationCap} size="3x" />
              <div className="profile-content">
                <h3>학력</h3>
                <p>
                  금오공과대학교
                  <br />
                  (전자공학부)
                </p>
              </div>
            </div>
            <div className="profile-item">
              <FontAwesomeIcon icon={faEnvelope} size="3x" />
              <div className="profile-content">
                <h3>이메일</h3>
                <p>jaeho614a@gmail.com</p>
              </div>
            </div>
            <div className="profile-item">
              <FontAwesomeIcon icon={faBriefcase} size="3x" />
              <div className="profile-content">
                <h3>목표 직무</h3>
                <p>Frontend Developer</p>
              </div>
            </div>
            <div className="profile-item">
              <FontAwesomeIcon icon={faHouse} size="3x" />
              <div className="profile-content">
                <h3>주소지</h3>
                <p>경상북도 구미시</p>
              </div>
            </div>
            <div className="profile-item">
              <FontAwesomeIcon icon={faSquarePhone} size="3x" />
              <div className="profile-content">
                <h3>연락처</h3>
                <p>010-5393-0614</p>
              </div>
            </div>
          </div>
        </div>
      );
      break;
    case 1:
      boardContent = (
        <div className="aboutMe">
          <h1>About Me</h1>
          <div className="aboutMe-container">
            <p>개발자가 되고 싶어.</p>
          </div>
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
              <img src="/asset/HTML_img.jpg" alt="HTML" />
              <img src="/asset/CSS_img.jpg" alt="CSS" />
              <img src="/asset/JS_img.jpg" alt="JS" />
              <img src="/asset/REACT_img.jpg" alt="REACT" />
              <img src="/asset/REDUX_img.jpg" alt="REDUX" />
            </div>
            <div className="stack-back">
              <h3>BackEnd</h3>
              <img src="/asset/NODEJS_img.jpg" alt="NODEJS" />
              <img src="/asset/MONGODB_img.jpg" alt="MONGODB" />
              <img src="/asset/MYSQL_img.jpg" alt="MYSQL" />
            </div>
            <div className="stack-version">
              <h3>Version Control</h3>
              <img src="/asset/GIT_img.jpg" alt="GIT" />
              <img src="/asset/GITHUB_img.jpg" alt="GITHUB" />
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
