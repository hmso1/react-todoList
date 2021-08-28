import "./App.css";
import styled from "styled-components";
import TodoInput from "../TodoInput";
import TodoList from "../TodoList";
import useTodos from "../../hooks/useTodos";
import useFilter from "../../hooks/useFilter/useFilter";
import { FilterContext } from "../../contexts/FilterContext";
import { TodoContext } from "../../contexts/TodoContext";

const Container = styled.div`
  margin-top: 80px;
  margin: 0 auto;
`;

const Header = styled.h1`
  font-size: 3.5em;
  font-weight: 900;
  color: ${(props) => props.theme.color.orange};
  text-align: center;
  text-shadow: 2px 2px 1px ${(props) => props.theme.color.yellow},
    4px 4px 1px ${(props) => props.theme.color.lightYellow};

  @media (min-width: 768px) {
    font-size: 5em;
  }
`;
function App() {
  console.log("App render");
  const {
    value,
    handleInputChange,
    handleAddTodo,
    todoContextObj,
    isEnterPressed,
    todos,
  } = useTodos();

  const { filterContextObj } = useFilter();

  return (
    <Container>
      <Header>TO-DO LIST</Header>
      <TodoInput
        value={value}
        inputChange={handleInputChange}
        handleAddTodo={handleAddTodo}
        isEnterPressed={isEnterPressed}
      />

      <TodoContext.Provider value={todoContextObj}>
        <FilterContext.Provider value={filterContextObj}>
          {todos.length !== 0 && <TodoList />}
        </FilterContext.Provider>
      </TodoContext.Provider>
    </Container>
  );
}

export default App;
