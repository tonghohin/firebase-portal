import { motion } from "framer-motion";
import { useState } from "react";
import AnnouncementsContainer from "../../components/admin/announcements/AnnouncementsContainer";
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Announcements() {
  const [formData, setFormData] = useState({ subject: "", announcement: "" });
  const [message, setMessage] = useState("");
  const [toggleRerender, setToggleRerender] = useState(false);

  function handleToggleRerender() {
    setToggleRerender((prevToggleRerender) => !prevToggleRerender);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    addDoc(collection(db, "announcements"), { ...formData, createdAt: serverTimestamp() })
      .then(() => {
        setFormData({ subject: "", announcement: "" });
        setMessage("The announcement has been published.");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <motion.main className="p-5 bg-stone-100 overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-xl font-semibold">Announcements</h1>
      <form className="flex flex-col h-72 p-2 text-md bg-white mt-2 border-2 border-cyan-600 rounded" onSubmit={handleSubmit}>
        <input className="bg-stone-100 m-1 ml-0 border-2 w-full" type="text" name="subject" placeholder="Subject" onChange={handleChange} value={formData.subject} required={true} autoComplete="false"></input>
        <textarea className="resize-none bg-stone-100 m-1 ml-0 border-2 w-full h-full" name="announcement" placeholder="Announcement" value={formData.announcement} onChange={handleChange} required={true} autoComplete="false" />
        <p className="text-cyan-600">{message}</p>
        <button className="self-start block bg-cyan-600 text-white py-0.5 px-3 rounded mt-2 hover:bg-cyan-700 transition">Publish</button>
      </form>
      <AnnouncementsContainer toggleRerender={toggleRerender} handleToggleRerender={handleToggleRerender} />
    </motion.main>
  );
}

export default Announcements;
