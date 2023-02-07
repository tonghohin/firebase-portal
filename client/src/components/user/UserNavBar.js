import { HomeIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";

function UserNavBar(props) {
  const userReducer = useSelector((store) => store.user);

  function handleClick() {
    signOut(auth);
  }

  return (
    <nav className="bg-gray-700 p-2 text-center flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-gray-100">Granbury Place</h1>
      <h2 className="text-lg font-semibold text-gray-100">Your unit no: {userReducer.unit}</h2>
      <Link to={`/${userReducer.unit}`} className={`text-md text-gray-100 p-2 hover:bg-gray-600 flex items-center justify-center gap-2 ${props.page === 1 && "bg-gray-600"}`}>
        <HomeIcon className="h-5 w-5 text-gray-100" />
        Home
      </Link>
      <Link to={`/${userReducer.unit}/gym`} className={`text-md text-gray-100 p-2 hover:bg-gray-600 flex items-center justify-center gap-2 ${props.page === 2 && "bg-gray-600"}`}>
        <CalendarDaysIcon className="h-5 w-5 text-gray-100" />
        Register Gymroom
      </Link>
      <Link to={`/${userReducer.unit}/message`} className={`text-md text-gray-100 p-2 hover:bg-gray-600 flex items-center justify-center gap-2 ${props.page === 3 && "bg-gray-600"}`}>
        <EnvelopeIcon className="h-5 w-5 text-gray-100" />
        Message
      </Link>
      <Link to={`/${userReducer.unit}/change-password`} className={`text-md text-gray-100 p-2 hover:bg-gray-600 flex items-center justify-center gap-2 ${props.page === 4 && "bg-gray-600"}`}>
        <LockClosedIcon className="h-5 w-5 text-gray-100" />
        Change Password
      </Link>
      <button className="text-md text-gray-100 border font-semibold p-2 hover:bg-gray-600 flex items-center justify-center gap-2" onClick={handleClick}>
        <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-100" />
        Logout
      </button>
    </nav>
  );
}

export default UserNavBar;
