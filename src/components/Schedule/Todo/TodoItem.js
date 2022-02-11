import { useState } from 'react';

export default function TodoItem({ todo }) {
  const [thisTodo, setThisTodo] = useState(todo.todoContent);
  const [thisDone, setThisDone] = useState(todo.todoCompleted);
  return (
    <div style={{ margin: '1rem' }}>
      <input type="checkbox" style={{ margin: '0.5rem' }} />
      <span>{thisTodo}</span>
    </div>
  );
}
