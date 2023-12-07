import { motion } from "framer-motion";
import { useRef } from "react";

function UserGymCalendarDay({ dayId, singleGymScheduleTimeslot, setContextmenuInfo, setClickedTimeslot }) {
    const H1 = useRef(null);

    function handleContextmenu(e) {
        e.preventDefault();
        e.target.textContent === "Available" ? setContextmenuInfo({ isShown: true, textIsAvailable: true }) : setContextmenuInfo({ isShown: true, textIsAvailable: false });
        setClickedTimeslot({ coor: { x: e.clientX, y: e.clientY }, dayid: dayId, timeslotId: singleGymScheduleTimeslot.timeslotId, slot: e.target.dataset.slot });
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
            <h1 className="bg-slate-200 font-semibold" ref={H1}>
                {singleGymScheduleTimeslot.time}
            </h1>
            <p className={switchClass(singleGymScheduleTimeslot.slotOne)} onContextMenu={singleGymScheduleTimeslot.slotOne === "Closed" || singleGymScheduleTimeslot.slotOne === "Unavailable" ? undefined : handleContextmenu} data-slot="slotOne">
                {singleGymScheduleTimeslot.slotOne}
            </p>
            <p id="slotTwo" className={switchClass(singleGymScheduleTimeslot.slotTwo, true)} onContextMenu={singleGymScheduleTimeslot.slotOne === "Closed" || singleGymScheduleTimeslot.slotTwo === "Unavailable" ? undefined : handleContextmenu} data-slot="slotTwo">
                {singleGymScheduleTimeslot.slotTwo}
            </p>
            <p id="slotThree" className={switchClass(singleGymScheduleTimeslot.slotThree)} onContextMenu={singleGymScheduleTimeslot.slotOne === "Closed" || singleGymScheduleTimeslot.slotThree === "Unavailable" ? undefined : handleContextmenu} data-slot="slotThree">
                {singleGymScheduleTimeslot.slotThree}
            </p>
        </motion.div>
    );
}

function switchClass(text, isMiddle = false) {
    switch (text) {
        case "Closed":
        case "Unavailable":
            return "bg-gray-400";
        case "Available":
            return isMiddle ? "cursor-pointer bg-slate-100 hover:bg-slate-300" : "cursor-pointer hover:bg-slate-300";
        default:
            return isMiddle ? "font-bold underline cursor-pointer bg-slate-100 hover:bg-slate-300" : "font-bold underline cursor-pointer hover:bg-slate-300";
    }
}

export default UserGymCalendarDay;
