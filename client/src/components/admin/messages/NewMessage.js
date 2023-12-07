import { motion } from "framer-motion";
import { HiXMark } from "react-icons/hi2";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { useState, useRef } from "react";
import { db } from "../../../firebase/config";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

function NewMessage({ newMessage, setToggleRerender }) {
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
                setToggleRerender((prevToggleRerender) => !prevToggleRerender);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div data-id={newMessage.id} className="grid grid-cols-2 gap-1 mt-2" ref={Div}>
            <article className="bg-neutral-100 rounded p-2 flex flex-col">
                <h1 className="font-bold col-span-full flex justify-between items-center">
                    {newMessage.name} from unit {newMessage.unit}
                    <time className="font-normal text-xs">{new Date(newMessage.createdAt.seconds * 1000).toDateString()}</time>
                </h1>
                <h2 className="font-semibold">{newMessage.subject}</h2>
                <p className="text-neutral-600 whitespace-pre-wrap">{newMessage.message}</p>
            </article>
            {isFormShown ? (
                <motion.form
                    className="flex flex-col h-72 text-md bg-white border-2 border-green-700 rounded overflow-hidden"
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
                        <HiXMark className="cursor-pointer h-5 w-5 rounded text-neutral-600 hover:bg-neutral-300 transition" onClick={handleClick} />
                    </nav>
                    <textarea className="resize-none bg-neutral-100 m-1 ml-0 border-2 w-full h-full" name="reply" placeholder="Reply" value={formData.reply} onChange={handleChange} required={true} autoComplete="false" />
                    <button className="self-start bg-green-700 text-white py-0.5 px-3 rounded mt-2 hover:bg-green-800 transition flex items-center gap-2">
                        Reply
                        <HiOutlinePaperAirplane className="h-5 w-5 inline text-white" />
                    </button>
                </motion.form>
            ) : (
                <article className="bg-neutral-100 rounded p-2 grid">
                    <button className="bg-green-700 text-white py-0.5 px-3 rounded place-self-center hover:bg-green-800 transition flex items-center gap-2" onClick={handleClick}>
                        Reply
                        <HiOutlinePaperAirplane className="h-5 w-5 inline text-white" />
                    </button>
                </article>
            )}
        </div>
    );
}

export default NewMessage;
