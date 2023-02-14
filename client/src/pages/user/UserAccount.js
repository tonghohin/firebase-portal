import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../../firebase/AuthContextProvider";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";

function UserAccount() {
  const user = useAuth();
  const [message, setMessage] = useState("");

  function handleClick(e) {
    e.preventDefault();

    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        setMessage(`Email sent to ${user.email}! Please check your email and follow the instructions to change your password.`);
      })
      .catch((error) => {
        setMessage(error.code);
      });
  }

  return (
    <motion.main className="bg-main-bg bg-cover overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="backdrop-blur-sm h-full w-full p-5 overflow-auto">
        <h1 className="text-4xl text-slate-700 font-semibold mb-4">Account</h1>
        <article className="bg-white inline-block mb-4 p-1 rounded border-2 border-cyan-500">
          <p>
            Email: <span className="underline">{user.email}</span>
          </p>
          <p>
            Unit: <span className="underline">{user.unit}</span>
          </p>
        </article>

        <button className="self-start block bg-cyan-600 text-white py-0.5 px-3 rounded mt-2 hover:bg-cyan-700 transition" onClick={handleClick}>
          Get the password reset email
        </button>
        <p className="text-slate-700">{message}</p>
      </div>
    </motion.main>
  );
}

export default UserAccount;
