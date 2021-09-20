import React, { useContext, createContext } from "react";
import styled from "styled-components";
// import { PropTypes } from "prop-types";
import TodosForm from "../Todos/TodosForm";
import TodoStatus from "../Todos/TodosList/TodosStatus";
import TodoItem from "../Todos/TodosList/TodoItem";
import useTodos from "../../useTodos";

// CSS in JS
const Body = styled.div`
  background-color: #ede4cd;
  display: flex;
  justify-content: column;
  height: 100vh;
`;

const TodoListContainer = styled.main`
  width: 70%;
  margin: 5% auto;
  text-align: center;
  border-top: 6px double rgba(248, 184, 98, 0.2);
  border-bottom: 6px double rgba(248, 184, 98, 0.2);
  padding: 2%;
`;

const TodoListTitle = styled.h1``;

const TodoListout = styled.section`
  border-radius: 5px 5px 0 5px;
  padding: 5% 0;
`;

// status filter buttons
const TodoListFilterBtns = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 5%;
  * {
    font-size: 1.3rem;
    background: transparent;
    border-radius: 5px;
    transition: all 0.3s;
    color: #b39b6f;
    border: none;
    border-top: 1px solid #b39b6f;
    border-bottom: 1px solid #b39b6f;
  }
`;
const UndoneBtn = styled.button`
  &:hover {
    color: #ede4cd;
    background: #716246;
    border-color: #716246;
  }
`;
const DoneBtn = styled.button`
  &:hover {
    background: #f39800;
    color: #fff1cf;
    border-color: #f39800;
  }
`;
const AllBtn = styled.button`
  &:hover {
    background: #74325c;
    color: #fef4f4;
    border-color: #74325c;
  }
`;
const ClearDoneBtn = styled.button`
  &:hover {
    background: #928c36;
    color: #fdfdc4;
    border-color: #928c36;
  }
`;
const ClearAllBtn = styled.button`
  &:hover {
    background: #c53d43;
    color: #fde8d0;
    border-color: #c53d43;
  }
`;
// status filter buttons structure
const TodoFilterGroup = () => {
  const {
    handleUndoneTodos,
    handleDoneTodos,
    handleAllTodos,
    handleClearAllTodos,
    handleClearDoneTodos,
  } = useContext(FilterBtnsContext);
  return (
    <TodoListFilterBtns>
      <UndoneBtn onClick={handleUndoneTodos}>Undone</UndoneBtn>
      <DoneBtn onClick={handleDoneTodos}>Done</DoneBtn>
      <AllBtn onClick={handleAllTodos}>All</AllBtn>
      <ClearDoneBtn onClick={handleClearDoneTodos}>Clear Done</ClearDoneBtn>
      <ClearAllBtn onClick={handleClearAllTodos}>Clear All</ClearAllBtn>
    </TodoListFilterBtns>
  );
};

// useContext for filter buttons
const FilterBtnsContext = createContext();

// front render structure and render logics
function App() {
  const {
    todos,
    value,
    handleChange,
    handleAddTodo,
    handleDeleteTodo,
    handleCompletionTodo,
    handleEditTodo,
    handleEditChange,
    handleRenewTodo,
    handleUndoneTodos,
    handleDoneTodos,
    handleAllTodos,
    handleClearDoneTodos,
    handleClearAllTodos,
    filterStatusTodos,
  } = useTodos();

  return (
    <Body>
      <TodoListContainer>
        <TodoListTitle>Todo List</TodoListTitle>
        <TodosForm
          value={value}
          handleChange={handleChange}
          handleAddTodo={handleAddTodo}
        />
        <TodoListout>
          <FilterBtnsContext.Provider
            value={{
              handleUndoneTodos,
              handleDoneTodos,
              handleAllTodos,
              handleClearDoneTodos,
              handleClearAllTodos,
            }}
          >
            <TodoFilterGroup />
          </FilterBtnsContext.Provider>
          <TodoStatus
            total={todos.length}
            done={todos.filter((todo) => todo.isDone).length}
            undone={todos.filter((todo) => !todo.isDone).length}
            allTodos={todos}
          />
          {filterStatusTodos(todos).map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDeleteTodo={handleDeleteTodo}
              handleCompletionTodo={handleCompletionTodo}
              handleEditTodo={handleEditTodo}
              handleEditChange={handleEditChange}
              handleRenewTodo={handleRenewTodo}
            />
          ))}
        </TodoListout>
      </TodoListContainer>
    </Body>
  );
}

export default App;
