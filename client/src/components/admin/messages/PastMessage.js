import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import { db } from "../../../firebase/config";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

function PastMessage(props) {
  const [contextmenuIsShown, setContextmenuIsShown] = useState(false);
  const [clickedMessage, setClickedMessage] = useState({ coor: { x: 0, y: 0 }, id: "", reply: "", isInEditMode: false });
  const Div = useRef(null);
  const P = useRef(null);

  useEffect(() => {
    window.addEventListener("click", () => {
      setContextmenuIsShown(false);
    });
  }, []);

  function handleContextmenu(e) {
    e.preventDefault();
    setContextmenuIsShown(true);
    setClickedMessage({ coor: { x: e.clientX, y: e.clientY }, id: Div.current.dataset.id, reply: P.current.textContent, isInEditMode: false });
  }

  function handleChange(e) {
    setClickedMessage({ ...clickedMessage, reply: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    updateDoc(doc(db, "messages", clickedMessage.id), { reply: clickedMessage.reply, updatedAt: serverTimestamp() })
      .then(() => {
        setClickedMessage({ coor: { x: 0, y: 0 }, id: "", reply: "", isInEditMode: false });
        props.handleToggleRerender();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div key={props.pastMessage.id} data-id={props.pastMessage.id} className="grid grid-cols-2 gap-1 mt-2" ref={Div}>
      <article className="bg-stone-300 rounded p-2 flex flex-col ">
        <h1 className="font-bold col-span-full flex justify-between items-center">
          {props.pastMessage.name} from Unit {props.pastMessage.unit}
          <time className="font-normal text-xs">{new Date(props.pastMessage.createdAt.seconds * 1000).toDateString()}</time>
        </h1>
        <h2 className="font-semibold">{props.pastMessage.subject}</h2>
        <p className="text-stone-600 whitespace-pre-wrap">{props.pastMessage.message}</p>
      </article>

      {clickedMessage.isInEditMode ? (
        <form className="flex flex-col h-72 p-2 text-md bg-white border-2 border-cyan-600 rounded" onSubmit={handleSubmit}>
          <textarea className="resize-none bg-stone-100 m-1 ml-0 border-2 w-full h-full" name="reply" placeholder="Reply" value={clickedMessage.reply} onChange={handleChange} required={true} autoComplete="false" />
          <button className="self-start block bg-cyan-600 text-white py-0.5 px-3 rounded mt-2 hover:bg-cyan-700 transition">Edit</button>
        </form>
      ) : (
        <article className="bg-stone-100 rounded p-2 cursor-pointer hover:bg-stone-200" onContextMenu={handleContextmenu}>
          <time className="text-xs text-right block">Replied on {new Date(props.pastMessage.updatedAt.seconds * 1000).toDateString()}</time>
          <p className="text-stone-600 whitespace-pre-wrap" ref={P}>
            {props.pastMessage.reply}
          </p>
          {contextmenuIsShown && <Contextmenu clickedMessage={clickedMessage} setClickedMessage={setClickedMessage} />}
        </article>
      )}
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

export default PastMessage;
