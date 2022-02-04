import React from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './TodoTemplate';
import TodoHead from './TodoHead';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';
import { TodoProvider } from './TodoContext';

// GlobalStyle:배경색 조절
// 나중에 지워도 됨
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
      <TodoProvider>
        <GlobalStyle />
        <TodoTemplate>
          <TodoHead />
          <TodoList />
          <TodoCreate />
        </TodoTemplate>
      </TodoProvider>
    </>
  );
}

export default DailyTodoList;
