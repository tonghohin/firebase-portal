import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import { db } from "../../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

function Announcement(props) {
  const [contextmenuIsShown, setContextmenuIsShown] = useState(false);
  const [clickedAnnouncement, setClickedAnnouncement] = useState({ coor: { x: 0, y: 0 }, id: "", subject: "", announcement: "", isInEditMode: false });
  const H1 = useRef(null);
  const P = useRef(null);

  function handleContextmenu(e) {
    e.preventDefault();
    setContextmenuIsShown(true);
    setClickedAnnouncement({ coor: { x: e.clientX, y: e.clientY }, id: e.currentTarget.id, subject: H1.current.textContent, announcement: P.current.textContent, isInEditMode: false });
  }

  useEffect(() => {
    window.addEventListener("click", () => {
      setContextmenuIsShown(false);
    });
  }, []);

  function handleChange(e) {
    setClickedAnnouncement({ ...clickedAnnouncement, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    updateDoc(doc(db, "announcements", clickedAnnouncement.id), { subject: clickedAnnouncement.subject, announcement: clickedAnnouncement.announcement })
      .then(() => {
        setClickedAnnouncement({ coor: { x: 0, y: 0 }, id: "", subject: "", announcement: "", isInEditMode: false });
        props.setMessage("The announcement has been edited.");
        props.handleToggleRerender();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return clickedAnnouncement.isInEditMode ? (
    <motion.form
      className="flex flex-col text-md bg-white mt-2 border-2 border-cyan-600 rounded"
      onSubmit={handleSubmit}
      initial={{
        height: 0
      }}
      animate={{
        height: "18rem",
        padding: "0.5rem"
      }}
      transition={{
        height: { duration: 0.5 },
        padding: { duration: 0 }
      }}>
      <XMarkIcon className="cursor-pointer h-5 w-5 self-end text-stone-600 hover:bg-stone-300 transition" onClick={() => setClickedAnnouncement({ ...clickedAnnouncement, isInEditMode: false })} />
      <input className="bg-stone-100 m-1 ml-0 border-2 w-full" type="text" name="subject" placeholder="Subject" onChange={handleChange} value={clickedAnnouncement.subject} required={true} autoComplete="false"></input>
      <textarea className="resize-none bg-stone-100 m-1 ml-0 border-2 w-full h-full" name="announcement" placeholder="Announcement" value={clickedAnnouncement.announcement} onChange={handleChange} required={true} autoComplete="false" />
      <button className="self-start block bg-cyan-600 text-white py-0.5 px-3 rounded mt-2 hover:bg-cyan-700 transition">Edit</button>
    </motion.form>
  ) : (
    <article id={props.announcement.id} className="bg-stone-100 rounded p-2 grid grid-cols-2 cursor-pointer hover:bg-stone-200" onContextMenu={handleContextmenu}>
      <h1 className="font-bold" ref={H1}>
        {props.announcement.subject}
      </h1>
      <time className="text-xs text-right leading-5">{new Date(props.announcement.createdAt.seconds * 1000).toDateString()}</time>
      <p className="text-stone-600 whitespace-pre-wrap" ref={P}>
        {props.announcement.announcement}
      </p>
      {contextmenuIsShown && <Contextmenu setClickedAnnouncement={setClickedAnnouncement} clickedAnnouncement={clickedAnnouncement} />}
    </article>
  );
}

function Contextmenu(props) {
  function handleClick() {
    props.setClickedAnnouncement({ ...props.clickedAnnouncement, isInEditMode: true });
  }
  return (
    <button className="bg-white border border-stone-500 px-1 rounded fixed hover:bg-stone-300" style={{ left: props.clickedAnnouncement.coor.x, top: props.clickedAnnouncement.coor.y }} onClick={handleClick}>
      Edit
      <PencilSquareIcon className="h-5 w-5 inline ml-2 mb-1 text-green-600" />
    </button>
  );
}

export default Announcement;
