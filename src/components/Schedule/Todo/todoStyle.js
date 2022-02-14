import styled, { css } from "styled-components";

export const Remove = styled.div`
  margin-left: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 1.3rem;
  cursor: pointer;
  opacity: 0;
  &:hover {
    color: #ff6b6b;
  }
`;

export const Text = styled.div`
  flex: 1;
  display: contents;
  font-family: pretendard;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      font-weight: bold;
      font-family: pretendard;
    `}
`;

export const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 0.3rem;
  &:hover {
    ${Remove} {
      opacity: 1;
    }
  }
`;
