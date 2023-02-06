import UserGymCalendarDay from "./UserGymCalendarDay";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";


function UserGymCalendar(props) {
  const userReducer = useSelector((store) => store.user);
  const [allGymScheduleTimeslots, setAllGymScheduleTimeslots] = useState([]);

  useEffect(() => {
    // doing a fetch here as data sanitization has to be done on the server side.
    fetch(`/gymcalendar/${props.sinlgeGymScheduleDay.dayId}/${userReducer.unit}`)
      .then((res) => res.json())
      .then((data) => {
        setAllGymScheduleTimeslots(data);
      });
  }, [props.toggleRerender, props.sinlgeGymScheduleDay.dayId, userReducer.unit]);

  return (
    <motion.article
      className="text-center border"
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      transition={{
        duration: 1
      }}>
      <h1 className="font-semibold border-b border-gray-400 py-2">{new Date(props.sinlgeGymScheduleDay.date.seconds * 1000).toDateString()}</h1>
      {allGymScheduleTimeslots.map((timeslot) => (
        <UserGymCalendarDay key={timeslot.timeslotId} dayId={props.sinlgeGymScheduleDay.dayId} singleGymScheduleTimeslot={timeslot} setContextmenuInfo={props.setContextmenuInfo} />
      ))}
    </motion.article>
  );
}

export default UserGymCalendar;
