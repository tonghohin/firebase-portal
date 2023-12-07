import { doc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HiOutlinePencilSquare, HiXMark } from "react-icons/hi2";
import { db } from "../../../firebase/config";

function Announcement({ announcement, setMessage, setToggleRerender }) {
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
                setMessage("The announcement has been edited.");
                setToggleRerender((prevToggleRerender) => !prevToggleRerender);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return clickedAnnouncement.isInEditMode ? (
        <motion.form
            className="flex flex-col text-md bg-white mt-2 border-2 border-green-700 rounded"
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
            <nav className="flex justify-end">
                <HiXMark className="cursor-pointer h-5 w-5 rounded text-neutral-600 hover:bg-neutral-300 transition" onClick={() => setClickedAnnouncement({ ...clickedAnnouncement, isInEditMode: false })} />
            </nav>
            <input className="bg-neutral-100 m-1 ml-0 border-2 w-full" type="text" name="subject" placeholder="Subject" onChange={handleChange} value={clickedAnnouncement.subject} required={true} autoComplete="false" />
            <textarea className="resize-none bg-neutral-100 m-1 ml-0 border-2 w-full h-full" name="announcement" placeholder="Announcement" value={clickedAnnouncement.announcement} onChange={handleChange} required={true} autoComplete="false" />
            <button className="self-start flex items-center gap-2 bg-green-700 text-white py-0.5 px-3 rounded mt-2 hover:bg-green-800 transition">
                Edit
                <HiOutlinePencilSquare className="h-5 w-5 inline text-white" />
            </button>
        </motion.form>
    ) : (
        <article id={announcement.id} className="bg-neutral-100 rounded p-2 grid grid-cols-2 cursor-pointer hover:bg-neutral-200" onContextMenu={handleContextmenu}>
            <h1 className="font-bold" ref={H1}>
                {announcement.subject}
            </h1>
            <time className="text-xs text-right leading-5">{new Date(announcement.createdAt.seconds * 1000).toDateString()}</time>
            <p className="text-neutral-600 whitespace-pre-wrap" ref={P}>
                {announcement.announcement}
            </p>
            {contextmenuIsShown && <Contextmenu setClickedAnnouncement={setClickedAnnouncement} clickedAnnouncement={clickedAnnouncement} />}
        </article>
    );
}

function Contextmenu({ setClickedAnnouncement, clickedAnnouncement }) {
    function handleClick() {
        setClickedAnnouncement({ ...clickedAnnouncement, isInEditMode: true });
    }
    return (
        <button className="bg-white border border-neutral-500 px-1 rounded fixed hover:bg-neutral-300" style={{ left: clickedAnnouncement.coor.x, top: clickedAnnouncement.coor.y }} onClick={handleClick}>
            Edit
            <HiOutlinePencilSquare className="h-5 w-5 inline ml-2 mb-1 text-green-600" />
        </button>
    );
}

export default Announcement;
