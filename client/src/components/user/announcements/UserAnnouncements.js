import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/config";

function UserAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const template = [];

        getDocs(query(collection(db, "announcements"), orderBy("createdAt", "desc"))).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                template.push({ id: doc.id, ...doc.data() });
            });
            setAnnouncements(template);
        });
    }, []);

    return (
        <>
            <motion.section
                className="flex flex-col gap-1 p-2 text-md bg-slate-100  mt-2 border-2 border-cyan-600 rounded overflow-auto"
                initial={{
                    opacity: 0,
                    height: 0
                }}
                animate={{
                    opacity: 1,
                    height: "40rem"
                }}
                transition={{
                    duration: 1
                }}>
                <h1 className="text-slate-800 font-bold">Announcements</h1>
                {announcements.map((annoucementObj) => {
                    return (
                        <article key={annoucementObj.id} className="bg-slate-200 rounded p-2 grid grid-cols-2">
                            <h1 className="font-bold">{annoucementObj.subject}</h1>
                            <time className="text-xs text-right leading-5">{new Date(annoucementObj.createdAt.seconds * 1000).toDateString()}</time>
                            <p className="text-gray-600 whitespace-pre-wrap">{annoucementObj.announcement}</p>
                        </article>
                    );
                })}
            </motion.section>
        </>
    );
}

export default UserAnnouncements;
