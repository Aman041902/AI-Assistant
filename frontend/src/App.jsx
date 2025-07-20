import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Customize from "./pages/Customize";
import Home from "./pages/Home";
import { Navigate } from "react-router-dom";
import Customize2 from "./pages/Custimize2";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [userdata, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(false);
  const navigate = useNavigate();

  const handlecurrentUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/user/current",
        {
          withCredentials: true,
        }
      );
      setUserData(response.data);
      console.log("User data fetched successfully:", response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // ✅ end loading regardless of result
    }
  };

  useEffect(() => {
    handlecurrentUser();
  }, []);

  if (loading) return <div>Loading...</div>; // ⏳ prevents redirect loop

  return (
    <Routes>
      <Route
        path="/"
        element={
          userdata?.userAssistant && userdata?.assistantImg ? (
            <Home userdata={userdata} setUserData={setUserData} />
          ) : userdata ? (
            <Navigate to="/customize" />
          ) : (
            <Navigate to="/signup" />
          )
        }
      />

      <Route
        path="/signup"
        element={
          !userdata ? (
            <Signup userdata={userdata} setUserData={setUserData} />
          ) : userdata?.userAssistant && userdata?.assistantImg ? (
            <Navigate to="/" />
          ) : (
            <Navigate to="/customize" />
          )
        }
      />

      <Route
        path="/customize"
        element={
          userdata ? (
            <Customize
              frontendImage={frontendImage}
              setFrontendImage={setFrontendImage}
              backendImage={backendImage}
              setBackendImage={setBackendImage}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          ) : (
            <Navigate to="/signup" />
          )
        }
      />
      <Route
        path="/customize2"
        element={
          userdata ? (
            <Customize2
              userdata={userdata}
              backendImage={backendImage}
              selectedImage={selectedImage}
              setUserData={setUserData}
            />
          ) : (
            <Navigate to="/signup" />
          )
        }
      />
      <Route
        path="/login"
        element={
          !userdata ? (
            <Login userdata={userdata} setUserData={setUserData} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

export default App;
