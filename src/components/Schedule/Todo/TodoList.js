import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import CreateTodo from "./TodoCreate";
import axios from "axios";
import "../../../statics/css/Todo/todoList.css";

export default function TodoList() {
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  const [dailyList, setDailyList] = useState([]);
  const today = useSelector((state) => state.schedule.today);
  async function getTodos() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL +
          `/todos?date=${JSON.parse(selectedDay)}`,
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("accessToken"),
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
  useEffect(() => {}, [dailyList]);

  // console.log(selectedDay, today);
  return (
    <div className="todo-list">
      <div className="todo-list__header">
        {/* {parseInt(selectedDay.split("-")[2].slice(0, 2))}일의 할일 */}
        오늘의 할 일
      </div>
      <div className="todo-list__body">
        {dailyList &&
          dailyList.map((todo) => (
            <TodoItem
              key={todo.todoSeq}
              todo={todo}
              dailyList={dailyList}
              setDailyList={setDailyList}
              day={selectedDay}
            />
          ))}
        {today === selectedDay && (
          <CreateTodo dailyList={dailyList} setDailyList={setDailyList} />
        )}
      </div>
    </div>
  );
}
