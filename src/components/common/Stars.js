import React, { useEffect, useRef } from 'react';

const Stars = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const createStars = () => {
      starsRef.current = [];
      const numStars = 100;

      for (let i = 0; i < numStars; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random(), // 초기 불투명도 설정
          twinkleSpeed: Math.random() * 0.02 + 0.01, // 반짝임 속도
          twinkleDirection: Math.random() > 0.5 ? 1 : -1, // 반짝임 방향
        });
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // 반짝임 업데이트
        star.opacity += star.twinkleSpeed * star.twinkleDirection;

        // 반짝임 방향 변경
        if (star.opacity <= 0 || star.opacity >= 1) {
          star.twinkleDirection *= -1;
        }
      });

      requestAnimationFrame(drawStars);
    };

    resizeCanvas();
    drawStars();
    window.addEventListener('resize', resizeCanvas); //창 크기가 변결될 때마다 캔버스 크기를 업데이트하고 별의 위치를 재설정

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas className="stars" ref={canvasRef} />;
};

export default Stars;
