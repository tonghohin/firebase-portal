import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import NewMessage from "../../components/admin/messages/NewMessage";
import PastMessage from "../../components/admin/messages/PastMessage";
import { db } from "../../firebase/config";

function Messages() {
    const [messages, setMessages] = useState({ newMessage: [], pastMessage: [] });
    const [toggleRerender, setToggleRerender] = useState(false);

    useEffect(() => {
        const newMessageTemplate = [];
        const pastMessageTemplate = [];

        getDocs(query(collection(db, "messages"), orderBy("createdAt", "desc"))).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().reply) {
                    pastMessageTemplate.push({ id: doc.id, ...doc.data() });
                } else {
                    newMessageTemplate.push({ id: doc.id, ...doc.data() });
                }
            });
            setMessages({ newMessage: newMessageTemplate, pastMessage: pastMessageTemplate });
        });
    }, [toggleRerender]);

    return (
        <motion.main className="bg-main-bg bg-cover overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="backdrop-blur-sm backdrop-contrast-50 h-full w-full p-5 overflow-auto">
                <h1 className="text-4xl text-neutral-100 font-semibold mb-4">Messages</h1>
                <section className="p-2 text-md bg-white border-2 border-green-700 rounded mb-4">
                    <h1 className="text-neutral-800 font-bold col-span-full">New Message</h1>
                    {messages.newMessage.length !== 0 ? messages.newMessage.map((newMessageObj) => <NewMessage key={newMessageObj.id} newMessage={newMessageObj} setToggleRerender={setToggleRerender} />) : <p>No new messages.</p>}
                </section>
                <section className="p-2 text-md bg-white mt-2 border-2 border-neutral-500 rounded">
                    <h1 className="text-neutral-800 font-bold col-span-full">Past Message</h1>
                    {messages.pastMessage.map((pastMessageObj) => (
                        <PastMessage key={pastMessageObj.id} pastMessage={pastMessageObj} setToggleRerender={setToggleRerender} />
                    ))}
                </section>
            </div>
        </motion.main>
    );
}

export default Messages;
