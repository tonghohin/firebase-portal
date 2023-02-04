import { Link } from "react-router-dom";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";

function NavBar(props) {
  function handleClick() {
    signOut(auth);
  }

  return (
    <nav className="bg-stone-700 p-2 text-center flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-stone-100">Granbury Place</h1>
      <Link to="/admin" className={`text-md text-stone-100 p-2 hover:bg-stone-600 ${props.page === 1 && "bg-stone-600"}`}>
        Home
      </Link>
      <Link to="/admin/manage-residents" className={`text-md text-stone-100 p-2 hover:bg-stone-600 ${props.page === 2 && "bg-stone-600"}`}>
        Manage Residents
      </Link>
      <Link to="/admin/manage-gym" className={`text-md text-stone-100 p-2 hover:bg-stone-600 ${props.page === 3 && "bg-stone-600"}`}>
        Manage Gymroom
      </Link>
      <Link to="/admin/manage-announcement" className={`text-md text-stone-100 p-2 hover:bg-stone-600 ${props.page === 4 && "bg-stone-600"}`}>
        Manage Announcements
      </Link>
      <Link to="/admin/manage-messages" className={`text-md text-stone-100 p-2 hover:bg-stone-600 ${props.page === 5 && "bg-stone-600"}`}>
        Manage Messages
      </Link>
      <button className="text-md text-stone-100 border font-semibold p-2 hover:bg-stone-600" onClick={handleClick}>
        Logout
      </button>
    </nav>
  );
}

export default NavBar;
