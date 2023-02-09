import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";

function ChangePassword() {
  const userReducer = useSelector((store) => store.admin);
  const [message, setMessage] = useState("");

  function handleClick(e) {
    e.preventDefault();

    sendPasswordResetEmail(auth, userReducer.email)
      .then(() => {
        setMessage(`Email sent to ${userReducer.email}! Please check your email and follow the instructions.`);
      })
      .catch((error) => {
        setMessage(error.code);
      });
  }

  return (
    <motion.main className="bg-main-bg bg-cover overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="backdrop-blur-sm backdrop-contrast-50 h-full w-full p-5">
        <h1 className="text-4xl text-stone-100 font-semibold mb-4">Change your password</h1>
        <button className="self-start block bg-stone-500 text-white py-0.5 px-3 rounded mb-2 hover:bg-stone-600 transition" onClick={handleClick}>
          Get the password reset email
        </button>
        <p className="text-stone-700">{message}</p>
      </div>
    </motion.main>
  );
}

export default ChangePassword;
