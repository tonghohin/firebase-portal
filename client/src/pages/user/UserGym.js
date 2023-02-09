import { motion } from "framer-motion";
import { HiOutlineArrowUturnRight } from "react-icons/hi2";
import { HiOutlineCheck } from "react-icons/hi2";
import { useState, useEffect } from "react";
import UserGymCalendar from "../../components/user/gym/UserGymCalendar";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { collection, getDocs, doc, updateDoc, query, orderBy, limit } from "firebase/firestore";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase/config";

function UserGym() {
  const [allGymScheduleDays, setAllGymScheduleDays] = useState([]);
  const [toggleRerender, setToggleRerender] = useState(false);
  const [contextmenuInfo, setContextmenuInfo] = useState({ isShown: false, textIsAvailable: true });

  useEffect(() => {
    window.addEventListener("click", () => {
      setContextmenuInfo({ isShown: false, textIsClosed: true });
    });
  }, []);

  useEffect(() => {
    const template = [];

    getDocs(query(collection(db, "gym"), orderBy("date"), limit(5))).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        template.push({ dayId: doc.id, ...doc.data() });
      });
      setAllGymScheduleDays(template);
    });
  }, [toggleRerender]);

  return (
    <>
      <motion.main className="bg-main-bg bg-cover overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="backdrop-blur-sm h-full w-full p-5 overflow-auto">
          <h1 className="text-4xl text-slate-700 font-semibold mb-4">Gymroom Schedule</h1>
          <section className="grid grid-cols-5 bg-white rounded border-2">
            {allGymScheduleDays.map((day) => (
              <UserGymCalendar key={day.dayId} sinlgeGymScheduleDay={day} toggleRerender={toggleRerender} setContextmenuInfo={setContextmenuInfo} />
            ))}
          </section>
        </div>
      </motion.main>
      {contextmenuInfo.isShown && <Contextmenu contextmenuInfo={contextmenuInfo} setToggleRerender={setToggleRerender} />}
    </>
  );
}

function Contextmenu({ contextmenuInfo, setToggleRerender }) {
  const userReducer = useSelector((store) => store.user);
  const userGymReducer = useSelector((store) => store.userGym);

  function handleClick() {
    if (contextmenuInfo.textIsAvailable) {
      updateDoc(query(doc(db, "gym", userGymReducer.dayid, "timeslot", userGymReducer.timeslotId)), { [userGymReducer.slot]: userReducer.unit })
        .then(() => setToggleRerender((prevToggleRerender) => !prevToggleRerender))
        .catch((err) => {
          console.log(err);
        });
    } else {
      updateDoc(query(doc(db, "gym", userGymReducer.dayid, "timeslot", userGymReducer.timeslotId)), { [userGymReducer.slot]: "Available" })
        .then(() => setToggleRerender((prevToggleRerender) => !prevToggleRerender))
        .catch((err) => {
          console.log(err);
        });
    }
    logEvent(analytics, "click_gym", {
      content_type: "click_gym",
      content_id: "P12453"
    });
  }
  return (
    <button className="bg-white border border-slate-500 px-1 rounded fixed hover:bg-slate-300" style={{ left: userGymReducer.coor.x, top: userGymReducer.coor.y }} onClick={handleClick}>
      {contextmenuInfo.textIsAvailable ? "Register" : "De-register"}
      {contextmenuInfo.textIsAvailable ? <HiOutlineCheck className="h-5 w-5 inline ml-2 mb-1 text-green-600" /> : <HiOutlineArrowUturnRight className="h-5 w-5 inline ml-2 mb-1 text-red-600" />}
    </button>
  );
}

export default UserGym;
