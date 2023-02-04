import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState, useRef } from "react";
import { db } from "../../../firebase/config";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

function NewMessage(props) {
  const [formData, setFormData] = useState({ reply: "" });
  const [isFormShown, setIsFormShown] = useState(false);
  const Div = useRef(null);

  function handleClick() {
    setIsFormShown((prevIsFormShown) => !prevIsFormShown);
  }

  function handleChange(e) {
    setFormData({ reply: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    updateDoc(doc(db, "messages", Div.current.dataset.id), { ...formData, updatedAt: serverTimestamp() })
      .then(() => {
        setFormData({ reply: "" });
        props.setToggleRerender((prevToggleRerender) => !prevToggleRerender);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div data-id={props.newMessage.id} className="grid grid-cols-2 gap-1 mt-2" ref={Div}>
      <article className="bg-stone-100 rounded p-2 flex flex-col">
        <h1 className="font-bold col-span-full flex justify-between items-center">
          {props.newMessage.name} from unit {props.newMessage.unit}
          <time className="font-normal text-xs">{new Date(props.newMessage.createdAt.seconds * 1000).toDateString()}</time>
        </h1>
        <h2 className="font-semibold">{props.newMessage.subject}</h2>
        <p className="text-stone-600 whitespace-pre-wrap">{props.newMessage.message}</p>
      </article>
      <article className="bg-stone-100 rounded p-2 grid">
        {isFormShown ? (
          <form className="flex flex-col h-72 p-2 text-md bg-white border-2 border-green-700 rounded" onSubmit={handleSubmit}>
            <XMarkIcon className="cursor-pointer h-5 w-5 self-end text-stone-600 hover:bg-stone-300 transition" onClick={handleClick} />
            <textarea className="resize-none bg-stone-100 m-1 ml-0 border-2 w-full h-full" name="reply" placeholder="Reply" value={formData.reply} onChange={handleChange} required={true} autoComplete="false" />
            <button className="self-start block bg-green-600 text-white py-0.5 px-3 rounded mt-2 hover:bg-green-700 transition">Send</button>
          </form>
        ) : (
          <button className="bg-green-600 text-white py-0.5 px-3 rounded place-self-center hover:bg-green-700 transition" onClick={handleClick}>
            Reply
          </button>
        )}
      </article>
    </div>
  );
}

export default NewMessage;
