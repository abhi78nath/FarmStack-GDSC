import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/UI/Landing";
import Error404 from "./pages/Error404";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CropInputForm from './pages/cropAdvisor';
import Chat from "./components/UI/chatSystem/chatroom";
import UserProfile from "./pages/UserProfile";
import { Alert } from "./components/Alert";
const App = () => {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/register" element={<Signup showAlert={showAlert} />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/cropadvisor" element={<CropInputForm/>}/>
          {/* <Route path="/schemes" element={<SchemesList/>}/> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
