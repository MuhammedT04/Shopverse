import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Navbar from "./components/pages/Navbar";
import Home from "./components/pages/Home";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { useSelector } from "react-redux";
import AdminLogin from "./components/Dashboard/AdminLogin";
import Success from "./components/pages/Success";

function App() {

  const {user} =useSelector((state)=>state.user)
  const {admin} =useSelector((state)=>state.admin)
  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to={"/"} replace={true} />}
            />
            <Route
              path="/signup"
              element={
                !user ? <SignUp /> : <Navigate to={"/"} replace={true} />
              }
            />
        </Route>
            <Route path="/success" element={<Success/>}/>
        <Route path="/admin/home" element={admin ?<AdminDashboard /> :<Navigate to={'/admin/login'} replace={true}/>} />
        <Route path="/admin/login" element={!admin ? <AdminLogin/> :<Navigate to={'/admin/home'} replace={true}/>} />
      </Routes>
    </>
  );
}

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
