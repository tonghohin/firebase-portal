import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HiOutlinePencilSquare, HiXMark } from "react-icons/hi2";
import { db } from "../../../firebase/config";

function PastMessage({ pastMessage, setToggleRerender }) {
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
                setToggleRerender((prevToggleRerender) => !prevToggleRerender);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div key={pastMessage.id} data-id={pastMessage.id} className="grid grid-cols-2 gap-1 mt-2" ref={Div}>
            <article className="bg-neutral-300 rounded p-2 flex flex-col ">
                <h1 className="font-bold col-span-full flex justify-between items-center">
                    {pastMessage.name} from Unit {pastMessage.unit}
                    <time className="font-normal text-xs">{new Date(pastMessage.createdAt.seconds * 1000).toDateString()}</time>
                </h1>
                <h2 className="font-semibold">{pastMessage.subject}</h2>
                <p className="text-neutral-600 whitespace-pre-wrap">{pastMessage.message}</p>
            </article>

            {clickedMessage.isInEditMode ? (
                <motion.form
                    className="flex flex-col text-md bg-white border-2 border-green-700 rounded overflow-hidden"
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
                        <HiXMark className="cursor-pointer h-5 w-5 rounded text-neutral-600 hover:bg-neutral-300 transition" onClick={() => setClickedMessage({ ...clickedMessage, isInEditMode: false })} />
                    </nav>
                    <textarea className="resize-none bg-neutral-100 m-1 ml-0 border-2 w-full h-full" name="reply" placeholder="Reply" value={clickedMessage.reply} onChange={handleChange} required={true} autoComplete="false" />
                    <button className="self-start flex items-center gap-2 bg-green-700 text-white py-0.5 px-3 rounded mt-2 hover:bg-green-800 transition">
                        Edit
                        <HiOutlinePencilSquare className="h-5 w-5 inline text-white" />
                    </button>
                </motion.form>
            ) : (
                <article className="bg-neutral-100 rounded p-2 cursor-pointer hover:bg-neutral-200" onContextMenu={handleContextmenu}>
                    <time className="text-xs text-right block">Replied on {new Date(pastMessage.updatedAt.seconds * 1000).toDateString()}</time>
                    <p className="text-neutral-600 whitespace-pre-wrap" ref={P}>
                        {pastMessage.reply}
                    </p>
                    {contextmenuIsShown && <Contextmenu clickedMessage={clickedMessage} setClickedMessage={setClickedMessage} />}
                </article>
            )}
        </div>
    );
}

function Contextmenu({ clickedMessage, setClickedMessage }) {
    function handleClick() {
        setClickedMessage({ ...clickedMessage, isInEditMode: true });
    }
    return (
        <button className="bg-white border border-neutral-500 px-1 rounded fixed hover:bg-neutral-300" style={{ left: clickedMessage.coor.x, top: clickedMessage.coor.y }} onClick={handleClick}>
            Edit
            <HiOutlinePencilSquare className="h-5 w-5 inline ml-2 mb-1 text-green-600" />
        </button>
    );
}

export default PastMessage;
