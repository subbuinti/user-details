import React from "react";
import DeleteComponent from "../DeleteIcon/deleteIcon";
import EditComponent from "../EditIcon/editIcon";

export default function UserDetailsCard(props) {
  return (
    <div className="">
      <div className="font-bold text-lg gap-2 flex flex-row">
        Name: <p className="text-lg font-normal">{props.name}</p>
      </div>
      <div className="font-bold text-lg gap-2 flex flex-row mt-10">
        Email: <p className="text-lg font-normal">{props.email}</p>
      </div>

      <div className="font-bold text-lg gap-2 flex flex-row mt-10">
        Gender: <p className="text-lg font-normal">{props.gender}</p>
      </div>
      <div className="font-bold text-lg gap-2 flex flex-row mt-10">
        DOB: <p className="text-lg font-normal">{props.dob}</p>
      </div>
      {/* <div className="flex flex-row mt-10 gap-20 ml-20">
        <DeleteComponent />
        <EditComponent />
      </div> */}
    </div>
  );
}
