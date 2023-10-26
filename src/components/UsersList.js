import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import DeleteComponent from "../utils/DeleteIcon/deleteIcon";
import EditComponent from "../utils/EditIcon/editIcon";
// import OpenModal from "./Modal";
import Modal from "react-bootstrap/Modal";

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

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    setUsersList(users);
  }, []);

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
          {usersList && (
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
  );
}
