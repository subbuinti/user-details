import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import DeleteComponent from "../utils/DeleteIcon/deleteIcon";
import EditComponent from "../utils/EditIcon/editIcon";
// import OpenModal from "./Modal";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "./UserContext";
import ToggleSwitch from "../utils/ToggleSwitch/ToggleSwitch";
import UserDetailsCard from "../utils/UserDetailsCard/UserDetailsCard";
import InputField from "../utils/InputComponent/input";

const handleDeleteUser = (id) => {
  const allUsers = JSON.parse(localStorage.getItem("users")) || [];
  const objIndex = allUsers.findIndex((obj) => obj.id === Number(id));
  allUsers.splice(objIndex, 1);
  const finalUsers = JSON.stringify(allUsers);
  localStorage.setItem("users", finalUsers);
};
function OpenModal(props) {
  console.log("props---", props);
  console.log("button clickked");
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Body>
          <p>Are you sure you want to delete</p>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="bg-blue-500"
            onClick={() => handleDeleteUser("1698132162758")}
          >
            Yes
          </button>
          <button
            className="border border-black"
            onClick={() => props.onHide()}
          >
            No
          </button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
export default function UserList() {
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [view, setView] = useState("default");
  // const context = useContext(UserContext);
  const [data, setData] = useContext(UserContext);
  // console.log("context", context);
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    setUsersList(users);
  }, []);
  console.log("view", view);
  console.log("usersList", usersList);
  console.log("data", data);
  return (
    <div>
      <div className="text-3xl font-bold flex justify-between p-10 bg-slate-200">
        User List
        <button
          className="bg-blue-500 border text-white rounded-xl px-6 py-2 text-xl font-normal"
          onClick={() => navigate("/add")}
        >
          Add
        </button>
      </div>
      <div className="">
        <div className="flex flex-row ml-40 p-10">
          <span className="mr-4">View</span>
          <div className="mr-4 flex flex-row">
            <InputField
              type="radio"
              id="male"
              className="mr-1"
              name="view"
              onChange={(e) => {
                console.log("e", e.target.value);
                setView(e.target.value);
                setData(false);
              }}
              value="default"
              checked={view}
            />
            <label>list</label>
          </div>
          <div className="flex flex-row">
            <InputField
              type="radio"
              id="female"
              className="mr-1"
              name="view"
              onChange={(e) => {
                setView(e.target.value);
                setData(true);
              }}
              value="list"
              checked={view}
            />
            <label>Default</label>
          </div>
        </div>
        {view === "list" && (
          <div className="flex flex-wrap gap-10 mx-24">
            {usersList?.map((item) => {
              return (
                <div className="flex flex-col w-96 h-96 bg-gray-200  pl-4 pt-10 rounded-xl ">
                  <UserDetailsCard
                    name={item.name}
                    email={item.email}
                    gender={item.gender}
                    dob={item.dob}
                  />

                  <div className="flex flex-row gap-20 ml-20 mt-10">
                    <div
                      onClick={() => {
                        const allUsers =
                          JSON.parse(localStorage.getItem("users")) || [];
                        const objIndex = allUsers.findIndex(
                          (obj) => obj.id === Number(item.id)
                        );
                        allUsers.splice(objIndex, 1);
                        const finalUsers = JSON.stringify(allUsers);
                        localStorage.setItem("users", finalUsers);
                        setUsersList(allUsers);
                      }}
                    >
                      <DeleteComponent />
                    </div>
                    <Link to={`/edit/${item.id}`}>
                      <EditComponent />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {usersList?.length === 0 ? (
          <div className="bg-slate-300">
            <div className="flex items-center justify-center flex-col py-60 gap-10">
              <div className="text-2xl text-black">No users found</div>
              <button
                className="bg-blue-500 border text-white rounded-xl px-6 py-2 text-xl"
                onClick={() => navigate("/add")}
              >
                Add
              </button>
            </div>
          </div>
        ) : (
          <div className="mx-10 mt-10">
            {view === "default" && usersList && (
              <table className="border border-black w-full items-center">
                <tr className="border border-black">
                  <th className="border border-black">No</th>
                  <th className="border border-black">Name</th>
                  <th className="border border-black">Email</th>
                  <th className="border border-black">Gender</th>
                  <th className="border border-black">DOB</th>
                  <th className="border border-black">Actions</th>
                </tr>
                {usersList?.map((item, index) => {
                  return (
                    <tr className="border border-black text-center">
                      <td className="border border-black">{index + 1}</td>
                      <td className="border border-black">{item.name}</td>
                      <td className="border border-black">{item.email}</td>
                      <td className="border border-black">{item.gender}</td>
                      <td className="border border-black">{item.dob}</td>
                      <div className="flex flex-row justify-around p-1">
                        <button
                          onClick={() => {
                            const allUsers =
                              JSON.parse(localStorage.getItem("users")) || [];
                            const objIndex = allUsers.findIndex(
                              (obj) => obj.id === Number(item.id)
                            );
                            allUsers.splice(objIndex, 1);
                            const finalUsers = JSON.stringify(allUsers);
                            localStorage.setItem("users", finalUsers);
                            setUsersList(allUsers);
                          }}
                        >
                          <DeleteComponent />
                        </button>

                        <div>
                          <Link to={`/edit/${item.id}`}>
                            <EditComponent />
                          </Link>
                        </div>
                      </div>
                    </tr>
                  );
                })}
              </table>
            )}
            {modalShow && (
              <OpenModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                deleteItem={deleteItem}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
