import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeActiveFilter,
  selectTodos,
  clearCompletedAsync,
} from "../../redux/todos/todosSlice";
const Filters = () => {
  const items = useSelector(selectTodos);
  const itemsLeft = items.filter((item) => !item.isCompleted).length;

  const activeFilter = useSelector((state) => state.todos.activeFilter);

  const user = useSelector((state) => state.user.username);

  const dispatch = useDispatch();

  const changeFilter = (filter) => {
    dispatch(changeActiveFilter(filter));
  };

  if (items.length < 1) {
    return null;
  }
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft} </strong>
        item{itemsLeft > 1 && "s"} left
      </span>

      <ul className="filters">
        <li>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              changeFilter("all");
            }}
            className={activeFilter === "all" ? "selected" : ""}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              changeFilter("active");
            }}
            className={activeFilter === "active" ? "selected" : ""}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              changeFilter("completed");
            }}
            className={activeFilter === "completed" ? "selected" : ""}
          >
            Completed
          </a>
        </li>
      </ul>
      {itemsLeft !== items.length && (
        <button
          onClick={() => dispatch(clearCompletedAsync(user))}
          className="clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Filters;
