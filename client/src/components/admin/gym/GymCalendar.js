import GymCalendarDay from "./GymCalendarDay";
import { useState, useEffect } from "react";
import { db } from "../../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function GymCalendar({ sinlgeGymScheduleDay, toggleRerender, setContextmenuInfo, setClickedTimeslot }) {
  const [allGymScheduleTimeslots, setAllGymScheduleTimeslots] = useState([]);

  useEffect(() => {
    const template = [];
    getDocs(query(collection(db, "gym", sinlgeGymScheduleDay.dayId, "timeslot"), orderBy("order"))).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        template.push({ timeslotId: doc.id, ...doc.data() });
      });
      setAllGymScheduleTimeslots(template);
    });
  }, [toggleRerender, sinlgeGymScheduleDay.dayId]);

  return (
    <article className="text-center border border-stone-200 overflow-hidden">
      <h1 className="font-semibold border-b border-stone-400 py-2">{new Date(sinlgeGymScheduleDay.date.seconds * 1000).toDateString()}</h1>
      {allGymScheduleTimeslots.map((timeslot) => (
        <GymCalendarDay key={timeslot.timeslotId} dayId={sinlgeGymScheduleDay.dayId} singleGymScheduleTimeslot={timeslot} setContextmenuInfo={setContextmenuInfo} setClickedTimeslot={setClickedTimeslot} />
      ))}
    </article>
  );
}

export default GymCalendar;
