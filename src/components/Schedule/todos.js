import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';

export default function TodoList() {
  const [todo, setTodo] = useState('');
  const [dailyTodos, setDailyTodos] = useState([]);
  var reverseList = [...dailyTodos].reverse();
  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (todo === '') {
      return;
    }
    setDailyTodos((currentArr) => [todo, ...currentArr]);
    setTodo('');
  };
  return (
    <Container>
      <Row style={{ margin: '0.5rem' }}>
        <h4 style={{ padding: '0rem' }}>Todo</h4>
      </Row>
      <Row
        style={{
          backgroundColor: '#fcfcfc',
          border: '1px solid #ededed',
          boxSizing: 'border-box',
          borderRadius: '10px',
          padding: '1rem',
        }}
      >
        <ul>
          {reverseList.map((dailyTodo, index) => (
            <div key={index} style={{ margin: '0.5rem' }}>
              <input
                type="checkbox"
                style={{ marginRight: '1rem' }}
              ></input>
              <label style={{ fontFamily: 'pretandard' }}>
                {dailyTodo}
              </label>
            </div>
          ))}
        </ul>
        <form onSubmit={onSubmit}>
          <input
            value={todo}
            onChange={onChange}
            type="text"
            placeholder="할 일을 입력해주세요!"
          />
          <button>+</button>
        </form>
      </Row>
    </Container>
  );
}
