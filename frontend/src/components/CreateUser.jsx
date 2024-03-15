import React, { useState } from "react";
import Axios from "axios";
const CreateUser = ({ fetchAllUser }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);
    const res = await Axios.post("http://localhost:5000/createuser", user);
    console.log(res);
    fetchAllUser();
    setUser({ name: "", email: "", password: "" });
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <form
        className="w-[650px] bg-white text-left p-5 m-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="text-[22px]">Create User</h1>
        <div className="my-5">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            className="block px-[12px] py-[10px] w-full border rounded focus:border-red-600 outline-none"
            onChange={handleChange}
            name="name"
            value={user.name}
          />
        </div>
        <div className="my-5">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="block px-[12px] py-[10px] w-full border rounded focus:border-red-600 outline-none"
            onChange={handleChange}
            name="email"
            value={user.email}
          />
        </div>
        <div className="my-5">
          <label>Password</label>
          <input
            type="current-password"
            placeholder="Enter password"
            className="block px-[12px] py-[10px] w-full border rounded focus:border-red-600 outline-none"
            onChange={handleChange}
            name="password"
            value={user.password}
          />
        </div>
        <button className="bg-yellow-600 text-white px-10 py-3">
          Add User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
