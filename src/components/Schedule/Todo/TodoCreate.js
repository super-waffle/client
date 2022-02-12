import { MdAddBox } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';

export default function CreateTodo({ dailyList, setDailyList }) {
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  const [newTodo, setNewTodo] = useState('');
  async function addTodo() {
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + '/todos',
        {
          date: selectedDay.slice(1, 11),
          content: newTodo,
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('accessToken'),
          },
        }
      );
      setDailyList(
        dailyList.concat({
          todoCompleted: false,
          todoContent: newTodo,
          todoDate: selectedDay,
          todoSeq: Math.floor(Math.random()),
          userSeq: null,
        })
      );
      setNewTodo('');
    } catch (err) {}
  }

  return (
    <div style={{ padding: '1rem' }}>
      <input
        type="text"
        placeholder="할 일을 추가해주세요."
        value={newTodo}
        onChange={(event) => setNewTodo(event.target.value)}
      ></input>
      <MdAddBox
        style={{
          fontSize: '2rem',
          cursor: 'pointer',
        }}
        onClick={() => {
          addTodo();
        }}
      />
    </div>
  );
}
