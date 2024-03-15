import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const UpdateUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { id } = useParams();

  const [userData, setUserData] = useState([]);
  const fetchSingleUser = async () => {
    const res = await Axios.get(`http://localhost:5000/read/${id}`);
    setUser({
      name: res.data.name,
      email: res.data.email,
      password: res.data.password,
    });
    console.log(user);
  };

  useEffect(() => {
    fetchSingleUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);
    const res = await Axios.put(`http://localhost:5000/updateuser/${id}`, user);
    if (res.status === 200) {
      window.location = "/";
    }
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
        <h1 className="text-[22px]">Update User</h1>
        <div className="my-5">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            className="block px-[12px] py-[10px] w-full border rounded focus:border-red-600 outline-none"
            onChange={handleChange}
            name="name"
            value={user.name}
            required
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
            required
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
            required
          />
        </div>
        <button className="bg-yellow-600 text-white px-10 py-3">
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
