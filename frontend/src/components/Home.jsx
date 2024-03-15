import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import CreateUser from "./CreateUser";

const Home = () => {
  const [userData, setUserData] = useState([]);

  const fetchAllUser = async () => {
    const res = await Axios.get("http://localhost:5000/readalluser");
    // console.log(res);
    setUserData(res.data);
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleDelete = async (id) => {
    const res = await Axios.delete(`http://localhost:5000/delete/${id}`);
    if (res.status === 200) {
      fetchAllUser();
    }
  };

  return (
    <div className="min-h-screen bg-slate-400 text-center p-5">
      <CreateUser fetchAllUser={fetchAllUser} />
      <table className="bg-white shadow-sm w-[650px] m-auto">
        <thead className="bg-blue-500">
          <tr>
            <th className="p-4">SN.</th>
            <th className="p-4">NAME</th>
            <th className="p-4">EMAIL</th>
            <th className="p-4">PASSWORD</th>
            <th className="p-4">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((data, index) => {
            return (
              <tr className=" my-2 text-[18px] font-semibold" key={index}>
                <td className="p-6">{index + 1}</td>
                <td className="p-6">{data.name}</td>
                <td className="p-6">{data.email}</td>
                <td className="p-6">{data.password}</td>
                <td className="p-6 flex gap-3">
                  <Link
                    className="text-green-700 font-semibold"
                    to={`/readuser/${data._id}`}
                  >
                    Read
                  </Link>
                  <Link
                    className="font-semibold text-yellow-500"
                    to={`/updateuser/${data._id}`}
                  >
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(data._id)}>
                    <Link className="text-red-700 font-semibold">Delete</Link>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
