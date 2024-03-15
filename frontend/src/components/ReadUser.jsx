import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReadUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const fetchSingleUser = async () => {
    const res = await Axios.get(`http://localhost:5000/read/${id}`);
    console.log(res);
    setUser(res.data);
  };
  useEffect(() => {
    fetchSingleUser();
  }, []);
  return (
    <div>
      <table className="bg-white shadow-sm w-[650px] m-auto">
        <thead className="bg-blue-500">
          <tr>
            <th className="p-4">SN.</th>
            <th className="p-4">NAME</th>
            <th className="p-4">EMAIL</th>
            <th className="p-4">PASSWORD</th>
          </tr>
        </thead>
        <tbody>
          <tr className=" my-2 text-[18px] font-semibold">
            <td className="p-6">{user.__v}</td>
            <td className="p-6">{user.name}</td>
            <td className="p-6">{user.email}</td>
            <td className="p-6">{user.password}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReadUser;
