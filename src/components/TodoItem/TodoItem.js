import styled from "styled-components";
import { useContext, memo, useMemo } from "react";
import { TodoContext } from "../../contexts/TodoContext";

const ItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 15px 20px;
  margin: auto 0;
  border-bottom: 1px solid ${(props) => props.theme.color.grey};
`;

const CancelButton = styled.button`
  font-size: 20px;
  background-color: ${(props) => props.theme.color.white};
  border: none;
  font-weight: 900;
  transition: 0.3s all;

  &:hover {
    color: ${(props) => props.theme.color.red};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

const ItemCheckbox = styled.input`
  width: 1.5em;
  height: 1.5em;
  flex-shrink: 0;
  margin-right: 15px;
  vertical-align: bottom;
  position: relative;
  border: 1px solid ${(props) => props.theme.color.grey};
  border-radius: 4px;
  appearance: none;
  cursor: pointer;
  transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);

  &::before {
    position: absolute;
    content: "";
    display: block;
    top: 1px;
    left: 7px;
    width: 5px;
    height: 14px;
    border-style: solid;
    border-color: ${(props) => props.theme.color.yellow};
    border-width: 0 4px 4px 0;
    transform: rotate(45deg);
    opacity: 0;
  }

  &:checked {
    color: ${(props) => props.theme.color.black};
    background: ${(props) => props.theme.color.grey};
    &::before {
      opacity: 1;
    }
    ~ label::before {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
`;

const ItemContent = styled.label`
  position: relative;
  cursor: pointer;
  font-size: 1.3em;
  font-weight: 400;
  word-break: break-all;
  &::before {
    position: absolute;
    content: attr(data-content);
    color: ${(props) => props.theme.color.grey};
    clip-path: polygon(0 0, 0 0, 0% 100%, 0 100%);
    text-decoration: line-through;
    text-decoration-thickness: 3px;
    text-decoration-color: ${(props) => props.theme.color.yellow};
    transition: clip-path 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  @media (min-width: 768px) {
    font-size: 1.5em;
  }
`;

const TodoEditInput = styled.input`
  font-size: 1.3em;
  width: 80%;
  border: 4px solid ${(props) => props.theme.color.deepRed};
  border-radius: 5px;
  margin-left: 35px;

  &:focus {
    outline-color: ${(props) => props.theme.color.deepRed};
  }
  @media (min-width: 768px) {
    font-size: 1.5em;
  }
`;

const TodoItem = memo(({ todo }) => {
  console.log("render TodoItem");
  console.log(todo);
  const {
    handleClick,
    handleDoubleClick,
    handleDeleteTodo,
    handleEditTodo,
    restoreEdit,
    isEnterPressedForEdit,
  } = useContext(TodoContext);

  const click = useMemo(
    () => () => {
      handleClick(todo.id);
    },
    [handleClick, todo.id]
  );

  const doubleClick = useMemo(
    () => (e) => handleDoubleClick(todo.id, e),
    [handleDoubleClick, todo.id]
  );
  const deleteClick = useMemo(
    () => () => handleDeleteTodo(todo.id),
    [handleDeleteTodo, todo.id]
  );

  const onInputChange = useMemo(
    () => (e) => handleEditTodo(todo.id, e),
    [handleEditTodo, todo.id]
  );

  const onBlut = useMemo(
    () => () => restoreEdit(todo.id),
    [restoreEdit, todo.id]
  );

  const onKeyDown = useMemo(
    () => (e) => isEnterPressedForEdit(e, todo.id),
    [isEnterPressedForEdit, todo.id]
  );

  return !todo.isEdit ? (
    <ItemContainer>
      <ContentWrapper onDoubleClick={(e) => doubleClick(e)}>
        <ItemCheckbox
          type="checkbox"
          id={todo.id}
          onChange={click}
          checked={todo.isDone}
        />
        <ItemContent htmlFor={todo.id} data-content={todo.content}>
          {todo.content}
        </ItemContent>
      </ContentWrapper>
      <CancelButton onClick={deleteClick}>X</CancelButton>
    </ItemContainer>
  ) : (
    <ItemContainer>
      <TodoEditInput
        value={todo.content}
        onChange={(e) => onInputChange(e)}
        onBlur={onBlut}
        onKeyDown={onKeyDown}
        id="editting"
      />
    </ItemContainer>
  );
});

export default TodoItem;
