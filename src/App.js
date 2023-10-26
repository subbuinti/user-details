import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UsersList";
import AddUser from "./components/AddUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/list" element={<UserList />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="edit/:id" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
