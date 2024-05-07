import styled from 'styled-components';
import { Link } from '../../../../../../../node_modules/react-router-dom/dist/index';

const StyledCube = styled.div`
  .perspective {
    perspective: 2000px;
    position: relative;
    perspective-origin: 25rem -150px;
  }

  .cube {
    position: relative;
    width: 400px;
    margin: 3.5rem auto;
    transition: 0, 5s;
    transform-style: preserve-3d;
    animation: rotate 10s infinite linear;

    @keyframes rotate {
      0% {
        transform: rotateY(0deg);
      }
      100% {
        transform: rotateY(360deg);
      }
    }

    div {
      position: absolute;
      width: 400px;
      height: 400px;
      opacity: 0.95;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .front {
      transform: translateZ(200px) rotateY(180deg);
    }
    .back {
      transform: translateZ(-200px) rotateY(180deg);
    }
    .left {
      transform: rotateY(-90deg) translateZ(200px);
    }
    .right {
      transform: rotateY(90deg) translateZ(200px);
    }
    .top {
      transform: rotateX(90deg) translateZ(200px);
    }
    .bottom {
      transform: rotateX(-90deg) translateZ(200px);
    }
  }
`;

const Cube = (props) => (
  <StyledCube>
    <div className="perspective">
      <div className="cube">
        <div className="front">
          <Link to="/profile">
            <img src="/image/karina.jpg" alt="frontImg" />
          </Link>
        </div>
        <div className="back">
          <Link to="/aboutme">
            <img src="/image/jangwonyoung.jpg" alt="backImg" />
          </Link>
        </div>
        <div className="top">
          <Link to="/gitaddress">
            <img src="/image/kimdami.jpg" alt="topImg" />
          </Link>
        </div>
        <div className="bottom">
          <Link to="review">
            <img src="/image/kimtaeri.jpg" alt="bottomImg" />
          </Link>
        </div>
        <div className="left">
          <Link to="stack">
            <img src="/image/kwonnara.jpg" alt="leftImg" />
          </Link>
        </div>
        <div className="right">
          <Link to="portfolio">
            <img src="/image/IU.jpg" alt="rightImg" />
          </Link>
        </div>
      </div>
    </div>
  </StyledCube>
);

export default Cube;
