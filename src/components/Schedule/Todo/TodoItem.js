import { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdSave } from "react-icons/md";
import axios from "axios";
import "../../../statics/css/Todo/todoItem.css";

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
            Authorization: `Bearer ` + localStorage.getItem("accessToken"),
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
            Authorization: `Bearer ` + localStorage.getItem("accessToken"),
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
    <div className="todo-item">
      <div className="todo-item-block">
        <div className="todo-item-block__todo">
          <input
            className="todo-item-block__checkbox"
            id="daily_todo_check"
            type="checkbox"
            checked={thisDone}
            onChange={() => setThisDone(!thisDone)}
          />
          {wantEdit ? (
            <input
              className="todo-item__edit"
              value={thisTodo}
              onChange={onChange}
            ></input>
          ) : (
            <div className="todo-item-block-text">{thisTodo}</div>
          )}
        </div>
        <div className="todo-item-block__btns">
          {wantEdit ? (
            <div
              className="todo-item-blick__remove"
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
            </div>
          ) : (
            <div className="todo-item-blick__remove">
              <MdEdit
                onClick={() => {
                  setWantEdit(!wantEdit);
                }}
              />
            </div>
          )}

          <div
            className="todo-item-blick__remove"
            onClick={() => {
              onDelete();
            }}
          >
            <MdDelete />
          </div>
        </div>
      </div>
    </div>
  );
}
