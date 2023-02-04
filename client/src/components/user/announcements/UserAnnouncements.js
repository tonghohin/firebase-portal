import { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";


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
      <section className="flex flex-col gap-1 p-2 text-md bg-white mt-2 border-2 border-cyan-600 rounded">
        <h1 className="text-slate-800 font-bold">Announcements</h1>
        {announcements.map((annoucementObj) => {
          return (
            <article key={annoucementObj.id} className="bg-slate-100 rounded p-2 grid grid-cols-2">
              <h1 className="font-bold">{annoucementObj.subject}</h1>
              <time className="text-xs text-right leading-5">{new Date(annoucementObj.createdAt.seconds * 1000).toDateString()}</time>
              <p className="text-gray-600 whitespace-pre-wrap">{annoucementObj.announcement}</p>
            </article>
          );
        })}
      </section>
    </>
  );
}

export default UserAnnouncements;
