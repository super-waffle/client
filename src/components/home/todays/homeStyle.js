import styled from "styled-components";

export const Graph = styled.div`
  z-index=0;
  position: relative;
  top: -10px;
  height: 10px;
  background-color: #6667ab;
  border-radius: 10px;
  width: ${(props) => {
    if (props.total > props.goal) {
      return 100;
    } else {
      return (props.total / props.goal) * 100;
    }
  }}%;
`;
// width: ${(props) => (props.total / props.goal) * 100}%;
// position: relative;
