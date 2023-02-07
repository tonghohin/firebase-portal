import { motion } from "framer-motion";
import { ArrowUturnRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import UserGymCalendar from "../../components/user/gym/UserGymCalendar";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { collection, getDocs, doc, updateDoc, query, orderBy } from "firebase/firestore";

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

    getDocs(query(collection(db, "gym"), orderBy("date")))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          template.push({ dayId: doc.id, ...doc.data() });
        });
        setAllGymScheduleDays(template);
      })
  }, [toggleRerender]);

  return (
    <>
      <motion.main className="p-5 bg-gray-100 overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-xl font-semibold">Gymroom Schedule</h1>
        <section className="grid grid-cols-5 bg-white rounded border-2">
          {allGymScheduleDays.map((day) => (
            <UserGymCalendar key={day.dayId} sinlgeGymScheduleDay={day} toggleRerender={toggleRerender} setContextmenuInfo={setContextmenuInfo} />
          ))}
        </section>
      </motion.main>
      {contextmenuInfo.isShown && <Contextmenu contextmenuInfo={contextmenuInfo} setToggleRerender={setToggleRerender} />}
    </>
  );
}

function Contextmenu(props) {
  const userReducer = useSelector((store) => store.user);
  const userGymReducer = useSelector((store) => store.userGym);

  function handleClick() {
    if (props.contextmenuInfo.textIsAvailable) {
      updateDoc(query(doc(db, "gym", userGymReducer.dayid, "timeslot", userGymReducer.timeslotId)), { [userGymReducer.slot]: userReducer.unit })
        .then(props.setToggleRerender((prevToggleRerender) => !prevToggleRerender))
        .catch((err) => {
          console.log(err);
        });
    } else {
      updateDoc(query(doc(db, "gym", userGymReducer.dayid, "timeslot", userGymReducer.timeslotId)), { [userGymReducer.slot]: "Available" })
        .then(() => {
          props.setToggleRerender((prevToggleRerender) => !prevToggleRerender);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <button className="bg-white border border-slate-500 px-1 rounded fixed hover:bg-slate-300" style={{ left: userGymReducer.coor.x, top: userGymReducer.coor.y }} onClick={handleClick}>
      {props.contextmenuInfo.textIsAvailable ? "Register" : "De-register"}
      {props.contextmenuInfo.textIsAvailable ? <CheckIcon className="h-5 w-5 inline ml-2 mb-1 text-green-600" /> : <ArrowUturnRightIcon className="h-5 w-5 inline ml-2 mb-1 text-red-600" />}
    </button>
  );
}

export default UserGym;
