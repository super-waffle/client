import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './todoItem';
import CreateTodo from './todoCreate';
import axios from 'axios';

export default function TodoList() {
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  const [dailyList, setDailyList] = useState([]);
  async function getTodos() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL +
          `/todos?date=${JSON.parse(selectedDay)}`,
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('accessToken'),
          },
        }
      );
      let updatedTodos = await response.data.todoList;
      setDailyList(() => []);
      setTimeout(() => {
        setDailyList(() => updatedTodos);
      }, 100);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => getTodos(), [selectedDay]);
  return (
    <div>
      <h5 style={{ fontFamily: 'pretandard', fontWeight: 'bold' }}>
        {parseInt(selectedDay.split('-')[2].slice(0, 2))}일의 할일
      </h5>
      <div
        style={{
          background: '#fcfcfc',
          border: '1px solid #ededed',
          boxSizing: 'border-box',
          borderRadius: '5px',
          margin: '1.5rem 0rem',
        }}
      >
        {dailyList &&
          dailyList.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              dailyList={dailyList}
              setDailyList={setDailyList}
            />
          ))}
        <CreateTodo dailyList={dailyList} setDailyList={setDailyList} />
      </div>
    </div>
  );
}
