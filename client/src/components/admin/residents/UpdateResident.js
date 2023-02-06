import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";

function UpdateResident(props) {
  if (props.responseMessage) {
    return <p className="text-cyan-600 p-2 text-md bg-white mt-2 border-2 border-cyan-600 rounded">{props.responseMessage}</p>;
  } else {
    return (
      <motion.form
        className="text-md bg-white mt-2 border-2 border-cyan-600 rounded relative overflow-hidden"
        onSubmit={props.handleUpdateSubmit}
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
        <h2 className="font-semibold">Update a resident</h2>
        <input className="bg-stone-100 m-1 ml-0 border-2 w-full" type="text" name="firstName" placeholder="First Name" onChange={props.handleUpdateFormChange} value={props.clickedResidentInfo.residentObj.firstName} required={true} autoComplete="false"></input>
        <input className="bg-stone-100 m-1 ml-0 border-2 w-full" type="text" name="lastName" placeholder="Last Name" onChange={props.handleUpdateFormChange} value={props.clickedResidentInfo.residentObj.lastName} required={true} autoComplete="false"></input>
        <input className="bg-stone-100 m-1 ml-0 border-2 w-full" type="text" name="unit" placeholder="Unit" onChange={props.handleUpdateFormChange} value={props.clickedResidentInfo.residentObj.unit} required={true} autoComplete="false"></input>
        <button className="block bg-cyan-600 text-white py-0.5 px-3 rounded mt-2 hover:bg-cyan-700 transition">Update</button>
      </motion.form>
    );
  }
}

export default UpdateResident;
