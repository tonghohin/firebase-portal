import { motion } from "framer-motion";
import { HiOutlineUserMinus, HiXMark } from "react-icons/hi2";

function DeleteResident({ clickedResidentInfo, responseMessage, handleContextmenuClose, handleDeleteClick }) {
    return responseMessage ? (
        <p className="text-red-800 p-2 text-md bg-white mt-2 border-2 border-red-800 rounded">{responseMessage}</p>
    ) : (
        <motion.section
            className="text-md bg-white mt-2 border-2 border-red-800 rounded overflow-hidden"
            initial={{
                height: 0
            }}
            animate={{
                height: "auto",
                padding: "0.5rem"
            }}
            transition={{
                height: { duration: 0.5 },
                padding: { duration: 0 }
            }}>
            <h2 className="font-semibold flex justify-between">
                Delete a resident
                <HiXMark className="cursor-pointer h-5 w-5 rounded text-neutral-600 hover:bg-neutral-300 transition" onClick={handleContextmenuClose} />
            </h2>
            <p>
                Name: {clickedResidentInfo.residentObj.firstName} {clickedResidentInfo.residentObj.lastName}
            </p>
            <p>Unit: {clickedResidentInfo.residentObj.unit}</p>
            <button className="flex items-center gap-2 bg-red-600 text-white py-0.5 px-3 rounded mt-2 hover:bg-red-700 transition" onClick={handleDeleteClick}>
                Delete
                <HiOutlineUserMinus className="h-5 w-5 text-white inline" />
            </button>
        </motion.section>
    );
}

export default DeleteResident;
