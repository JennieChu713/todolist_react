import { useState } from "react";
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
// const TodoFormGroup = styled.form``;
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
// const TodoListForm = ({ handleChange, handleAddClick, value }) => {
//   return (
//     <TodoFormContainer>
//       <TodoFormGroup>
//         <TodoFormInput
//           onChange={handleChange}
//           type="text"
//           placeholder={"Add Todo ..."}
//           value={value}
//         />
//         <TodFormSubmit onClick={handleAddClick}>Add</TodFormSubmit>
//       </TodoFormGroup>
//     </TodoFormContainer>
//   );
// };

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
  return (
    <TodoListFilterBtns>
      <UndoneBtn>Undone</UndoneBtn>
      <DoneBtn>Done</DoneBtn>
      <AllBtn>All</AllBtn>
      <ClearDoneBtn>Clear Done</ClearDoneBtn>
      <ClearAllBtn>Clear All</ClearAllBtn>
    </TodoListFilterBtns>
  );
};
const TodoItemContainer = styled.div`
  border-radius: 500px;
  margin: 0 auto 5%;
  padding: 4% 2%;
  font-size: 1.2rem;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(248, 244, 230, 0.7);
`;
const TodoItemContent = styled.div``;
const TodoItemCheckbox = styled.input``;
const TodoItemLabel = styled.label``;
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
const TodoListItem = ({ todo }) => {
  return (
    <TodoItemContainer data-todo-id={todo.id}>
      <TodoItemContent>
        <TodoItemCheckbox type="checkbox" name={todo.id} id={todo.id} />
        <TodoItemLabel for={todo.id}>{todo.content}</TodoItemLabel>
      </TodoItemContent>
      <TodoItemBtns>
        <TodoItemBtnStatus>Complete/not</TodoItemBtnStatus>
        <TodoItemBtnEdit>Edit</TodoItemBtnEdit>
        <TodoItemBtnDelete>Delete</TodoItemBtnDelete>
      </TodoItemBtns>
    </TodoItemContainer>
  );
};
// const TodoListObjects = () => {
//   return (
//     <TodoListout>
//       <TodoFilterGroup />
//       <TodoListTotal>
//         {5} complete, {3} incomplete, {8} in total.
//       </TodoListTotal>
//     </TodoListout>
//   );
// };

// front render structure and render logics
let id = 1;
function App() {
  // render todo functioning (test)
  const [todos, setTodos] = useState([
    {
      id: id,
      content: "example",
    },
  ]);
  //add todo functioning
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleAddClick = () => {
    id++;
    setTodos([
      {
        id: id,
        content: value,
      },
      ...todos,
    ]);
    setValue("");
  };

  return (
    <Body>
      <TodoListContainer>
        <TodoListTitle>Todo List</TodoListTitle>
        <TodoFormContainer>
          <TodoFormInput
            onChange={handleChange}
            type="text"
            placeholder={"Add Todo ..."}
            value={value}
          />
          <TodFormSubmit onClick={handleAddClick}>Add</TodFormSubmit>
        </TodoFormContainer>
        <TodoListout>
          <TodoFilterGroup />
          <TodoListTotal>
            {5} complete, {3} incomplete, {todos.length} in total.
          </TodoListTotal>
          {todos.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} />
          ))}
        </TodoListout>
      </TodoListContainer>
    </Body>
  );
}

export default App;
