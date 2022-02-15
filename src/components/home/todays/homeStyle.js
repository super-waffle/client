import styled from "styled-components";

export const Graph = styled.div`
  position: relative;
  top: -10px;
  height: 10px;
  background-color: #6667ab;
  border-radius: 10px;
  width: ${(props) => (props.total / props.goal) * 100}%;
`;
// width: ${(props) => (props.total / props.goal) * 100}%;
