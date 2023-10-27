import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UsersList";
import AddUser from "./components/AddUser";
import { UserContext } from "./components/UserContext";

function App() {
  const [data, setData] = useState(false);
  return (
    <UserContext.Provider value={[data, setData]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/list" element={<UserList />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="edit/:id" element={<AddUser />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
