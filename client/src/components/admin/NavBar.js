import { HiHome } from "react-icons/hi2";
import { HiOutlineHome } from "react-icons/hi2";
import { HiUsers } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiCalendarDays } from "react-icons/hi2";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { HiMegaphone } from "react-icons/hi2";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { HiEnvelope } from "react-icons/hi2";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiUserCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useAuth } from "../../firebase/AuthContextProvider";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";

function NavBar({ page }) {
    const admin = useAuth();

    function handleClick() {
        signOut(auth);
    }

    return (
        <nav className="bg-neutral-700 p-2 text-center flex flex-col gap-5">
            <h1 className="text-2xl font-bold text-neutral-100">New Apartments</h1>
            <Link to={`/admin/${admin.uid}`} className={`text-md text-neutral-100 p-2 hover:bg-neutral-600 flex items-center justify-center gap-2 ${page === 1 && "bg-neutral-600"}`}>
                {page === 1 ? <HiHome className="h-5 w-5 text-neutral-100" /> : <HiOutlineHome className="h-5 w-5 text-neutral-100" />}
                Home
            </Link>
            <Link to={`/admin/${admin.uid}/manage-residents`} className={`text-md text-neutral-100 p-2 hover:bg-neutral-600 flex items-center justify-center gap-2 ${page === 2 && "bg-neutral-600"}`}>
                {page === 2 ? <HiUsers className="h-5 w-5 text-neutral-100" /> : <HiOutlineUsers className="h-5 w-5 text-neutral-100" />}
                Manage Residents
            </Link>
            <Link to={`/admin/${admin.uid}/manage-gym`} className={`text-md text-neutral-100 p-2 hover:bg-neutral-600 flex items-center justify-center gap-2 ${page === 3 && "bg-neutral-600"}`}>
                {page === 3 ? <HiCalendarDays className="h-5 w-5 text-neutral-100" /> : <HiOutlineCalendarDays className="h-5 w-5 text-neutral-100" />}
                Manage Gymroom
            </Link>
            <Link to={`/admin/${admin.uid}/manage-announcement`} className={`text-md text-neutral-100 p-2 hover:bg-neutral-600 flex items-center justify-center gap-2 ${page === 4 && "bg-neutral-600"}`}>
                {page === 4 ? <HiMegaphone className="h-5 w-5 text-neutral-100" /> : <HiOutlineMegaphone className="h-5 w-5 text-neutral-100" />}
                Manage Announcements
            </Link>
            <Link to={`/admin/${admin.uid}/manage-messages`} className={`text-md text-neutral-100 p-2 hover:bg-neutral-600 flex items-center justify-center gap-2 ${page === 5 && "bg-neutral-600"}`}>
                {page === 5 ? <HiEnvelope className="h-5 w-5 text-neutral-100" /> : <HiOutlineEnvelope className="h-5 w-5 text-neutral-100" />}
                Manage Messages
            </Link>
            <Link to={`/admin/${admin.uid}/account`} className={`text-md text-neutral-100 p-2 hover:bg-neutral-600 flex items-center justify-center gap-2 ${page === 6 && "bg-neutral-600"}`}>
                {page === 6 ? <HiUserCircle className="h-5 w-5 text-neutral-100" /> : <HiOutlineUserCircle className="h-5 w-5 text-neutral-100" />}
                Account
            </Link>
            <button className="text-md text-neutral-100 border font-semibold p-2 hover:bg-neutral-600 flex items-center justify-center gap-2" onClick={handleClick}>
                <HiArrowLeftOnRectangle className="h-5 w-5 text-neutral-100" />
                Logout
            </button>
        </nav>
    );
}

export default NavBar;
