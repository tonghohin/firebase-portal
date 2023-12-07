import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import SpinningCircle from "../../SpinningCircle";
import GymCalendarDay from "./GymCalendarDay";

function GymCalendar({ sinlgeGymScheduleDay, toggleRerender, setContextmenuInfo, setClickedTimeslot }) {
    const [allGymScheduleTimeslots, setAllGymScheduleTimeslots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const template = [];
        getDocs(query(collection(db, "gym", sinlgeGymScheduleDay.dayId, "timeslot"), orderBy("order"))).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                template.push({ timeslotId: doc.id, ...doc.data() });
            });
            setAllGymScheduleTimeslots(template);
            setIsLoading(false);
        });
    }, [toggleRerender, sinlgeGymScheduleDay.dayId]);

    return isLoading ? (
        <SpinningCircle />
    ) : (
        <article className="text-center border border-neutral-200 overflow-hidden">
            <h1 className="font-semibold border-b border-neutral-400 py-2">{new Date(sinlgeGymScheduleDay.date.seconds * 1000).toDateString()}</h1>
            {allGymScheduleTimeslots && allGymScheduleTimeslots.map((timeslot) => <GymCalendarDay key={timeslot.timeslotId} dayId={sinlgeGymScheduleDay.dayId} singleGymScheduleTimeslot={timeslot} setContextmenuInfo={setContextmenuInfo} setClickedTimeslot={setClickedTimeslot} />)}
        </article>
    );
}

export default GymCalendar;
