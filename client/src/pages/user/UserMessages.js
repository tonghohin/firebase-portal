import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import UserMessage from "../../components/user/message/UserMessage";
import { useAuth } from "../../firebase/AuthContextProvider";
import { db } from "../../firebase/config";

function UserMessages() {
    const user = useAuth();
    const [messages, setMessages] = useState([]);
    const [formData, setFormData] = useState({ name: "", unit: user.unit, subject: "", message: "" });
    const [message, setMessage] = useState("");
    const [toggleRerender, setToggleRerender] = useState(false);

    useEffect(() => {
        fetch(`/message/${user.unit}`)
            .then((res) => res.json())
            .then((data) => {
                setMessages(data);
            });
    }, [toggleRerender, user.unit]);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        addDoc(collection(db, "messages"), { ...formData, createdAt: serverTimestamp() })
            .then(() => {
                setMessage("Message sent! We'll get back to you asap!.");
                setToggleRerender((prevToggleRerender) => !prevToggleRerender);
            })
            .catch((err) => {
                console.log(err);
            });
        setFormData({ name: "", unit: user.unit, subject: "", message: "" });
    }

    return (
        <motion.main className="bg-main-bg bg-cover overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="backdrop-blur-sm h-full w-full p-5 overflow-auto">
                <h1 className="text-4xl text-slate-700 font-semibold mb-4">Messages</h1>
                <form className="flex flex-col h-72 p-2 text-md bg-white  mb-4 border-2 border-cyan-600 rounded" onSubmit={handleSubmit}>
                    <input className="bg-slate-100 m-1 ml-0 border-2 w-full" type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} required={true} autoComplete="false"></input>
                    <input className="bg-gray-100 m-1 ml-0 border-2 w-full" type="text" name="subject" placeholder="Subject" onChange={handleChange} value={formData.subject} required={true} autoComplete="false"></input>
                    <textarea className="resize-none bg-gray-100 m-1 ml-0 border-2 w-full h-full" name="message" placeholder="Message" value={formData.message} onChange={handleChange} required={true} autoComplete="false" />
                    <p className="text-cyan-600">{message}</p>
                    <button className="self-start flex items-center gap-2 bg-cyan-600 text-white py-0.5 px-3 rounded mt-2 hover:bg-cyan-700 transition">
                        Send
                        <HiOutlinePaperAirplane className="h-5 w-5 inline text-white" />
                    </button>
                </form>
                <motion.section
                    className="p-2 text-md bg-white border-2 border-cyan-600 rounded overflow-auto"
                    initial={{
                        height: 0
                    }}
                    animate={{
                        height: "26rem",
                        padding: "0.5rem"
                    }}
                    transition={{
                        height: { duration: 0.5 },
                        padding: { duration: 0 }
                    }}>
                    <h1 className="text-slate-800 font-bold col-span-full">Past Messages</h1>
                    {messages.length !== 0 ? messages.map((message) => <UserMessage key={message.id} message={message} setToggleRerender={setToggleRerender} />) : <p>No past messages.</p>}
                </motion.section>
            </div>
        </motion.main>
    );
}

export default UserMessages;
