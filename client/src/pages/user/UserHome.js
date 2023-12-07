import { motion } from "framer-motion";
import UserAnnouncements from "../../components/user/announcements/UserAnnouncements";

function UserHome() {
    return (
        <motion.main className="bg-main-bg bg-cover overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="backdrop-blur-sm h-full w-full p-5 overflow-auto">
                <h1 className="text-4xl text-slate-700 font-semibold mb-4">Home</h1>
                <UserAnnouncements />
            </div>
        </motion.main>
    );
}

export default UserHome;
