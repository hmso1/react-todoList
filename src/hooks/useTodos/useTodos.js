import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import useInput from "../useInput";
import useClickPreventionOnDoubleClick from "../useClickPreventionOnDoubleClick";

export default function useTodos() {
  const { value, setValue, handleInputChange } = useInput();

  const id = useRef(1);
  const [todos, setTodos] = useState(() => {
    const todosJson = window.localStorage.getItem("todos");

    if (!todosJson || !JSON.parse(todosJson).length) {
      return [];
    }
    const todos = JSON.parse(todosJson);
    id.current = todos[0].id + 1;
    return todos;
  });

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
    if (document.querySelector("#editting")) {
      document.querySelector("#editting").focus();
    }
  }, [todos]);

  const handleAddTodo = useCallback(() => {
    if (value === "") {
      return;
    }
    setTodos([
      {
        id: id.current,
        content: value,
        isDone: false,
        isEdit: false,
      },
      ...todos,
    ]);
    setValue("");
    id.current++;
  }, [value, setValue, todos, id]);

  const onClick = useMemo(
    () => (id) => {
      setTodos(
        todos.map((todo) => {
          if (todo.id !== id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        })
      );
    },
    [todos]
  );

  const onDoubleClick = useMemo(
    () => (id, e) => {
      setTodos(
        todos.map((todo) => {
          if (todo.id !== id) return todo;
          return {
            ...todo,
            isEdit: !todo.isEdit,
          };
        })
      );
    },
    [todos, setTodos]
  );

  const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(
    onClick,
    onDoubleClick
  );

  const handleDeleteTodo = useMemo(
    () => (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const handleDeleteAllCompletedTodo = useMemo(
    () => () => {
      setTodos(todos.filter((todo) => !todo.isDone));
    },
    [todos]
  );

  const isEnterPressed = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleAddTodo();
      }
    },
    [handleAddTodo]
  );

  const handleEditTodo = useMemo(
    () => (id, e) => {
      setTodos(
        todos.map((todo) => {
          if (todo.id !== id) return todo;
          return {
            ...todo,
            content: e.target.value,
          };
        })
      );
    },
    [todos, setTodos]
  );

  const restoreEdit = useMemo(
    () => (id) => {
      setTodos(
        todos.map((todo) => {
          if (todo.id !== id) return todo;
          return {
            ...todo,
            isEdit: false,
          };
        })
      );
    },
    [todos, setTodos]
  );

  const isEnterPressedForEdit = useMemo(
    () => (e, id) => {
      if (e.key === "Enter") {
        restoreEdit(id);
      }
    },
    [restoreEdit]
  );

  const todoContext = useMemo(
    () => ({
      handleClick,
      handleDoubleClick,
      handleDeleteTodo,
      todos: todos,
      setTodos,
      handleDeleteAllCompletedTodo,
      handleEditTodo,
      restoreEdit,
      isEnterPressedForEdit,
    }),
    [
      handleClick,
      handleDoubleClick,
      handleDeleteTodo,
      todos,
      setTodos,
      handleDeleteAllCompletedTodo,
      handleEditTodo,
      restoreEdit,
      isEnterPressedForEdit,
    ]
  );

  return {
    value,
    handleInputChange,
    handleAddTodo,
    todoContextObj: todoContext,
    todos: todos,
    isEnterPressed,
  };
}
