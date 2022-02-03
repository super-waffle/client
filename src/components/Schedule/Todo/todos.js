import React from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './TodoTemplate';
import TodoHead from './TodoHead';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function DailyTodoList() {
  return (
    <>
      <h3
        style={{
          marginBottom: '1.3rem',
        }}
      >
        0일의 todolist
      </h3>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </>
  );
}

export default DailyTodoList;
