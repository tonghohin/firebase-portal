import { useEffect, useState } from "react";
import NewMessage from "../../components/admin/messages/NewMessage";
import PastMessage from "../../components/admin/messages/PastMessage";
import { db } from "../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function Messages() {
  const [messages, setMessages] = useState({ newMessage: [], pastMessage: [] });
  const [toggleRerender, setToggleRerender] = useState(false);

  function handleToggleRerender() {
    setToggleRerender((prevToggleRerender) => !prevToggleRerender);
  }

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
    <main className="p-5 bg-stone-100 overflow-auto">
      <h1 className="text-xl font-semibold">Messages</h1>
      <section className="p-2 text-md bg-white mt-2 border-2 border-green-600 rounded">
        <h1 className="text-stone-800 font-bold col-span-full">New Message</h1>
        {messages.newMessage.length !== 0 ? messages.newMessage.map((newMessageObj) => <NewMessage key={newMessageObj.id} newMessage={newMessageObj} setToggleRerender={setToggleRerender} />) : <p>No new messages.</p>}
      </section>
      <section className="p-2 text-md bg-white mt-2 border-2 border-stone-500 rounded">
        <h1 className="text-stone-800 font-bold col-span-full">Past Message</h1>
        {messages.pastMessage.map((pastMessageObj) => (
          <PastMessage key={pastMessageObj.id} pastMessage={pastMessageObj} handleToggleRerender={handleToggleRerender} />
        ))}
      </section>
    </main>
  );
}

export default Messages;
