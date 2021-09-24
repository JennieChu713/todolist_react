import React, { useContext, createContext } from "react";
// import { PropTypes } from "prop-types";
import TodosForm from "../Todos/TodosForm";
import TodoStatus from "../Todos/TodosList/TodosStatus";
import TodoItem from "../Todos/TodosList/TodoItem";
import useTodos from "../../useTodos";
import filterButtonsComponents from "../Todos/FilterButtonsComponents";
import generalComponents from "../GeneralComponents";

// CSS in JS
// general components
const { Body, TodoListContainer, TodoListTitle, TodoListout } =
  generalComponents();

// status filter buttons
const {
  TodoListFilterBtns,
  UndoneBtn,
  DoneBtn,
  AllBtn,
  ClearDoneBtn,
  ClearAllBtn,
} = filterButtonsComponents();

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
