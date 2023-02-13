import { motion } from "framer-motion";
import { HiOutlineNoSymbol } from "react-icons/hi2";
import { HiOutlineCheck } from "react-icons/hi2";
import { useState, useEffect } from "react";
import GymCalendar from "../../components/admin/gym/GymCalendar";
import { db } from "../../firebase/config";
import { collection, getDocs, doc, updateDoc, query, orderBy } from "firebase/firestore";

function Gym() {
  const [allGymScheduleDays, setAllGymScheduleDays] = useState([]);
  const [toggleRerender, setToggleRerender] = useState(false);
  const [contextmenuInfo, setContextmenuInfo] = useState({ isShown: false, textIsClosed: true });
  const [clickedTimeslot, setClickedTimeslot] = useState({ coor: { x: "", y: "" }, dayid: "", timeslotId: "", slot: "" });

  useEffect(() => {
    window.addEventListener("click", () => {
      setContextmenuInfo({ isShown: false, textIsClosed: true });
    });
  }, []);

  useEffect(() => {
    const template = [];
    getDocs(query(collection(db, "gym"), orderBy("date"))).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        template.push({ dayId: doc.id, ...doc.data() });
      });
      console.log(template);
      setAllGymScheduleDays(template);
    });
  }, [toggleRerender]);

  return (
    <>
      <motion.main className="bg-main-bg bg-cover overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="backdrop-blur-sm backdrop-contrast-50 h-full w-full p-5 overflow-auto">
          <h1 className="text-4xl text-gray-100 font-semibold mb-4">Gymroom Schedule</h1>
          <section className="grid grid-cols-7 bg-white rounded border-2 border-gray-500 overflow-hidden">
            {allGymScheduleDays.map((day) => (
              <GymCalendar key={day.dayId} sinlgeGymScheduleDay={day} toggleRerender={toggleRerender} setContextmenuInfo={setContextmenuInfo} setClickedTimeslot={setClickedTimeslot} />
            ))}
          </section>
        </div>
      </motion.main>
      {contextmenuInfo.isShown && <Contextmenu contextmenuInfo={contextmenuInfo} setToggleRerender={setToggleRerender} clickedTimeslot={clickedTimeslot} />}
    </>
  );
}

function Contextmenu({ contextmenuInfo, setToggleRerender, clickedTimeslot }) {

  function handleClick() {
    if (contextmenuInfo.textIsClosed) {
      updateDoc(query(doc(db, "gym", clickedTimeslot.dayid, "timeslot", clickedTimeslot.timeslotId)), { slotOne: "Closed", slotTwo: "Closed", slotThree: "Closed" })
        .then(() => setToggleRerender((prevToggleRerender) => !prevToggleRerender))
        .catch((err) => {
          console.log(err);
        });
    } else {
      updateDoc(query(doc(db, "gym", clickedTimeslot.dayid, "timeslot", clickedTimeslot.timeslotId)), { slotOne: "Available", slotTwo: "Available", slotThree: "Available" })
        .then(() => setToggleRerender((prevToggleRerender) => !prevToggleRerender))
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <button className="bg-white border border-gray-500 px-1 rounded fixed hover:bg-gray-300" style={{ left: clickedTimeslot.coor.x, top: clickedTimeslot.coor.y }} onClick={handleClick}>
      {contextmenuInfo.textIsClosed ? "Set to 'Closed'" : "Set to 'Available'"}
      {contextmenuInfo.textIsClosed ? <HiOutlineNoSymbol className="h-5 w-5 inline ml-2 mb-1 text-red-600" /> : <HiOutlineCheck className="h-5 w-5 inline ml-2 mb-1 text-green-600" />}
    </button>
  );
}

export default Gym;
