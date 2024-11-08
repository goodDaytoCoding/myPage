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
import '../../lib/styles/AboutMe.css';

const BoardComp = ({ boardIndex, closeBoard, isNarrowScreen }) => {
  if (boardIndex === null || boardIndex === false) return null;

  let boardContent;

  switch (boardIndex) {
    case 0:
      boardContent = (
        <div className="profile-container">
          <h3 className="profile-board-name">PROFILE</h3>
          <div className="profile-image">
            <img src="asset/MYPHOTO.jpg" alt="증명사진" />
            <p>안녕하세요.</p>
            {isNarrowScreen ? (
              <>
                <div>상상하는 것을 만들고 싶은</div>
                <div>개발자 최재호 입니다.</div>
              </>
            ) : (
              <p>상상하는 것을 만들고 싶은 개발자 최재호 입니다.</p>
            )}
          </div>
          <div className="profile-item-box">
            <div className="profile-item">
              <div className="profile-item-width">
                <div className="profile-icon">
                  <FontAwesomeIcon icon={faUser} size="3x" />
                </div>
                <div className="profile-content">
                  <h3>이름</h3>
                  <p>최재호</p>
                </div>
              </div>
            </div>
            <div className="profile-item">
              <div className="profile-item-width">
                <div className="profile-icon">
                  <FontAwesomeIcon icon={faCalendar} size="3x" />
                </div>
                <div className="profile-content">
                  <h3>생년월일</h3>
                  <p>1990. 06. 14</p>
                </div>
              </div>
            </div>
            <div className="profile-item">
              <div className="profile-item-width">
                <div className="profile-icon">
                  <FontAwesomeIcon icon={faGraduationCap} size="3x" />
                </div>
                <div className="profile-content">
                  <h3>학력</h3>
                  <p>금오공과대학교</p>
                </div>
              </div>
            </div>
            <div className="profile-item">
              <div className="profile-item-width">
                <div className="profile-icon">
                  <FontAwesomeIcon icon={faEnvelope} size="3x" />
                </div>
                <div className="profile-content">
                  <h3>이메일</h3>
                  <p>jaeho614a@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="profile-item">
              <div className="profile-item-width">
                <div className="profile-icon">
                  <FontAwesomeIcon icon={faBriefcase} size="3x" />
                </div>
                <div className="profile-content">
                  <h3>목표 직무</h3>
                  <p>Frontend Developer</p>
                </div>
              </div>
            </div>
            <div className="profile-item">
              <div className="profile-item-width">
                <div className="profile-icon">
                  <FontAwesomeIcon icon={faHouse} size="3x" />
                </div>
                <div className="profile-content">
                  <h3>주소지</h3>
                  <p>경상북도 구미시</p>
                </div>
              </div>
            </div>
            <div className="profile-item">
              <div className="profile-item-width">
                <div className="profile-icon">
                  <FontAwesomeIcon icon={faSquarePhone} size="3x" />
                </div>
                <div className="profile-content">
                  <h3>연락처</h3>
                  <p>010-5393-0614</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      break;
    case 1:
      boardContent = (
        <div className="aboutme-container">
          <h1 className="aboutme-board-name">About Me</h1>
          <div className="aboutme-item-box">
            {isNarrowScreen ? (
              <>
                <p>안녕하세요.</p>
                <p>저는 전자공학을 전공했습니다.</p>
                <p>전공수업 중에 C언어를 통한 코딩을 배우게 되었습니다.</p>
                <p>처음 배웠을 땐 분명히 어려웠고</p>
                <p>남들보다 이해하는 게 느렸던 것 같았습니다.</p>
                <p>하지만 혼자서 몇 시간씩 공부하고 시도해 보며</p>
                <p>문제를 해결했을 때는 재미있다는 생각이 들었었습니다.</p>
                <p>대학교를 졸업 후 전기설계 직무로 취업했지만,</p>
                <p> 회의감이 들게 되었습니다.</p>
                <p>그리고 인터넷에 떠 있는 광고를 보고</p>
                <p>개발자에 대한 관심이 커지게 되었습니다.</p>
                <p>코딩을 하며 문제를 해결하고</p>
                <p>창의적인 결과물을 만드는 과정이</p>
                <p>저를 코딩에 빠져들게 했습니다.</p>
                <p>
                  늦었지만, 개발자가 되기 위해 과감하게 전기설계를 그만두었고
                </p>
                <p>지금은 개발자가 되기위해 도전하고 있습니다.</p>
              </>
            ) : (
              <>
                <p>안녕하세요.</p>
                <p>저는 전자공학을 전공했습니다.</p>
                <p>전공수업 중에 C언어를 통한 코딩을 배우게 되었습니다.</p>
                <p>처음 배웠을 땐 분명히 어려웠고</p>
                <p>남들보다 이해하는 게 느렸던 것 같았습니다.</p>
                <p>하지만 혼자서 몇 시간씩 공부하고 시도해 보며</p>
                <p>문제를 해결했을 때는 재미있다는 생각이 들었었습니다.</p>
                <p>
                  대학교를 졸업 후 전기설계 직무로 취업했지만, 회의감이 들게
                  되었습니다.
                </p>
                <p>
                  그리고 인터넷에 떠 있는 광고를 보고 개발자에 대한 관심이
                  커지게 되었습니다.
                </p>
                <p>
                  코딩을 하며 문제를 해결하고 창의적인 결과물을 만드는 과정이
                </p>
                <p>저를 코딩에 빠져들게 했습니다.</p>
                <p>
                  늦었지만, 개발자가 되기 위해 과감하게 전기설계를 그만두었고
                </p>
                <p>지금은 개발자가 되기위해 도전하고 있습니다.</p>
              </>
            )}
          </div>
        </div>
      );
      break;
    case 2:
      boardContent = (
        <div>
          <h1 className="container">GitHub Address</h1>
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
        <div className="stack-container">
          <h1 className="stack-board-name">STACK</h1>
          <div className="stack-front-box">
            <h3>FRONTEND</h3>
            <div className="stack-item">
              <img src="/asset/HTML_img.jpg" alt="HTML" />
              <img src="/asset/CSS_img.jpg" alt="CSS" />
              <img src="/asset/JS_img.jpg" alt="JS" />
              <img src="/asset/REACT_img.jpg" alt="REACT" />
              <img src="/asset/REDUX_img.jpg" alt="REDUX" />
            </div>
          </div>
          <div className="stack-back-box">
            <h3>BACKEND</h3>
            <div className="stack-item">
              <img src="/asset/NODEJS_img.jpg" alt="NODEJS" />
              <img src="/asset/MONGODB_img.jpg" alt="MONGODB" />
              <img src="/asset/MYSQL_img.jpg" alt="MYSQL" />
            </div>
          </div>
          <div className="stack-version-box">
            <h3>VERSION CONTROL</h3>
            <div className="stack-item">
              <img src="/asset/GIT_img.jpg" alt="GIT" />
              <img src="/asset/GITHUB_img.jpg" alt="GITHUB" />
            </div>
          </div>
        </div>
      );
      break;
    case 5:
      boardContent = (
        <div className="portfolio-container">
          <h1 className="portfolio-board-name">PORTFOLIO</h1>
          <div className="portfolio-item-box">
            <div className="portfolio-item">
              <img src="/asset/REACT_img.jpg" alt="프로젝트 이름" />
              <div className="description">
                <h2>Tripper Maker</h2>
                <div>2023년 6월 - 2023년 7월</div>
                <div>참여 인원: 3명</div>
                <p>
                  이 프로젝트는 여행을 좋아하는 사람들이 정보와 후기를 공유하는
                  사이트입니다.
                </p>
              </div>
            </div>
            <div className="portfolio-item">
              <img src="/asset/REACT_img.jpg" alt="프로젝트 이름" />
              <div className="description">
                <h2>Tripper Maker</h2>
                <div>2023년 6월 - 2023년 7월</div>
                <div>참여 인원: 3명</div>
                <p>
                  이 프로젝트는 여행을 좋아하는 사람들이 정보와 후기를 공유하는
                  사이트입니다.
                </p>
              </div>
            </div>
            <div className="portfolio-item">
              <img src="/asset/REACT_img.jpg" alt="프로젝트 이름" />
              <div className="description">
                <h2>Tripper Maker</h2>
                <div>2023년 6월 - 2023년 7월</div>
                <div>참여 인원: 3명</div>
                <p>
                  이 프로젝트는 여행을 좋아하는 사람들이 정보와 후기를 공유하는
                  사이트입니다.
                </p>
              </div>
            </div>
            <div className="portfolio-item">
              <img src="/asset/REACT_img.jpg" alt="프로젝트 이름" />
              <div className="description">
                <h2>Tripper Maker</h2>
                <div>2023년 6월 - 2023년 7월</div>
                <div>참여 인원: 3명</div>
                <p>
                  이 프로젝트는 여행을 좋아하는 사람들이 정보와 후기를 공유하는
                  사이트입니다.
                </p>
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
