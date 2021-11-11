import { useEffect } from "react";
import Container from "./components/Container/Container";
import Register from "./components/Register";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { setLogin, setUser } from "./redux/user/userSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const username = localStorage.getItem("logged");
    if (username) {
      dispatch(setLogin(true));
      dispatch(setUser(username));
    }
  }, [dispatch]);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Container />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
