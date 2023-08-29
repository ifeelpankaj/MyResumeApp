import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./Components/Header/Menu";
import Home from "./Components/Home/Home";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { getUser, loadUser } from "./Redux/Actions/UserAction";
import AddProject from "./Components/Admin/AddProject";
import AddSkills from "./Components/Admin/AddSkills";
import AdminLogin from "./Components/Admin/AdminLogin";

function App() {
  const dispatch = useDispatch();
  
  // const user = useSelector((state) => state.user);

  // console.log(user);

  const [ratio, setRatio] = useState(window.innerWidth / window.innerHeight);
  useEffect(() => {
    const resizeRatio = () => {
      setRatio(window.innerWidth / window.innerHeight);
    };

    window.addEventListener("resize", resizeRatio);

    return () => {
      window.removeEventListener("resize", resizeRatio);
    };
  }, [ratio]);
  useEffect(() => {
    dispatch(getUser());
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home ratio={ratio} />} />
          <Route path="/projects" element={<AddProject/>} />
          <Route path="/skills" element={<AddSkills/>} />
          <Route path="/login" element={<AdminLogin/>} />
        </Routes>
        <Toaster/>
      </Router>
    </>
  );
}

export default App;
