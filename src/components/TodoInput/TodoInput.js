import styled from "styled-components";
import { memo } from "react";

const TodoInputContainner = styled.div`
  margin: 0 auto;
  width: 80%;
  max-width: 760px;
`;

const TodoInputText = styled.input`
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border: none;
  font-size: 1.5em;
  color: ${(props) => props.theme.color.grey};
  border-radius: 0.2rem;
  &:focus {
    outline: none;
  }
`;

const TodoInput = memo(
  ({ value, inputChange, handleAddTodo, isEnterPressed }) => {
    console.log("render todo input");

    return (
      <TodoInputContainner>
        <TodoInputText
          type="text"
          value={value}
          onChange={inputChange}
          onBlur={handleAddTodo}
          onKeyDown={isEnterPressed}
        ></TodoInputText>
      </TodoInputContainner>
    );
  }
);

export default TodoInput;
