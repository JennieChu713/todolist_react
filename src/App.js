import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useRef,
} from "react";
import styled from "styled-components";
// import { PropTypes } from "prop-types";

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

const TodoFormContainer = styled.section`
  border-bottom: 1px dotted rgba(157, 137, 108, 0.4);
  padding-bottom: 3%;
  margin-bottom: 4%;
`;
// const TodoFormGroup = styled.form``;// 因為 form本身的送出動作會直接重新render，除非使用 e.preventDefault 來防止送出
const TodoFormInput = styled.input`
  margin: 0 2% 0 4%;
  padding: 0 5px;
  width: 80%;
  height: 2rem;
  border: none;
  outline: none;
  font-size: 1.5rem;
  background-color: #f8f4e6;
  border-radius: 5px;
`;
const TodFormSubmit = styled.button`
  font-size: 1.2rem;
  color: #ca8269;
  background: transparent;
  border-radius: 50%;
  border: 1px solid #ca8269;
  height: 3rem;
  width: 3rem;
  padding-left: 4px;
  transition: all 0.3s;

  &:hover {
    background: #ca8269;
    color: white;
  }
`;
// Todo form structure
const TodoListForm = ({ handleChange, handleAddTodo, value }) => {
  return (
    <TodoFormContainer>
      <TodoFormInput
        onChange={handleChange}
        type="text"
        placeholder={"Add Todo ..."}
        value={value}
      />
      <TodFormSubmit onClick={handleAddTodo}>Add</TodFormSubmit>
    </TodoFormContainer>
  );
};

const TodoListout = styled.section`
  border-radius: 5px 5px 0 5px;
  padding: 5% 0;
`;
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
const TodoListTotal = styled.div`
  font-size: 1.5rem;
  margin: 5% 0;
  color: #726250;

  &::before {
    content: "— ";
    opacity: 0.4;
  }
  &::after {
    content: " —";
    opacity: 0.4;
  }
`;
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
const TodoItemContainer = styled.div`
  border-radius: 500px;
  margin: 0 auto 5%;
  padding: 4% 3%;
  font-size: 1.2rem;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(248, 244, 230, 0.7);
`;
const TodoItemContent = styled.div``;
const TodoItemDetail = styled.article`
  ${(props) =>
    props.$isDone && `text-decoration: line-through; color: #bc8f8f;`}
`;
const TodoItemEditContent = styled.div`
  display: flex;
  * {
    font-size: 1.1rem;
  }
`;
const TodoItemEditInput = styled.input`
  width: 26rem;
  border: none;
  background: rgba(238, 232, 170, 0.5);
  outline: none;
  padding: 5px;
  box-sizing: border-box;
  margin-right: 2%;
`;
const TodoItemEditSubmit = styled.button`
  background: transparent;
  border: none;
  transition: all 0.3s;
  border-radius: 5px;
  color: #d7a98c;
  &:hover {
    background: #ee836f;
    color: #fde8d0;
  }
`;
const TodoItemBtns = styled.div`
  * {
    font-size: 1.1rem;
    background: transparent;
    color: #d7a98c;
    border: none;
    border-radius: 5px;
    transition: all 0.3s;
  }
`;
const TodoItemBtnStatus = styled.button`
  &:hover {
    background: #f39800;
    color: #fff1cf;
  }
`;
const TodoItemBtnEdit = styled.button`
  &:hover {
    background: #ee836f;
    color: #fde8d0;
  }
`;
const TodoItemBtnDelete = styled.button`
  &:hover {
    background: #c53d43;
    color: #fde8d0;
  }
