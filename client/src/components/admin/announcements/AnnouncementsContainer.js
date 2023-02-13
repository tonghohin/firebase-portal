import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Announcement from "./Announcement";
import { db } from "../../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function AnnouncementsContainer() {
  const [pastAnnouncements, setPastAnnouncements] = useState([]);
  const [isPastAnnouncementsShown, setIsPastAnnouncementsShown] = useState(false);
  const [message, setMessage] = useState("");
  const [toggleRerender, setToggleRerender] = useState(false);

  useEffect(() => {
    const template = [];

    getDocs(query(collection(db, "announcements"), orderBy("createdAt", "desc")))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          template.push({ id: doc.id, ...doc.data() });
        });
      })
      .then(() => {
        setPastAnnouncements(template);
      });
  }, [toggleRerender]);

  function handleClick() {
    setIsPastAnnouncementsShown(true);
    setMessage("");
  }

  return (
    <>
      <button className="block bg-gray-500 text-white py-0.5 px-3 rounded mb-4 hover:bg-gray-600 transition" onClick={handleClick}>
        See past announcements
      </button>
      {isPastAnnouncementsShown && (
        <motion.section
          className="flex flex-col gap-1 text-md bg-white mt-2 border-2 border-gray-500 rounded overflow-hidden"
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
          <h1 className="text-gray-800 underline">Past Announcements</h1>
          <p className="text-gray-600">{message}</p>
          {pastAnnouncements.map((announcement) => (
            <Announcement key={announcement.id} announcement={announcement} setMessage={setMessage} setToggleRerender={setToggleRerender} />
          ))}
        </motion.section>
      )}
    </>
  );
}

export default AnnouncementsContainer;
