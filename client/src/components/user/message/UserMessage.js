import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, useRef } from "react";
import { db } from "../../../firebase/config";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

function UserMessages(props) {
  const [contextmenuIsShown, setContextmenuIsShown] = useState(false);
  const [clickedMessage, setClickedMessage] = useState({ coor: { x: 0, y: 0 }, id: "", subject: "", message: "", isInEditMode: false });
  const Article = useRef(null);
  const H1 = useRef(null);
  const P = useRef(null);

  useEffect(() => {
    window.addEventListener("click", () => {
      setContextmenuIsShown(false);
    });
  }, []);

  function handleContextmenu(e) {
    e.preventDefault();
    setContextmenuIsShown(true);
    setClickedMessage({ coor: { x: e.clientX, y: e.clientY }, id: Article.current.dataset.id, subject: H1.current.textContent, message: P.current.textContent, isInEditMode: false });
  }

  function handleChange(e) {
    setClickedMessage({ ...clickedMessage, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    updateDoc(doc(db, "messages", clickedMessage.id), { subject: clickedMessage.subject, message: clickedMessage.message, updatedAt: serverTimestamp() })
      .then(() => {
        setClickedMessage({ coor: { x: 0, y: 0 }, id: "", subject: "", message: "", isInEditMode: false });
        props.setToggleRerender((prevToggleRerender) => !prevToggleRerender);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="grid grid-cols-2 gap-1 mt-2">
      {clickedMessage.isInEditMode ? (
        <motion.form
          className="flex flex-col text-md bg-white border-2 border-cyan-600 rounded overflow-hidden"
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
          <XMarkIcon className="cursor-pointer h-10 w-5 self-end text-stone-600 hover:bg-stone-300 transition" onClick={() => setClickedMessage({ ...clickedMessage, isInEditMode: false })} />
          <input className="bg-gray-100 m-1 ml-0 border-2 w-full" type="text" name="subject" placeholder="Subject" onChange={handleChange} value={clickedMessage.subject} required={true} autoComplete="false"></input>
          <textarea className="resize-none bg-stone-100 m-1 ml-0 border-2 w-full h-full" name="message" placeholder="Message" value={clickedMessage.message} onChange={handleChange} required={true} autoComplete="false" />
          <button className="self-start block bg-cyan-600 text-white py-0.5 px-3 rounded mt-2 hover:bg-cyan-700 transition">Edit</button>
        </motion.form>
      ) : (
        <article data-id={props.message.id} className={`bg-slate-300 rounded p-2 grid grid-cols-2 ${!props.message.reply && "cursor-pointer hover:bg-slate-400"}`} onContextMenu={!props.message.reply ? handleContextmenu : undefined} ref={Article}>
          <h1 className="font-bold" ref={H1}>
            {props.message.subject}
          </h1>
          <time className="text-xs text-right leading-5">{new Date(props.message.createdAt._seconds * 1000).toDateString()}</time>
          <p className="text-gray-600 whitespace-pre-wrap" ref={P}>
            {props.message.message}
          </p>
        </article>
      )}

      {contextmenuIsShown && <Contextmenu clickedMessage={clickedMessage} setClickedMessage={setClickedMessage} />}

      <article className="bg-slate-100 rounded p-2">
        {props.message.reply ? (
          <>
            <time className="text-xs text-right block">Replied on {new Date(props.message.updatedAt._seconds * 1000).toDateString()}</time>
            <p className="text-gray-600 whitespace-pre-wrap">{props.message.reply}</p>
          </>
        ) : (
          <p className="font-semibold text-cyan-700">Sorry, we'll get back to you asap!</p>
        )}
      </article>
    </div>
  );
}

function Contextmenu(props) {
  function handleClick() {
    props.setClickedMessage({ ...props.clickedMessage, isInEditMode: true });
  }
  return (
    <button className="bg-white border border-stone-500 px-1 rounded fixed hover:bg-stone-300" style={{ left: props.clickedMessage.coor.x, top: props.clickedMessage.coor.y }} onClick={handleClick}>
      Edit
      <PencilSquareIcon className="h-5 w-5 inline ml-2 mb-1 text-green-600" />
    </button>
  );
}

export default UserMessages;
