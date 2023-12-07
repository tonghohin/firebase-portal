import { signOut } from "firebase/auth";
import { HiArrowLeftOnRectangle, HiCalendarDays, HiEnvelope, HiHome, HiOutlineCalendarDays, HiOutlineEnvelope, HiOutlineHome, HiOutlineUserCircle, HiUserCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useAuth } from "../../firebase/AuthContextProvider";
import { auth } from "../../firebase/config";

function UserNavBar({ page }) {
    const user = useAuth();

    function handleClick() {
        signOut(auth);
    }

    return (
        <nav className="bg-gray-700 p-2 text-center flex flex-col gap-5">
            <h1 className="text-2xl font-bold text-gray-100">New Apartments</h1>

            <Link to={`/${user.unit}`} className={`text-md text-gray-100 p-2 hover:bg-gray-600 flex items-center justify-center gap-2 ${page === 1 && "bg-gray-600"}`}>
                {page === 1 ? <HiHome className="h-5 w-5 text-gray-100" /> : <HiOutlineHome className="h-5 w-5 text-gray-100" />}
                Home
            </Link>
            <Link to={`/${user.unit}/gym`} className={`text-md text-gray-100 p-2 hover:bg-gray-600 flex items-center justify-center gap-2 ${page === 2 && "bg-gray-600"}`}>
                {page === 2 ? <HiCalendarDays className="h-5 w-5 text-gray-100" /> : <HiOutlineCalendarDays className="h-5 w-5 text-gray-100" />}
                Register Gymroom
            </Link>
            <Link to={`/${user.unit}/message`} className={`text-md text-gray-100 p-2 hover:bg-gray-600 flex items-center justify-center gap-2 ${page === 3 && "bg-gray-600"}`}>
                {page === 3 ? <HiEnvelope className="h-5 w-5 text-gray-100" /> : <HiOutlineEnvelope className="h-5 w-5 text-gray-100" />}
                Message
            </Link>
            <Link to={`/${user.unit}/account`} className={`text-md text-gray-100 p-2 hover:bg-gray-600 flex items-center justify-center gap-2 ${page === 4 && "bg-gray-600"}`}>
                {page === 4 ? <HiUserCircle className="h-5 w-5 text-gray-100" /> : <HiOutlineUserCircle className="h-5 w-5 text-gray-100" />}
                Account
            </Link>
            <button className="text-md text-gray-100 border font-semibold p-2 hover:bg-gray-600 flex items-center justify-center gap-2" onClick={handleClick}>
                <HiArrowLeftOnRectangle className="h-5 w-5 text-gray-100" />
                Logout
            </button>
        </nav>
    );
}

export default UserNavBar;
