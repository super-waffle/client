import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const [position, setPosition] = useState(0);
  const navigate = useNavigate();
  function onScroll() {
    setPosition(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return (
    <div
      style={{
        width: '100%',
        overflow: 'x-hidden',
        minHeight: '2000px',
        maxHeight: '3700px',
        backgroundColor: '#f4f4f4',
        textAlign: 'center',
      }}
    >
      <img
        src={'/images/landing/landing1.jpg' ? '/images/landing/landing1.jpg' : null}
        style={{
          width: '100%',
          padding: '1rem',
          backgroundPositionY: position / 2,
          alignItems: 'center',
        }}
        alt=""
      />

      <p
        style={{
          margin: '400px 0px',
          transform: `translateX(${-position - 300}px)`,
          fontWeight: 'bold',
          fontSize: '120px',
          position: 'relative',
          zIndex: '2',
          left: '70%',
          textAlign: 'center',
          fontFamily: 'pretendard',
        }}
      >
        <span style={{ color: '#6777ab' }}>일정 관리</span>도 힘들고...
      </p>
      <p
        style={{
          margin: '400px 0px',
          transform: `translateX(${position - 100}px)`,
          fontWeight: 'bold',
          fontSize: '120px',
          position: 'relative',
          zIndex: '2',
          right: '70%',
          textAlign: 'center',
          fontFamily: 'pretendard',
        }}
      >
        <span style={{ color: '#6777ab' }}>꾸준히</span> 하는 건 더 힘들어...
      </p>
      <p
        style={{
          marginTop: '150px',
          transform: `translateX(${-position + 800}px)`,
          fontWeight: 'bold',
          fontSize: '120px',
          position: 'relative',
          zIndex: 2,
          left: '70%',
          textAlign: 'center',
          fontFamily: 'pretendard',
        }}
      >
        <span style={{ color: '#6777ab' }}>성취감</span>은 사치지...
      </p>
      <p
        style={{
          marginTop: '400px',
          transform: `translateX(${position - 2600}px)`,
          fontWeight: 'bold',
          fontSize: '120px',
          position: 'relative',
          zIndex: 2,
          opacity: 1,
          textAlign: 'center',
          fontFamily: 'pretendard',
        }}
      >
        이럴 땐...?
      </p>
      <img style={{ marginTop: '600px', height: '100px' }} src="/images/landing/logo.png" alt="logo" />
      <p
        style={{
          fontSize: '60px',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          fontFamily: 'pretendard',
          fontWeight: 'bold',
        }}
      >
        공습으로 오세요!
      </p>
      <p>
        지금 바로{' '}
        <span style={{ color: '#6777ab', cursor: 'pointer' }} onClick={() => navigate('/signup')}>
          회원가입
        </span>
        하세요
      </p>
    </div>
  );
}

export default React.memo(Landing);
