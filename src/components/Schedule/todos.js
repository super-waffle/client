import { useState } from 'react';

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
  console.log(dailyTodos);
  return (
    <div>
      <h3>01.28 todo 리스트</h3>
      <ul>
        {reverseList.map((dailyTodo, index) => (
          <li key={index}>{dailyTodo}</li>
        ))}
      </ul>
      <form onSubmit={onSubmit}>
        <input
          value={todo}
          onChange={onChange}
          type="text"
          placeholder="할 일을 입력해주세요!"
        />
        <button>추가</button>
      </form>
    </div>
  );
}
