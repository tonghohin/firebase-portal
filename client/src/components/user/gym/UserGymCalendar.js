import { useEffect, useState } from "react";
import { useAuth } from "../../../firebase/AuthContextProvider";
import SpinningCircle from "../../SpinningCircle";
import UserGymCalendarDay from "./UserGymCalendarDay";

import { motion } from "framer-motion";

function UserGymCalendar({ sinlgeGymScheduleDay, toggleRerender, setContextmenuInfo, setClickedTimeslot }) {
    const user = useAuth();
    const [allGymScheduleTimeslots, setAllGymScheduleTimeslots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // doing a fetch here as data sanitization has to be done on the server side.
        fetch(`/gymcalendar/${sinlgeGymScheduleDay.dayId}/${user.unit}`)
            .then((res) => res.json())
            .then((data) => {
                setAllGymScheduleTimeslots(data);
                setIsLoading(false);
            });
    }, [toggleRerender, sinlgeGymScheduleDay.dayId, user.unit]);

    return isLoading ? (
        <SpinningCircle />
    ) : (
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
            <h1 className="font-semibold border-b border-gray-400 py-2">{new Date(sinlgeGymScheduleDay.date.seconds * 1000).toDateString()}</h1>
            {allGymScheduleTimeslots && allGymScheduleTimeslots.map((timeslot) => <UserGymCalendarDay key={timeslot.timeslotId} dayId={sinlgeGymScheduleDay.dayId} singleGymScheduleTimeslot={timeslot} setContextmenuInfo={setContextmenuInfo} setClickedTimeslot={setClickedTimeslot} />)}
        </motion.article>
    );
}

export default UserGymCalendar;
