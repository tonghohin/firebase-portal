import GymCalendarDay from "./GymCalendarDay";
import { useState, useEffect } from "react";
import { db } from "../../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function GymCalendar(props) {
  const [allGymScheduleTimeslots, setAllGymScheduleTimeslots] = useState([]);

  useEffect(() => {
    const template = [];
    getDocs(query(collection(db, "gym", props.sinlgeGymScheduleDay.dayId, "timeslot"), orderBy("order"))).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        template.push({ timeslotId: doc.id, ...doc.data() });
      });
      setAllGymScheduleTimeslots(template);
    });
  }, [props.toggleRerender, props.sinlgeGymScheduleDay.dayId]);

  return (
    <article className="text-center border border-stone-200 overflow-hidden">
      <h1 className="font-semibold border-b border-stone-400 py-2">{new Date(props.sinlgeGymScheduleDay.date.seconds * 1000).toDateString()}</h1>
      {allGymScheduleTimeslots.map((timeslot) => (
        <GymCalendarDay key={timeslot.timeslotId} dayId={props.sinlgeGymScheduleDay.dayId} singleGymScheduleTimeslot={timeslot} setContextmenuInfo={props.setContextmenuInfo} />
      ))}
    </article>
  );
}

export default GymCalendar;
