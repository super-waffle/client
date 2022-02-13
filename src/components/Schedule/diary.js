import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Diary() {
  const URL = 'https://api.thecatapi.com/v1/images/search';
  const [catURL, setCatURL] = useState('');
  const [maxim, setMaxim] = useState('');
  const getCatImg = async () => {
    axios.get(URL).then((response) => setCatURL(response.data[0]['url']));
  };
  const getMaxim = async () => {
    axios
      .get('https://api.adviceslip.com/advice')
      .then((response) => setMaxim(response.data['slip']['advice']));
  };

  useEffect(() => {
    getMaxim();
    getCatImg();
  }, []);

  return (
    <div style={{ margin: '1rem 0rem' }}>
      <h4
        style={{
          margin: '1rem 0rem',
          fontFamily: 'pretendard',
          fontWeight: 'bold',
        }}
      >
        하루 기록
      </h4>
      <Row
        style={{
          backgroundColor: '#FCFCFC',
          borderRadius: '5px',
          margin: '1rem',
          padding: '1rem',
        }}
      >
        <Col sm={4} md={4} lg={4}>
          <img
            src={catURL}
            style={{
              width: '15vw',
              margin: '1rem',
              borderRadius: '5px',
            }}
            alt=""
          />
        </Col>
        <Col
          style={{
            fontFamily: 'pretendard',
            margin: 'auto 0rem',
            textAlign: 'center',
          }}
        >
          {/* <h4>{maxim}</h4> */}
          <h4>과유불급이댜옹~</h4>
        </Col>
      </Row>
    </div>
  );
}
