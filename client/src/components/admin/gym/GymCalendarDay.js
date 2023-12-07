import { motion } from "framer-motion";
import { useRef } from "react";

function GymCalendarDay({ dayId, singleGymScheduleTimeslot, setContextmenuInfo, setClickedTimeslot }) {
    const P = useRef(null);

    function handleContextmenu(e) {
        e.preventDefault();
        P.current.textContent === "Closed" ? setContextmenuInfo({ isShown: true, textIsClosed: false }) : setContextmenuInfo({ isShown: true, textIsClosed: true });
        setClickedTimeslot({ coor: { x: e.clientX, y: e.clientY }, dayid: dayId, timeslotId: singleGymScheduleTimeslot.timeslotId });
    }

    return (
        <motion.div
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
            <h1 className="bg-neutral-200  font-semibold cursor-pointer hover:bg-neutral-300" onContextMenu={handleContextmenu}>
                {singleGymScheduleTimeslot.time}
            </h1>
            <p className={switchClass(singleGymScheduleTimeslot.slotOne)} ref={P}>
                {singleGymScheduleTimeslot.slotOne}
            </p>
            <p className={switchClass(singleGymScheduleTimeslot.slotTwo, true)}>{singleGymScheduleTimeslot.slotTwo}</p>
            <p className={switchClass(singleGymScheduleTimeslot.slotThree)}>{singleGymScheduleTimeslot.slotThree}</p>
        </motion.div>
    );
}

function switchClass(text, isMiddle = false) {
    switch (text) {
        case "Closed":
            return "bg-neutral-400";
        case "Available":
            return isMiddle ? "bg-neutral-100" : undefined;
        default:
            return isMiddle ? "bg-neutral-100 font-semibold underline" : "font-semibold underline";
    }
}

export default GymCalendarDay;
