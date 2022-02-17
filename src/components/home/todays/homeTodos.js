import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TodoItem from "../../Schedule/Todo/TodoItem";
import "../../../statics/css/home/homeTodos.css";
import CreateTodo from "./homeCreateTodos";

export default function HomeTodos(props) {
  const today = useSelector((state) => state.schedule.today);
  const [dailyList, setDailyList] = useState([]);
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    setIsAdd(props.add);
  }, [props]);

  async function getTodos() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + `/todos?date=${JSON.parse(today)}`,
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
  useEffect(() => getTodos(), [today]);
  useEffect(() => {}, [dailyList]);
  return (
    <div className="home-todos">
      {dailyList &&
        dailyList.map((todo) => (
          <TodoItem
            key={todo.todoSeq}
            todo={todo}
            dailyList={dailyList}
            setDailyList={setDailyList}
            day={today}
          />
        ))}
      {!dailyList && !isAdd && (
        <div className="todo-no-data">오늘 해야할 일을 추가해주세요</div>
      )}
      {isAdd ? (
        <CreateTodo dailyList={dailyList} setDailyList={setDailyList} />
      ) : (
        <div className="empty-box"></div>
      )}
    </div>
  );
}
