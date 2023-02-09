import { HiHome } from "react-icons/hi2";
import { HiOutlineHome } from "react-icons/hi2";
import { HiCalendarDays } from "react-icons/hi2";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { HiEnvelope } from "react-icons/hi2";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { HiLockClosed } from "react-icons/hi2";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";

function UserNavBar({page}) {
  const userReducer = useSelector((store) => store.user);

  function handleClick() {
    signOut(auth);
  }

  return (
    <nav className="bg-gray-700 p-2 text-center flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-gray-100">Granbury Place</h1>
      <h2 className="text-lg font-semibold text-gray-100">Your unit no: {userReducer.unit}</h2>
      <Link to={`/${userReducer.unit}`} className={`text-md text-gray-100 p-2 hover:bg-gray-600 flex items-center justify-center gap-2 ${page === 1 && "bg-gray-600"}`}>
        {page === 1 ? <HiHome className="h-5 w-5 text-gray-100" /> : <HiOutlineHome className="h-5 w-5 text-gray-100" />}
        Home
      </Link>
      <Link to={`/${userReducer.unit}/gym`} className={`text-md text-gray-100 p-2 hover:bg-gray-600 flex items-center justify-center gap-2 ${page === 2 && "bg-gray-600"}`}>
        {page === 2 ? <HiCalendarDays className="h-5 w-5 text-gray-100" /> : <HiOutlineCalendarDays className="h-5 w-5 text-gray-100" />}
        Register Gymroom
      </Link>
      <Link to={`/${userReducer.unit}/message`} className={`text-md text-gray-100 p-2 hover:bg-gray-600 flex items-center justify-center gap-2 ${page === 3 && "bg-gray-600"}`}>
        {page === 3 ? <HiEnvelope className="h-5 w-5 text-gray-100" /> : <HiOutlineEnvelope className="h-5 w-5 text-gray-100" />}
        Message
      </Link>
      <Link to={`/${userReducer.unit}/change-password`} className={`text-md text-gray-100 p-2 hover:bg-gray-600 flex items-center justify-center gap-2 ${page === 4 && "bg-gray-600"}`}>
        {page === 4 ? <HiLockClosed className="h-5 w-5 text-gray-100" /> : <HiOutlineLockClosed className="h-5 w-5 text-gray-100" />}
        Change Password
      </Link>
      <button className="text-md text-gray-100 border font-semibold p-2 hover:bg-gray-600 flex items-center justify-center gap-2" onClick={handleClick}>
        <HiArrowLeftOnRectangle className="h-5 w-5 text-gray-100" />
        Logout
      </button>
    </nav>
  );
}

export default UserNavBar;