`;
const TodoListItem = ({
  todo,
  handleDeleteTodo,
  handleCompletionTodo,
  handleEditTodo,
  handleRenewTodo,
  handleEditChange,
}) => {
  return (
    <TodoItemContainer data-todo-id={todo.id}>
      {todo.isEditing ? (
        <TodoItemEditContent>
          <TodoItemEditInput
            type="text"
            id={todo.id}
            $isDone={todo.isDone}
            $isEdit={todo.isEditing}
            defaultValue={todo.content}
            onChange={handleEditChange}
          />
          <TodoItemEditSubmit
            onClick={() => {
              handleRenewTodo(todo.id);
            }}
          >
            Edit
          </TodoItemEditSubmit>
        </TodoItemEditContent>
      ) : (
        <>
          <TodoItemContent>
            <TodoItemDetail
              id={todo.id}
              $isDone={todo.isDone}
              $isEdit={todo.isEditing}
            >
              {todo.content}
            </TodoItemDetail>
          </TodoItemContent>
          <TodoItemBtns>
            <TodoItemBtnStatus
              onClick={() => {
                handleCompletionTodo(todo.id);
              }}
            >
              {todo.isDone ? "Undone" : "Done"}
            </TodoItemBtnStatus>
            <TodoItemBtnEdit
              onClick={() => {
                handleEditTodo(todo.id);
              }}
            >
              Edit
            </TodoItemBtnEdit>
            <TodoItemBtnDelete
              onClick={() => {
                handleDeleteTodo(todo.id);
              }}
            >
              Delete
            </TodoItemBtnDelete>
          </TodoItemBtns>
        </>
      )}
    </TodoItemContainer>
  );
};
const TodoListStatusManual = ({ total, done, undone }) => {
  return (
    <>
      <TodoFilterGroup />
      <TodoListTotal>
        {done} Complete, {undone} Incomplete, {total} in Total.
      </TodoListTotal>
    </>
  );
};

// useContext for filter buttons
const FilterBtnsContext = createContext();

// reserve todoList in localstorage
function writeTodoLocalStorage(todos) {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

// front render structure and render logics
function App() {
  let id = useRef(1);
  // todos initialize (with test example)
  const [todos, setTodos] = useState(() => {
    let todoData = window.localStorage.getItem("todos") || "";
    if (todoData.length) {
      todoData = JSON.parse(todoData);
      if (!id) {
        id.current = todoData[0].id + 1;
      }
    } else {
      todoData = [];
    }
    return todoData;
  });
  // add todo value initialize
  const [value, setValue] = useState("");

  // filterTodos initialize
  const [preservTodos, setPreservTodos] = useState(todos);

  // edit todo value initialize
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    writeTodoLocalStorage(todos);
    console.log(todos);
  }, [todos]);

  // add todo functioning
  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === "") {
      return;
    }
    setValue(e.target.value);
  };
  const handleAddTodo = () => {
    //id.current += 1;
    const addTodo = [
      {
        id: id.current,
        content: value,
        isDone: false,
        isEditing: false,
      },
      ...todos,
    ];
    setTodos(addTodo);
    setPreservTodos(addTodo);
    id.current += 1;
    setValue("");
  };

  // delete todo functioning
  const handleDeleteTodo = (id) => {
    const deleteTodo = todos.filter((todo) => todo.id !== id);
    setTodos(deleteTodo);
    setPreservTodos(deleteTodo);
  };

  // checkout todo completion status functioning
  const handleCompletionTodo = (id) => {
    const getTodo = todos.map((todo) => {
      if (todo.id !== id) return todo;
      return {
        ...todo,
        isDone: !todo.isDone,
      };
    });
    setTodos(getTodo);
    setPreservTodos(getTodo);
  };
  // edit Todo item's content functioning
  const handleEditTodo = (id) => {
    const getTodo = todos.map((todo) => {
      if (todo.id !== id) return todo;
      return {
        ...todo,
        isEditing: !todo.isEditing,
      };
    });
    setTodos(getTodo);
  };
  const handleEditChange = (e) => {
    if (e.target.value === "") {
      return;
    }
    setEditValue(e.target.value);
  };
  const handleRenewTodo = (id) => {
    const getTodo = todos.map((todo) => {
      if (todo.id !== id) return todo;
      return {
        ...todo,
        content: editValue,
        isEditing: false,
      };
    });
    setValue("");
    setTodos(getTodo);
    setPreservTodos(getTodo);
  };

  // filter buttons functions
  // filterout Undone todos functioning
  const handleUndoneTodos = () => {
    setTodos(preservTodos.filter((todo) => !todo.isDone));
  };
  //filterout Done todos functioning
  const handleDoneTodos = () => {
    setTodos(preservTodos.filter((todo) => todo.isDone));
  };
  // listout all todos
  const handleAllTodos = () => {
    setTodos([...preservTodos]);
  };
  // clear all done todos
  const handleClearDoneTodos = () => {
    setTodos(preservTodos.filter((todo) => !todo.isDone));
    setPreservTodos(preservTodos.filter((todo) => !todo.isDone));
  };
  // clear all todos
  const handleClearAllTodos = () => {
    setTodos([]);
    setPreservTodos([]);
  };

  return (
    <Body>
      <TodoListContainer>
        <TodoListTitle>Todo List</TodoListTitle>
        <TodoListForm
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
            <TodoListStatusManual
              total={preservTodos.length}
              done={preservTodos.filter((todo) => todo.isDone).length}
              undone={preservTodos.filter((todo) => !todo.isDone).length}
              allTodos={preservTodos}
            />
          </FilterBtnsContext.Provider>
          {todos.map((todo) => (
            <TodoListItem
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
