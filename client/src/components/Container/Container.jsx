import Filters from "../Filters";
import Input from "../Input";
import TodoList from "../TodoList";
import Login from "../Login";
import { useSelector } from "react-redux";
const Container = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      {!isLoggedIn ? (
        <Login />
      ) : (
        <>
          <Input />
          <TodoList />
          <Filters />
        </>
      )}
    </>
  );
};

export default Container;
