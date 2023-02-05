import { motion } from "framer-motion";
import UserAnnouncements from "../../components/user/announcements/UserAnnouncements";

function UserHome() {
  return (
    <motion.main className="p-5 bg-gray-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-xl font-semibold">Home</h1>
      <UserAnnouncements />
    </motion.main>
  );
}

export default UserHome;
