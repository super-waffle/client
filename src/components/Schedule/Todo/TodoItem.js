import { useState, useEffect, useCallback } from 'react';
import { MdEdit, MdDelete, MdSave } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { todoSubmit } from '../scheduleSlice';
import axios from 'axios';

import { Remove, Text, TodoItemBlock } from './todoStyle';

export default function TodoItem({ todo }) {
  const [thisTodo, setThisTodo] = useState(todo.todoContent);
  const [thisDone, setThisDone] = useState(todo.todoCompleted);
  const [wantEdit, setWantEdit] = useState(false);
  const dispatch = useDispatch();
  const saveTodo = useCallback(() => {
    axios
      .patch(
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
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    saveTodo();
  }, [thisDone]);
  const onChange = (e) => {
    setThisTodo(e.target.value);
  };
  const onDelete = (e) => {
    axios
      .delete(process.env.REACT_APP_SERVER_URL + `/todos/${todo.todoSeq}`, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem('accessToken'),
        },
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <TodoItemBlock>
        <input
          type="checkbox"
          style={{ marginLeft: '1rem', marginRight: '1rem', color: '#565656' }}
          checked={thisDone}
          onChange={() => setThisDone(!thisDone)}
        />
        {wantEdit ? (
          <input
            value={thisTodo}
            onChange={onChange}
            onKeyUp={saveTodo}
          ></input>
        ) : (
          <Text>{thisTodo}</Text>
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
            dispatch(todoSubmit());
          }}
        >
          <MdDelete
            onClick={() => {
              onDelete();
              dispatch(todoSubmit());
            }}
          />
        </Remove>
      </TodoItemBlock>
    </div>
  );
}
