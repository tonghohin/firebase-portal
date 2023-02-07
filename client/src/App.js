import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
// ------------------------------ Admin ------------------------------
import NavBar from "./components/admin/NavBar";
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import ForgetPassword from "./pages/admin/ForgetPassword";
import Home from "./pages/admin/Home";
import Residents from "./pages/admin/Residents";
import Gym from "./pages/admin/Gym";
import Announcements from "./pages/admin/Announcements";
import Messages from "./pages/admin/Messages";
import ChangePassword from "./pages/admin/ChangePassword";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import RedirectRoute from "./components/admin/RedirectRoute";
// ------------------------------ User ------------------------------
import UserNavBar from "./components/user/UserNavBar";
import UserLogin from "./pages/user/UserLogin";
import UserForgetPassword from "./pages/user/UserForgetPassword";
import UserGym from "./pages/user/UserGym";
import UserHome from "./pages/user/UserHome";
import UserMessages from "./pages/user/UserMessages";
import UserChangePassword from "./pages/user/UserChangePassword";
import UserProtectedRoute from "./components/user/UserProtectedRoute";
import UserRedirectRoute from "./components/user/UserRedirectRoute";
// ------------------------------ Redux Toolkit ------------------------------
import { useDispatch } from "react-redux";
import { authenticate } from "./features/adminSlice";
import { userAuthenticate } from "./features/userSlice";
// ------------------------------ Firebase ------------------------------
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdTokenResult(true).then((x) => {
          if (x.claims.isAdmin) {
            dispatch(authenticate({ uid: user.uid, isAdmin: x.claims.isAdmin, email: user.email }));
          } else {
            dispatch(userAuthenticate({ uid: user.uid, isAdmin: x.claims.isAdmin, unit: x.claims.unit, email: user.email }));
          }
        });
      } else {
        dispatch(authenticate({ uid: "", isAdmin: false, email: "" }));
        dispatch(userAuthenticate({ uid: "", isAdmin: false, unit: "", email: "" }));
      }
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* ------------------------------ Admin ------------------------------ */}
        <Route path="/admin/:uid" element={<ProtectedRoute />}>
          <Route
            index
            element={
              <>
                <NavBar page={1} />
                <Home />
              </>
            }
          />
          <Route
            path="manage-residents"
            element={
              <>
                <NavBar page={2} />
                <Residents />
              </>
            }
          />
          <Route
            path="manage-gym"
            element={
              <>
                <NavBar page={3} />
                <Gym />
              </>
            }
          />
          <Route
            path="manage-announcement"
            element={
              <>
                <NavBar page={4} />
                <Announcements />
              </>
            }
          />
          <Route
            path="manage-messages"
            element={
              <>
                <NavBar page={5} />
                <Messages />
              </>
            }
          />
          <Route
            path="change-password"
            element={
              <>
                <NavBar page={6} />
                <ChangePassword />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <NavBar page={1} />
                <Home />
              </>
            }
          />
        </Route>
        <Route path="/admin" element={<RedirectRoute />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forget-password" element={<ForgetPassword />} />
        </Route>
        {/* ------------------------------ User ------------------------------ */}
        <Route path="/:unit" element={<UserProtectedRoute />}>
          <Route
            index
            element={
              <>
                <UserNavBar page={1} />
                <UserHome />
              </>
            }
          />
          <Route
            path="gym"
            element={
              <>
                <UserNavBar page={2} />
                <UserGym />
              </>
            }
          />
          <Route
            path="message"
            element={
              <>
                <UserNavBar page={3} />
                <UserMessages />
              </>
            }
          />
          <Route
            path="change-password"
            element={
              <>
                <UserNavBar page={4} />
                <UserChangePassword />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <UserNavBar page={1} />
                <UserHome />
              </>
            }
          />
        </Route>
        <Route path="/" element={<UserRedirectRoute />}>
          <Route index element={<UserLogin />} />
          <Route path="forget-password" element={<UserForgetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
