import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../utils/InputComponent/input";

export default function AddUser({ route }) {
  const [userName, setUserName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  console.log("id123", params);
  console.log("username", userName);
  console.log("emilId", emailId);
  console.log("dob", dob);
  console.log("gender", gender);
  console.log("education", education);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = allUsers.find((obj) => {
      return obj.id === Number(params.id);
    });
    setUserName(user?.name);
    setEmailId(user?.email);
    setDOB(user?.dob);
    setGender(user?.gender);
    setEducation(user?.education);
  }, [params.id]);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const errors = {};
      if (!userName.length) errors["name"] = "Please enter your name";
      if (!emailId.includes("@")) errors["email"] = "Please enter valid email";
      if (!gender.length) errors["gender"] = "Please choose gender";
      if (!education.length) errors["edu"] = "Please choose education";
      if (!dob.length) errors["dob"] = "Please choose DOB";

      setValidationErrors(errors);
      if (params.id) {
        const userDetails = {
          id: Number(params.id),
          name: userName,
          email: emailId,
          gender: gender,
          education: education,
          dob: dob,
        };
        const allUsers = JSON.parse(localStorage.getItem("users")) || [];
        const objIndex = allUsers.findIndex(
          (obj) => obj.id === Number(params.id)
        );
        console.log("objIndex", objIndex);
        console.log("Before update: ", allUsers[objIndex]);
        allUsers[objIndex].name = userName;
        allUsers[objIndex].email = emailId;
        allUsers[objIndex].gender = gender;
        allUsers[objIndex].education = education;
        allUsers[objIndex].dob = dob;

        localStorage.setItem("users", JSON.stringify(allUsers));
        navigate("/");
      } else {
        const userDetails = {
          id: Date.now(),
          name: userName,
          email: emailId,
          gender: gender,
          education: education,
          dob: dob,
        };
        const getUsers = JSON.parse(localStorage.getItem("users") || "[]");
        getUsers.push(userDetails);
        localStorage.setItem("users", JSON.stringify(getUsers));
        navigate("/");
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  console.log("validationErrors", validationErrors);

  return (
    <div>
      <div className="text-3xl font-bold flex justify-between p-10 bg-slate-200">
        {params?.id ? "Edit user" : "Add User"}
      </div>
      <div className="mt-20">
        <form>
          <div className="flex items-center justify-center mb-10">
            <div className="mr-10">
              Name <span className="mr-1">*</span>
            </div>
            <div className="flex flex-col">
              <InputField
                type="text"
                id="name"
                name="Name"
                className="border bg-slate-100 w-96"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
              {validationErrors.name && (
                <span className="error text-sm">{validationErrors.name}</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="mr-10">
              Email <span className=" mr-1">*</span>
            </div>
            <div className="flex flex-col">
              <InputField
                type="email"
                id="email"
                name="Email"
                className="border bg-slate-100 w-96"
                onChange={(e) => setEmailId(e.target.value)}
                value={emailId}
              />
              {validationErrors.email && (
                <span className="error text-sm"> {validationErrors.email}</span>
              )}
            </div>
          </div>

          <div>
            <div
              className="flex items-center justify-center mt-10"
              role="group"
              aria-labelledby="disabledAccess"
            >
              <span className="mr-4">Gender *</span>
              <div className="mr-4">
                <InputField
                  type="radio"
                  id="male"
                  className="mr-1"
                  name="gender"
                  onChange={(e) => setGender(e.currentTarget.value)}
                  value="male"
                  checked={gender}
                />
                <label>Male</label>
              </div>
              <div>
                <InputField
                  type="radio"
                  id="female"
                  className="mr-1"
                  name="gender"
                  onChange={(e) => setGender(e.currentTarget.value)}
                  value="female"
                  checked={gender}
                />
                <label>Female</label>
              </div>
            </div>
            {validationErrors.gender && (
              <span className="error text-sm flex items-center justify-center">
                {validationErrors.gender}
              </span>
            )}
          </div>

          <div className="flex items-center justify-center mt-10">
            <div className="mr-2">
              Education <span className="mr-1">*</span>
            </div>

            <select
              name="edu"
              id="edu"
              className="border bg-slate-100 w-96"
              onChange={(e) => setEducation(e.target.value)}
              defaultValue="none"
              value={education}
            >
              <option name="edu" value="">
                Select
              </option>
              <option name="edu" value="10th">
                10th
              </option>
              <option name="edu" value="inter">
                Inter
              </option>
              <option name="edu" value="btech">
                Btech
              </option>
              <option name="edu" value="no">
                Prefer not to say
              </option>
            </select>
          </div>
          {validationErrors.edu && (
            <span className="error text-sm flex items-center justify-center mr-32">
              {validationErrors.edu}
            </span>
          )}

          <div className="flex items-center justify-center mt-10">
            <div className="mr-10">
              DOB <span className="mr-1">*</span>
            </div>
            <InputField
              type="date"
              id="dob"
              name="dob"
              className="border bg-slate-100 w-96"
              onChange={(e) => setDOB(e.target.value)}
              value={dob}
            />
          </div>
          {validationErrors.dob && (
            <span className="error text-sm flex items-center justify-center mr-40">
              {validationErrors.dob}
            </span>
          )}
          {params?.id ? (
            <div className="mt-10 flex items-center justify-center gap-10">
              <button
                className="bg-blue-500 rounded-xl px-6 py-2 text-white"
                onClick={(e) => handleSubmit(e)}
              >
                Update
              </button>
              <button
                className="border border-black rounded-xl px-6 py-2 "
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="mt-10 flex items-center justify-center">
              <button
                className="bg-blue-500 rounded-xl px-6 py-2 text-white"
                onClick={(e) => handleSubmit(e)}
              >
                Submit{" "}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
