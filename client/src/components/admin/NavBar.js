import { HomeIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { MegaphoneIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";

function NavBar(props) {
  const adminReducer = useSelector((store) => store.admin);

  function handleClick() {
    signOut(auth);
  }

  return (
    <nav className="bg-stone-700 p-2 text-center flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-stone-100">Granbury Place</h1>
      <Link to={`/admin/${adminReducer.uid}`} className={`text-md text-stone-100 p-2 hover:bg-stone-600 flex items-center justify-center gap-2 ${props.page === 1 && "bg-stone-600"}`}>
        <HomeIcon className="h-5 w-5 text-gray-100" />
        Home
      </Link>
      <Link to={`/admin/${adminReducer.uid}/manage-residents`} className={`text-md text-stone-100 p-2 hover:bg-stone-600 flex items-center justify-center gap-2 ${props.page === 2 && "bg-stone-600"}`}>
        <UsersIcon className="h-5 w-5 text-gray-100" />
        Manage Residents
      </Link>
      <Link to={`/admin/${adminReducer.uid}/manage-gym`} className={`text-md text-stone-100 p-2 hover:bg-stone-600 flex items-center justify-center gap-2 ${props.page === 3 && "bg-stone-600"}`}>
        <CalendarDaysIcon className="h-5 w-5 text-gray-100" />
        Manage Gymroom
      </Link>
      <Link to={`/admin/${adminReducer.uid}/manage-announcement`} className={`text-md text-stone-100 p-2 hover:bg-stone-600 flex items-center justify-center gap-2 ${props.page === 4 && "bg-stone-600"}`}>
        <MegaphoneIcon className="h-5 w-5 text-gray-100" />
        Manage Announcements
      </Link>
      <Link to={`/admin/${adminReducer.uid}/manage-messages`} className={`text-md text-stone-100 p-2 hover:bg-stone-600 flex items-center justify-center gap-2 ${props.page === 5 && "bg-stone-600"}`}>
        <EnvelopeIcon className="h-5 w-5 text-gray-100" />
        Manage Messages
      </Link>
      <Link to={`/admin/${adminReducer.uid}/change-password`} className={`text-md text-stone-100 p-2 hover:bg-stone-600 flex items-center justify-center gap-2 ${props.page === 6 && "bg-stone-600"}`}>
        <LockClosedIcon className="h-5 w-5 text-gray-100" />
        Change Password
      </Link>
      <button className="text-md text-stone-100 border font-semibold p-2 hover:bg-stone-600 flex items-center justify-center gap-2" onClick={handleClick}>
        <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-100" />
        Logout
      </button>
    </nav>
  );
}

export default NavBar;
