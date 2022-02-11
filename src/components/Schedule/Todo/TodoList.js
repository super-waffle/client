import { useState, useCallback } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './todoItem';
import axios from 'axios';

export default function TodoList({ dailyList }) {
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  console.log('투두리스트 렌더링');
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
          dailyList.map((todo, index) => <TodoItem key={index} todo={todo} />)}
        <h4>+ todo create</h4>
      </div>
    </div>
  );
}
