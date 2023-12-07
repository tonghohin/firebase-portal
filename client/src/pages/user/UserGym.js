import { logEvent } from "firebase/analytics";
import { collection, doc, getDocs, limit, orderBy, query, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiOutlineArrowUturnRight, HiOutlineCheck } from "react-icons/hi2";
import SpinningCircle from "../../components/SpinningCircle";
import UserGymCalendar from "../../components/user/gym/UserGymCalendar";
import { useAuth } from "../../firebase/AuthContextProvider";
import { analytics, db } from "../../firebase/config";

function UserGym() {
    const [allGymScheduleDays, setAllGymScheduleDays] = useState([]);
    const [toggleRerender, setToggleRerender] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [contextmenuInfo, setContextmenuInfo] = useState({ isShown: false, textIsAvailable: true });
    const [clickedTimeslot, setClickedTimeslot] = useState({ coor: { x: "", y: "" }, dayid: "", timeslotId: "", slot: "" });

    useEffect(() => {
        window.addEventListener("click", () => {
            setContextmenuInfo({ isShown: false, textIsClosed: true });
        });
    }, []);

    useEffect(() => {
        const template = [];

        getDocs(query(collection(db, "gym"), orderBy("date", "desc"), limit(7))).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                template.unshift({ dayId: doc.id, ...doc.data() });
            });
            setAllGymScheduleDays(template.slice(0, 5));
            setIsLoading(false);
        });
    }, [toggleRerender]);

    return (
        <>
            <motion.main className="bg-main-bg bg-cover overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <div className="backdrop-blur-sm h-full w-full p-5 overflow-auto">
                    <h1 className="text-4xl text-slate-700 font-semibold mb-4">Gymroom Schedule</h1>
                    {isLoading ? (
                        <SpinningCircle />
                    ) : (
                        <section className="grid grid-cols-5 bg-white rounded border-2 border-cyan-600">
                            {allGymScheduleDays.map((day) => (
                                <UserGymCalendar key={day.dayId} sinlgeGymScheduleDay={day} toggleRerender={toggleRerender} setContextmenuInfo={setContextmenuInfo} setClickedTimeslot={setClickedTimeslot} />
                            ))}
                        </section>
                    )}
                </div>
            </motion.main>
            {contextmenuInfo.isShown && <Contextmenu contextmenuInfo={contextmenuInfo} setToggleRerender={setToggleRerender} clickedTimeslot={clickedTimeslot} />}
        </>
    );
}

function Contextmenu({ contextmenuInfo, setToggleRerender, clickedTimeslot }) {
    const user = useAuth();

    function handleClick() {
        if (contextmenuInfo.textIsAvailable) {
            updateDoc(query(doc(db, "gym", clickedTimeslot.dayid, "timeslot", clickedTimeslot.timeslotId)), { [clickedTimeslot.slot]: user.unit })
                .then(() => setToggleRerender((prevToggleRerender) => !prevToggleRerender))
                .catch((err) => {
                    console.log(err);
                });
        } else {
            updateDoc(query(doc(db, "gym", clickedTimeslot.dayid, "timeslot", clickedTimeslot.timeslotId)), { [clickedTimeslot.slot]: "Available" })
                .then(() => setToggleRerender((prevToggleRerender) => !prevToggleRerender))
                .catch((err) => {
                    console.log(err);
                });
        }
        logEvent(analytics, "click_gym", {
            content_type: "click_gym",
            content_id: "P12453"
        });
    }
    return (
        <button className="bg-white border border-slate-500 px-1 rounded fixed hover:bg-slate-300" style={{ left: clickedTimeslot.coor.x, top: clickedTimeslot.coor.y }} onClick={handleClick}>
            {contextmenuInfo.textIsAvailable ? "Register" : "De-register"}
            {contextmenuInfo.textIsAvailable ? <HiOutlineCheck className="h-5 w-5 inline ml-2 mb-1 text-green-600" /> : <HiOutlineArrowUturnRight className="h-5 w-5 inline ml-2 mb-1 text-red-600" />}
        </button>
    );
}

export default UserGym;
