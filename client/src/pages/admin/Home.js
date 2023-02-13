import { motion } from "framer-motion";

function Home() {
  return (
    <motion.main className="bg-main-bg bg-cover overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="backdrop-blur-sm backdrop-contrast-50 h-full w-full p-5 overflow-auto">
        <h1 className="text-4xl text-gray-100 font-semibold">Home</h1>
      </div>
    </motion.main>
  );
}

export default Home;
