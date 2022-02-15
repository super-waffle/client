import { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdSave } from "react-icons/md";
import axios from "axios";
import "../../../statics/css/Todo/todoItem.css";
import { useSelector } from "react-redux";

export default function TodoItem({ todo, dailyList, setDailyList, day }) {
  const [thisTodo, setThisTodo] = useState(todo.todoContent);
  const [thisDone, setThisDone] = useState(todo.todoCompleted);
  const [wantEdit, setWantEdit] = useState(false);
  const today = useSelector((state) => state.schedule.today);
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
  // console.log(thisDone);
  // console.log(today, day);
  const onClickDone = () => {
    if (today === day) {
      setThisDone(!thisDone);
    }
  };
  return (
    <div className="todo-item">
      <div className="todo-item-block">
        <div className="todo-item-block__todo">
          {thisDone ? (
            // <img
            //   className={`todo-item-block__checkbox ${
            //     today === day ? "checkable" : "disable"
            //   }`}
            //   src="icons/todo/_todo-checked.svg"
            //   alt=""
            //   onClick={() => {
            //     onClickDone();
            //   }}
            // />
            <svg
              className={`todo-item-block__checkbox ${
                today === day ? "checkable" : "disable"
              }`}
              onClick={() => {
                onClickDone();
              }}
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="1" y="1" width="18" height="18" rx="6" fill="#6667AB" />
              <path
                d="M6 11L9 13L14.5 7"
                stroke="white"
                strokeWidth="2.01011"
              />
              <rect
                x="1"
                y="1"
                width="18"
                height="18"
                rx="6"
                stroke="#6667AB"
                strokeWidth="2"
              />
            </svg>
          ) : (
            // <img
            //   className={`todo-item-block__checkbox ${
            //     today === day ? "checkable" : "disable"
            //   }`}
            //   src="icons/todo/_todo-not-checked.svg"
            //   alt=""
            //   onClick={() => {
            //     onClickDone();
            //   }}
            //   />
            <svg
              className={`todo-item-block__checkbox ${
                today === day ? "checkable" : "disable"
              }`}
              onClick={() => {
                onClickDone();
              }}
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="18"
                height="18"
                rx="6"
                stroke="#CED4DA"
                strokeWidth="2"
              />
            </svg>
          )}

          {wantEdit ? (
            <input
              className="todo-item__edit"
              value={thisTodo}
              onChange={onChange}
            ></input>
          ) : (
            <div
              className={`todo-item-block-text ${thisDone ? "todo-done" : ""}`}
            >
              {thisTodo}
            </div>
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
