import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
// ------------------------------ Admin ------------------------------
import NavBar from "./components/admin/NavBar";
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import Home from "./pages/admin/Home";
import Residents from "./pages/admin/Residents";
import Gym from "./pages/admin/Gym";
import Announcements from "./pages/admin/Announcements";
import Messages from "./pages/admin/Messages";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import RedirectRoute from "./components/admin/RedirectRoute";
// ------------------------------ User ------------------------------
import UserNavBar from "./components/user/UserNavBar";
import UserLogin from "./pages/user/UserLogin";
import UserGym from "./pages/user/UserGym";
import UserHome from "./pages/user/UserHome";
import UserMessages from "./pages/user/UserMessages";
import UserPassword from "./pages/user/UserPassword";
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
            dispatch(authenticate({ uid: user.uid, isAdmin: x.claims.isAdmin }));
          } else {
            dispatch(userAuthenticate({ uid: user.uid, isAdmin: x.claims.isAdmin, unit: x.claims.unit }));
          }
        });
      } else {
        dispatch(authenticate({ uid: "", isAdmin: false }));
        dispatch(userAuthenticate({ uid: "", isAdmin: false, unit: "" }));
      }
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* ------------------------------ Admin ------------------------------ */}
        <Route path="/admin">
          <Route
            index
            element={
              <ProtectedRoute>
                <NavBar page={1} />
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="manage-residents"
            element={
              <ProtectedRoute>
                <NavBar page={2} />
                <Residents />
              </ProtectedRoute>
            }
          />
          <Route
            path="manage-gym"
            element={
              <ProtectedRoute>
                <NavBar page={3} />
                <Gym />
              </ProtectedRoute>
            }
          />
          <Route
            path="manage-announcement"
            element={
              <ProtectedRoute>
                <NavBar page={4} />
                <Announcements />
              </ProtectedRoute>
            }
          />
          <Route
            path="manage-messages"
            element={
              <ProtectedRoute>
                <NavBar page={5} />
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="login"
            element={
              <RedirectRoute>
                <Login />
              </RedirectRoute>
            }
          />
          <Route
            path="register"
            element={
              <RedirectRoute>
                <Register />
              </RedirectRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <NavBar page={1} />
                <Home />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* ------------------------------ User ------------------------------ */}
        <Route path="/">
          <Route
            index
            element={
              <UserProtectedRoute>
                <UserNavBar page={1} />
                <UserHome />
              </UserProtectedRoute>
            }
          />
          <Route
            path="gym"
            element={
              <UserProtectedRoute>
                <UserNavBar page={2} />
                <UserGym />
              </UserProtectedRoute>
            }
          />
          <Route
            path="message"
            element={
              <UserProtectedRoute>
                <UserNavBar page={3} />
                <UserMessages />
              </UserProtectedRoute>
            }
          />
          <Route
            path="password"
            element={
              <UserProtectedRoute>
                <UserNavBar page={4} />
                <UserPassword />
              </UserProtectedRoute>
            }
          />
          <Route
            path="login"
            element={
              <UserRedirectRoute>
                <UserLogin />
              </UserRedirectRoute>
            }
          />
          <Route
            path="*"
            element={
              <UserProtectedRoute>
                <UserNavBar page={1} />
                <UserHome />
              </UserProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
