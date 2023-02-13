import { HiOutlineMegaphone } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useState } from "react";
import AnnouncementsContainer from "../../components/admin/announcements/AnnouncementsContainer";
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Announcements() {
  const [formData, setFormData] = useState({ subject: "", announcement: "" });
  const [message, setMessage] = useState("");

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
    <motion.main className="bg-main-bg bg-cover overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="backdrop-blur-sm backdrop-contrast-50 h-full w-full p-5 overflow-auto">
        <h1 className="text-4xl text-gray-100 font-semibold mb-4">Announcements</h1>
        <form className="flex flex-col h-72 p-2 text-md bg-white border-2 border-gray-500 rounded mb-4" onSubmit={handleSubmit}>
          <input className="bg-gray-100 m-1 ml-0 border-2 w-full" type="text" name="subject" placeholder="Subject" onChange={handleChange} value={formData.subject} required={true} autoComplete="false"></input>
          <textarea className="resize-none bg-gray-100 m-1 ml-0 border-2 w-full h-full" name="announcement" placeholder="Announcement" value={formData.announcement} onChange={handleChange} required={true} autoComplete="false" />
          <p className="text-gray-600">{message}</p>
          <button className="self-start flex items-center gap-2 bg-gray-500 text-white py-0.5 px-3 rounded mt-2 hover:bg-gray-600 transition">
            Publish
            <HiOutlineMegaphone className="h-5 w-5 text-white inline" />
          </button>
        </form>
        <AnnouncementsContainer />
      </div>
    </motion.main>
  );
}

export default Announcements;
