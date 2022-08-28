import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoListBlock = ({ todos, onRemove, onEdit }) => {
  const [todoData, setTodoData] = useState([]);

  const getTodoList = async () => {
    console.log("List 데이터 받아오기");
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <TodoListBlockStyle>
      {todos.map((todo) => (
        <TodoItem
          key={uuidv4()}
          id={todo.id}
          todo={todo}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      ))}
    </TodoListBlockStyle>
  );
};

export default TodoListBlock;

const TodoListBlockStyle = styled.ul``;
