import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodoAysnc } from "../../redux/todos/todosSlice";
import { Button } from "@mui/material";
import { setLogin, setUser } from "../../redux/user/userSlice";
const Input = () => {
  const [text, setText] = useState("");

  const user = useSelector((state) => state.user.username);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addTodoAysnc({ text, user }));
    setText("");
  };
  const handleLogout = () => {
    localStorage.setItem("logged", "");
    dispatch(setUser(""));
    dispatch(setLogin(false));
  };
  return (
    <header className="header">
      <h1 className="title">todos</h1>
      <Button className="logout" variant="contained" onClick={handleLogout}>
        LOGOUT
      </Button>
      <form onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};

export default Input;
