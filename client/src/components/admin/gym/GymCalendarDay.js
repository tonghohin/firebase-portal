import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { rightClicked } from "../../../features/gymSlice";
import { useRef } from "react";

function GymCalendarDay(props) {
  const dispatch = useDispatch();
  const P = useRef(null);

  function handleContextmenu(e) {
    e.preventDefault();
    P.current.textContent === "Closed" ? props.setContextmenuInfo({ isShown: true, textIsClosed: false }) : props.setContextmenuInfo({ isShown: true, textIsClosed: true });
    dispatch(rightClicked({ coor: { x: e.clientX, y: e.clientY }, dayid: props.dayId, timeslotId: props.singleGymScheduleTimeslot.timeslotId }));
  }

  return (
    <div
      className="overflow-hidden"
      initial={{
        opacity: 0,
        height: 0
      }}
      animate={{
        opacity: 1,
        height: "auto"
      }}
      transition={{
        duration: 1
      }}>
      <h1 className="bg-stone-200  font-semibold cursor-pointer hover:bg-stone-300" onContextMenu={handleContextmenu}>
        {props.singleGymScheduleTimeslot.time}
      </h1>
      <p className={switchClass(props.singleGymScheduleTimeslot.slotOne)} ref={P}>
        {props.singleGymScheduleTimeslot.slotOne}
      </p>
      <p className={switchClass(props.singleGymScheduleTimeslot.slotTwo, true)}>{props.singleGymScheduleTimeslot.slotTwo}</p>
      <p className={switchClass(props.singleGymScheduleTimeslot.slotThree)}>{props.singleGymScheduleTimeslot.slotThree}</p>
    </div>
  );
}

function switchClass(text, isMiddle = false) {
  switch (text) {
    case "Closed":
      return "bg-stone-400";
    case "Available":
      return isMiddle ? "bg-stone-100" : undefined;
    default:
      return isMiddle ? "bg-stone-100 font-semibold underline" : "font-semibold underline";
  }
}

export default GymCalendarDay;
