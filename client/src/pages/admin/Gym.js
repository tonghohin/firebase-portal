import { collection, doc, getDocs, limit, orderBy, query, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiOutlineCheck, HiOutlineNoSymbol } from "react-icons/hi2";
import SpinningCircle from "../../components/SpinningCircle";
import GymCalendar from "../../components/admin/gym/GymCalendar";
import { db } from "../../firebase/config";

function Gym() {
    const [allGymScheduleDays, setAllGymScheduleDays] = useState([]);
    const [toggleRerender, setToggleRerender] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [contextmenuInfo, setContextmenuInfo] = useState({ isShown: false, textIsClosed: true });
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
            setAllGymScheduleDays(template);
            setIsLoading(false);
        });
    }, [toggleRerender]);

    return (
        <>
            <motion.main className="bg-main-bg bg-cover overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <div className="backdrop-blur-sm backdrop-contrast-50 h-full w-full p-5 overflow-auto">
                    <h1 className="text-4xl text-neutral-100 font-semibold mb-4">Gymroom Schedule</h1>
                    {isLoading ? <SpinningCircle /> : <section className="grid grid-cols-7 bg-white rounded border-2 border-neutral-500 overflow-hidden">{allGymScheduleDays && allGymScheduleDays.map((day) => <GymCalendar key={day.dayId} sinlgeGymScheduleDay={day} toggleRerender={toggleRerender} setContextmenuInfo={setContextmenuInfo} setClickedTimeslot={setClickedTimeslot} />)}</section>}
                </div>
            </motion.main>
            {contextmenuInfo.isShown && <Contextmenu contextmenuInfo={contextmenuInfo} setToggleRerender={setToggleRerender} clickedTimeslot={clickedTimeslot} />}
        </>
    );
}

function Contextmenu({ contextmenuInfo, setToggleRerender, clickedTimeslot }) {
    function handleClick() {
        if (contextmenuInfo.textIsClosed) {
            updateDoc(query(doc(db, "gym", clickedTimeslot.dayid, "timeslot", clickedTimeslot.timeslotId)), { slotOne: "Closed", slotTwo: "Closed", slotThree: "Closed" })
                .then(() => setToggleRerender((prevToggleRerender) => !prevToggleRerender))
                .catch((err) => {
                    console.log(err);
                });
        } else {
            updateDoc(query(doc(db, "gym", clickedTimeslot.dayid, "timeslot", clickedTimeslot.timeslotId)), { slotOne: "Available", slotTwo: "Available", slotThree: "Available" })
                .then(() => setToggleRerender((prevToggleRerender) => !prevToggleRerender))
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    return (
        <button className="bg-white border border-neutral-500 px-1 rounded fixed hover:bg-neutral-300" style={{ left: clickedTimeslot.coor.x, top: clickedTimeslot.coor.y }} onClick={handleClick}>
            {contextmenuInfo.textIsClosed ? "Set to 'Closed'" : "Set to 'Available'"}
            {contextmenuInfo.textIsClosed ? <HiOutlineNoSymbol className="h-5 w-5 inline ml-2 mb-1 text-red-600" /> : <HiOutlineCheck className="h-5 w-5 inline ml-2 mb-1 text-green-600" />}
        </button>
    );
}

export default Gym;
