import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import GymCalendar from "../../components/admin/gym/GymCalendar";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { collection, getDocs, doc, updateDoc, query, orderBy } from "firebase/firestore";

function Gym() {
  const [allGymScheduleDays, setAllGymScheduleDays] = useState([]);
  const [toggleRerender, setToggleRerender] = useState(false);
  const [contextmenuInfo, setContextmenuInfo] = useState({ isShown: false, textIsClosed: true });

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
      setAllGymScheduleDays(template);
    });
  }, [toggleRerender]);

  return (
    <>
      <main className="p-5 bg-stone-100 overflow-auto">
        <h1 className="text-xl font-semibold">Gymroom Schedule</h1>
        <section className="grid grid-cols-5 bg-white rounded border-2 border-stone-200">
          {allGymScheduleDays.map((day) => (
            <GymCalendar key={day.dayId} sinlgeGymScheduleDay={day} toggleRerender={toggleRerender} setContextmenuInfo={setContextmenuInfo} />
          ))}
        </section>
      </main>
      {contextmenuInfo.isShown && <Contextmenu contextmenuInfo={contextmenuInfo} setToggleRerender={setToggleRerender} />}
    </>
  );
}

function Contextmenu(props) {
  const gymReducer = useSelector((store) => store.gym);

  function handleClick(e) {
    if (props.contextmenuInfo.textIsClosed) {
      updateDoc(query(doc(db, "gym", gymReducer.dayid, "timeslot", gymReducer.timeslotId)), { slotOne: "Closed", slotTwo: "Closed", slotThree: "Closed" })
        .then(props.setToggleRerender((prevToggleRerender) => !prevToggleRerender))
        .catch((err) => {
          console.log(err);
        });
    } else {
      updateDoc(query(doc(db, "gym", gymReducer.dayid, "timeslot", gymReducer.timeslotId)), { slotOne: "Available", slotTwo: "Available", slotThree: "Available" })
        .then(() => {
          props.setToggleRerender((prevToggleRerender) => !prevToggleRerender);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <button className="bg-white border border-stone-500 px-1 rounded fixed hover:bg-stone-300" style={{ left: gymReducer.coor.x, top: gymReducer.coor.y }} onClick={handleClick}>
      {props.contextmenuInfo.textIsClosed ? "Set to 'Closed'" : "Set to 'Available'"}
      {props.contextmenuInfo.textIsClosed ? <NoSymbolIcon className="h-5 w-5 inline ml-2 mb-1 text-red-600" /> : <CheckIcon className="h-5 w-5 inline ml-2 mb-1 text-green-600" />}
    </button>
  );
}

export default Gym;
