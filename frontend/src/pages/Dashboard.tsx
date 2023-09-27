import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5555/api/users/", {})
      .then((resp) => {
        console.log(resp);
        setUser(resp);
      })
      .catch((error) => {
        console.log(error.response.data.Error);
        // navigate("/login");
      });
  }, []);

  const handleSubmit = async () => {
    axios
      .post("http://localhost:5555/api/users/logout")
      .then((resp) => {
        console.log(resp);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="text-black">
      <div>Dashboard</div>
      <button type="submit" onClick={handleSubmit} className="text-black">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
