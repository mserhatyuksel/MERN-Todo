import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilteredTodos,
  getTodosAysnc,
  toggleTodoAsync,
  removeTodoAsync,
} from "../../redux/todos/todosSlice";

const TodoList = () => {
  const dispatch = useDispatch();

  const filteredTodos = useSelector(selectFilteredTodos);
  const user = useSelector((state) => state.user.username);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(getTodosAysnc(user));
  }, [user, dispatch]);

  const handleToggle = async (id, isCompleted) => {
    await dispatch(toggleTodoAsync({ id, data: { isCompleted } }));
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(removeTodoAsync(id));
    }
  };
  return (
    <section className="main">
      {error ? (
        <h3>{error}</h3>
      ) : isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map((todo) => {
            return (
              <li
                key={todo._id}
                className={todo.isCompleted ? "completed" : ""}
              >
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => handleToggle(todo._id, todo.isCompleted)}
                  />
                  <label>{todo.text}</label>
                  <button
                    className="destroy"
                    onClick={() => handleRemove(todo._id)}
                  ></button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default TodoList;
