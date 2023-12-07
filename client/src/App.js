import { BrowserRouter, Route, Routes } from "react-router-dom";
// ------------------------------ Admin ------------------------------
import NavBar from "./components/admin/NavBar";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import RedirectRoute from "./components/admin/RedirectRoute";
import Account from "./pages/admin/Account";
import Announcements from "./pages/admin/Announcements";
import ForgetPassword from "./pages/admin/ForgetPassword";
import Gym from "./pages/admin/Gym";
import Home from "./pages/admin/Home";
import Login from "./pages/admin/Login";
import Messages from "./pages/admin/Messages";
import Register from "./pages/admin/Register";
import Residents from "./pages/admin/Residents";
// ------------------------------ User ------------------------------
import UserNavBar from "./components/user/UserNavBar";
import UserProtectedRoute from "./components/user/UserProtectedRoute";
import UserRedirectRoute from "./components/user/UserRedirectRoute";
import UserAccount from "./pages/user/UserAccount";
import UserForgetPassword from "./pages/user/UserForgetPassword";
import UserGym from "./pages/user/UserGym";
import UserHome from "./pages/user/UserHome";
import UserLogin from "./pages/user/UserLogin";
import UserMessages from "./pages/user/UserMessages";

function App() {
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
                        path="account"
                        element={
                            <>
                                <NavBar page={6} />
                                <Account />
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
                        path="account"
                        element={
                            <>
                                <UserNavBar page={4} />
                                <UserAccount />
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
