import { motion } from "framer-motion";

function Home() {
  return (
    <motion.main className="p-5 bg-stone-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-xl font-semibold">Home</h1>
    </motion.main>
  );
}

export default Home;
