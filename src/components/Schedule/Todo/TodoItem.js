import { useState, useEffect } from 'react';
import { MdEdit, MdDelete, MdSave } from 'react-icons/md';
import { Remove, Text, TodoItemBlock } from './todoStyle';
import axios from 'axios';
import '../../../statics/css/todo.css';

export default function TodoItem({ todo, dailyList, setDailyList }) {
  const [thisTodo, setThisTodo] = useState(todo.todoContent);
  const [thisDone, setThisDone] = useState(todo.todoCompleted);
  const [wantEdit, setWantEdit] = useState(false);
  async function saveTodo() {
    try {
      const response = await axios.patch(
        process.env.REACT_APP_SERVER_URL + `/todos/${todo.todoSeq}`,
        {
          content: thisTodo,
          completed: thisDone,
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('accessToken'),
          },
        }
      );
      setDailyList(
        dailyList.map((daily) =>
          daily.todoSeq === todo.todoseq
            ? { ...dailyList, todoContent: thisTodo }
            : daily
        )
      );
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    saveTodo();
  }, [thisDone]);
  const onChange = (e) => {
    setThisTodo(e.target.value);
  };
  async function onDelete() {
    try {
      const response = await axios.delete(
        process.env.REACT_APP_SERVER_URL + `/todos/${todo.todoSeq}`,
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('accessToken'),
          },
        }
      );
      setDailyList(() =>
        dailyList.filter((daily) => daily.todoSeq !== todo.todoSeq)
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <TodoItemBlock>
        <input
          id="daily_todo_check"
          type="checkbox"
          checked={thisDone}
          style={{ fontFamily: 'pretendard', margin: '0 1rem' }}
          onChange={() => setThisDone(!thisDone)}
        />
        {wantEdit ? (
          <input
            value={thisTodo}
            onChange={onChange}
            style={{ fontFamily: 'pretendard' }}
          ></input>
        ) : (
          <Text style={{ fontFamily: 'pretendard' }}>{thisTodo}</Text>
        )}
        {wantEdit ? (
          <Remove
            onClick={() => {
              setWantEdit(!wantEdit);
              saveTodo();
            }}
          >
            <MdSave
              onClick={() => {
                setWantEdit(!wantEdit);
                saveTodo();
              }}
            />
          </Remove>
        ) : (
          <Remove>
            <MdEdit
              onClick={() => {
                setWantEdit(!wantEdit);
              }}
            />
          </Remove>
        )}
        <Remove
          onClick={() => {
            onDelete();
          }}
        >
          <MdDelete
          // onClick={() => {
          //   onDelete();
          // }}
          />
        </Remove>
      </TodoItemBlock>
    </div>
  );
}
