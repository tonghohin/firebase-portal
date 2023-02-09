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
    <motion.main className="bg-main-bg bg-cover overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="backdrop-blur-sm h-full w-full p-5 overflow-auto">
        <h1 className="text-4xl text-slate-700 font-semibold mb-4">Change your password</h1>
        <button className="self-start block bg-cyan-600 text-white py-0.5 px-3 rounded mt-2 hover:bg-cyan-700 transition" onClick={handleClick}>
          Get the password reset email
        </button>
        <p className="text-slate-700">{message}</p>
      </div>
    </motion.main>
  );
}

export default UserChangePassword;
