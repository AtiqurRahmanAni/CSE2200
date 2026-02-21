import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import NavBar from "./components/NavBar";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { Toaster } from "react-hot-toast";
import Layout from "./Layout";
import AddUsers from "./pages/AddUsers";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route element={<AddUsers />} path="/add" />
        <Route element={<Layout />} path="/">
          <Route element={<PublicRoute />}>
            <Route path="login" element={<Login />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="profile" element={<Profile />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
      <Toaster position="bottom-right" />
    </>
  );
};

export default App;
