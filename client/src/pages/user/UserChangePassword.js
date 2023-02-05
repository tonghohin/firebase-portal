import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";

function UserChangePassword() {
  const userReducer = useSelector((store) => store.user);
  const [message, setMessage] = useState("");

  function handleClick(e) {
    e.preventDefault();

    sendPasswordResetEmail(auth, userReducer.email)
      .then(() => {
        setMessage(`Email sent to ${userReducer.email}! Please check your email and follow the instructions to change your password.`);
      })
      .catch((error) => {
        setMessage(error.code);
      });
  }

  return (
    <motion.main className="p-5 bg-gray-100 overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-xl font-semibold">Change your password</h1>
      <button className="self-start block bg-cyan-600 text-white py-0.5 px-3 rounded mt-2 hover:bg-cyan-700 transition" onClick={handleClick}>
        Get the password reset email
      </button>
      <p className="text-cyan-600">{message}</p>
    </motion.main>
  );
}

export default UserChangePassword;
