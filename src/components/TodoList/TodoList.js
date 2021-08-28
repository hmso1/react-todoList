import styled from "styled-components";
import { TodoFilter } from "../TodoFilter";
import TodoItem from "../TodoItem";
import { useContext, memo } from "react";
import { TodoContext } from "../../contexts/TodoContext";
import { FilterContext } from "../../contexts/FilterContext";

const TodoContainer = styled.div`
  width: 80%;
  max-width: 760px;
  background-color: ${(props) => props.theme.color.white};
  margin: 30px auto;
`;

const TodoUl = styled.ul`
  padding: 0;
  list-style-type: none;
`;

const TodoList = memo(() => {
  console.log("render TodoList");
  const { todos } = useContext(TodoContext);
  const { filter } = useContext(FilterContext);

  const generateItem = todos
    .filter((todo) => {
      if (filter === "Active") return !todo.isDone;
      if (filter === "Complete") return todo.isDone;
      return true;
    })
    .map((todo) => <TodoItem todo={todo} key={todo.id} />);
  return (
    <TodoContainer>
      <TodoUl>{generateItem}</TodoUl>
      <TodoFilter />
    </TodoContainer>
  );
});
export default TodoList;
