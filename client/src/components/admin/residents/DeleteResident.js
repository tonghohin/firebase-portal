import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";

function DeleteResident(props) {
  if (props.responseMessage) {
    return <p className="text-red-600 p-2 text-md bg-white mt-2 border-2 border-cyan-600 rounded">{props.responseMessage}</p>;
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
        <XMarkIcon className="cursor-pointer h-5 w-5 text-stone-600 absolute right-0 top-0 hover:bg-stone-300 transition" onClick={props.handleContextmenuClose} />
        <h2 className="font-semibold">Delete a resident</h2>
        <p>
          Name: {props.clickedResidentInfo.residentObj.firstName} {props.clickedResidentInfo.residentObj.lastName}
        </p>
        <p>Unit: {props.clickedResidentInfo.residentObj.unit}</p>
        <button className="block bg-red-600 text-white py-0.5 px-3 rounded mt-2 hover:bg-red-700 transition" onClick={props.handleDeleteClick}>
          Delete
        </button>
      </motion.section>
    );
  }
}

export default DeleteResident;
