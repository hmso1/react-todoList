import { useMemo, useContext } from "react";
import { FilterContext } from "../../contexts/FilterContext";
import { TodoContext } from "../../contexts/TodoContext";
import styled from "styled-components";

const FilterButton = styled.button`
  background-color: white;
  padding: 5px 10px;
  transition: 0.3s all;
  cursor: pointer;
  border-radius: 0.2rem;
  border: 1px solid #979895;


  & + & {
    margin-left: 10px;
  }
  &:hover {
    background-color: #979895;
    color: #fff;
  }

  @ 
`;

const hover = {
  backgroundColor: "#979895",
  color: "#fff",
};

const filterButton = (content, isActived, cb) => {
  console.log(content);
  return function () {
    const filterButtonClick = () => cb(content);
    return (
      <FilterButton style={isActived ? hover : {}} onClick={filterButtonClick}>
        {content}
      </FilterButton>
    );
  };
};

export default function useButton() {
  const { handleDeleteAllCompletedTodo, todos } = useContext(TodoContext);
  const { handleChangeFilter, filter } = useContext(FilterContext);
  const incomplete = useMemo(() => {
    console.log("render incomplete item");
    return todos.filter((todo) => !todo.isDone).length;
  }, [todos]);

  const AllButton = useMemo(
    () => filterButton("All", filter === "All", handleChangeFilter),
    [filter, handleChangeFilter]
  );
  const ActiveButton = useMemo(
    () => filterButton("Active", filter === "Active", handleChangeFilter),
    [filter, handleChangeFilter]
  );
  const CompleteButton = useMemo(
    () => filterButton("Complete", filter === "Complete", handleChangeFilter),
    [filter, handleChangeFilter]
  );
  const ClearButton = useMemo(
    () => filterButton("ClearButton", false, handleDeleteAllCompletedTodo),
    [handleDeleteAllCompletedTodo]
  );

  return {
    incomplete: incomplete,
    AllButton,
    ActiveButton,
    CompleteButton,
    ClearButton,
  };
}
