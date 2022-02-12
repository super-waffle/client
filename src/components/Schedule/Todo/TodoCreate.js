import { MdAddBox } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useCallback } from 'react';
import { todoSubmit } from '../scheduleSlice';
import axios from 'axios';

export default function CreateTodo() {
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');
  const addTodo = useCallback(() => {
    axios
      .post(
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
      )
      .then((res) => {
        setNewTodo('');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newTodo, selectedDay]);
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
          dispatch(todoSubmit());
        }}
      />
    </div>
  );
}
