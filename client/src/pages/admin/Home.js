import { motion } from "framer-motion";

function Home() {
    return (
        <motion.main className="bg-main-bg bg-cover overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="backdrop-blur-sm backdrop-contrast-50 h-full w-full p-5 overflow-auto">
                <h1 className="text-4xl text-neutral-100 font-semibold mb-3">Home</h1>
                <section className="border-2 border-neutral-500 p-2 bg-neutral-100">
                    <h3 className="text-xl font-semibold">Welcome to the management portal for New Apartments!</h3>
                    <p>Here are what you can do as an admin:</p>
                    <ol className="list-decimal list-inside">
                        <li>Managing the resident database by adding, updating and deleting any residents</li>
                        <li>Managing gymroom schedule</li>
                        <li>Publishing anouncements to all the residents</li>
                        <li>Communicating with residents with private messages</li>
                    </ol>
                </section>
            </div>
        </motion.main>
    );
}

export default Home;
