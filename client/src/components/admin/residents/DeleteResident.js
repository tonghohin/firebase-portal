import { motion } from "framer-motion";
import { HiXMark } from "react-icons/hi2";

function DeleteResident({ clickedResidentInfo, responseMessage, handleContextmenuClose, handleDeleteClick }) {
  if (responseMessage) {
    return <p className="text-red-600 p-2 text-md bg-white mt-2 border-2 border-cyan-600 rounded">{responseMessage}</p>;
  } else {
    return (
      <motion.section
        className="text-md bg-white mt-2 border-2 border-cyan-600 rounded relative overflow-hidden"
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
        <h2 className="font-semibold">Delete a resident</h2>
        <HiXMark className="cursor-pointer absolute right-2 top-2 h-5 w-5 text-stone-600 hover:bg-stone-300 transition" onClick={handleContextmenuClose} />
        <p>
          Name: {clickedResidentInfo.residentObj.firstName} {clickedResidentInfo.residentObj.lastName}
        </p>
        <p>Unit: {clickedResidentInfo.residentObj.unit}</p>
        <button className="block bg-red-600 text-white py-0.5 px-3 rounded mt-2 hover:bg-red-700 transition" onClick={handleDeleteClick}>
          Delete
        </button>
      </motion.section>
    );
  }
}

export default DeleteResident;
