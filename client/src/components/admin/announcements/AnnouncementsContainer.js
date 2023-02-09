import { motion } from "framer-motion";
import { useState } from "react";
import Announcement from "./Announcement";
import { db } from "../../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function AnnouncementsContainer({ toggleRerender, handleToggleRerender }) {
  const [pastAnnouncements, setPastAnnouncements] = useState([]);
  const [isPastAnnouncementsShown, setIsPastAnnouncementsShown] = useState(false);
  const [message, setMessage] = useState("");

  function handleClick() {
    const template = [];

    getDocs(query(collection(db, "announcements"), orderBy("createdAt", "desc"))).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        template.push({ id: doc.id, ...doc.data() });
      });
      setPastAnnouncements(template);
      setIsPastAnnouncementsShown(true);
      handleToggleRerender();
      setMessage("");
    });
  }

  return (
    <>
      <button className="block bg-stone-500 text-white py-0.5 px-3 rounded mt-2 hover:bg-stone-600 transition" onClick={handleClick}>
        See past announcements
      </button>
      {isPastAnnouncementsShown && (
        <motion.section
          className="flex flex-col gap-1 text-md bg-white mt-2 border-2 border-stone-500 rounded overflow-hidden"
          initial={{
            height: 0
          }}
          animate={{
            height: "auto",
            padding: "0.5rem"
          }}
          transition={{
            height: { duration: 0.5 },
            padding: { duration: 0 }
          }}>
          <h1 className="text-stone-800 underline">Past Announcements</h1>
          <p className="text-stone-600">{message}</p>
          {pastAnnouncements.map((announcement) => (
            <Announcement key={announcement.id} announcement={announcement} handleToggleRerender={handleToggleRerender} setMessage={setMessage} />
          ))}
        </motion.section>
      )}
    </>
  );
}

export default AnnouncementsContainer;
