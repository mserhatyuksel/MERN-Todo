import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAysnc = createAsyncThunk(
  "todos/getTodosAsync",
  async (user) => {
    const res = await axios(`${process.env.REACT_APP_BASE_URL}/todos/${user}`);
    return res.data;
  }
);
export const addTodoAysnc = createAsyncThunk(
  "todos/addTodoAsync",
  async (data) => {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/todos/add`,
      {
        text: data.text,
        username: data.user,
      }
    );
    return res.data;
  }
);
export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodoAsync",
  async ({ id, data }) => {
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/todos/${id}`,
      {
        isCompleted: !data.isCompleted,
      }
    );
    return res.data;
  }
);

export const removeTodoAsync = createAsyncThunk(
  "todos/removeTodoAsync",
  async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/todos/${id}`
    );
    return id;
  }
);

export const clearCompletedAsync = createAsyncThunk(
  "todos/clearCompletedAsync",
  async (user) => {
    const res = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/todos/completed/${user}`
    );
    return res.data;
  }
);
export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    activeFilter: "all",
    isLoading: true,
    error: null,
  },
  reducers: {
    removeTodo: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item._id !== id);
      state.items = filtered;
    },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.isCompleted === false);
      state.items = filtered;
    },
  },
  extraReducers: {
    //Get todos
    [getTodosAysnc.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodosAysnc.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    [getTodosAysnc.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    // Add todo
    [addTodoAysnc.fulfilled]: (state, action) => {
      state.items.push(action.payload);
    },
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const { _id, isCompleted } = action.payload;
      const index = state.items.findIndex((item) => item._id === _id);
      state.items[index].isCompleted = !isCompleted;
    },
    [removeTodoAsync.fulfilled]: (state, action) => {
      const index = state.items.findIndex(
        (item) => item._id === action.payload
      );
      state.items.splice(index, 1);
    },
    [clearCompletedAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const selectTodos = (state) => state.todos.items;

export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }
  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === "active"
      ? todo.isCompleted === false
      : todo.isCompleted === true
  );
};

export const { changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
