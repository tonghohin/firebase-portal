import { motion } from "framer-motion";
import { HiXMark } from "react-icons/hi2";

function UpdateResident({ clickedResidentInfo, handleUpdateFormChange, responseMessage, handleContextmenuClose, handleUpdateSubmit }) {
  return responseMessage ? (
    <p className="text-green-700 p-2 text-md bg-white mt-2 border-2 border-green-700 rounded">{responseMessage}</p>
  ) : (
    <motion.form
      className="text-md bg-white mt-2 border-2 border-green-700 rounded relative overflow-hidden"
      onSubmit={handleUpdateSubmit}
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
      <h2 className="font-semibold">Update a resident</h2>
      <HiXMark className="cursor-pointer absolute right-2 top-2 h-5 w-5 text-stone-600 hover:bg-stone-300 transition" onClick={handleContextmenuClose} />
      <input className="bg-stone-100 m-1 ml-0 border-2 w-full" type="text" name="firstName" placeholder="First Name" onChange={handleUpdateFormChange} value={clickedResidentInfo.residentObj.firstName} required={true} autoComplete="false"></input>
      <input className="bg-stone-100 m-1 ml-0 border-2 w-full" type="text" name="lastName" placeholder="Last Name" onChange={handleUpdateFormChange} value={clickedResidentInfo.residentObj.lastName} required={true} autoComplete="false"></input>
      <input className="bg-stone-100 m-1 ml-0 border-2 w-full" type="text" name="unit" placeholder="Unit" onChange={handleUpdateFormChange} value={clickedResidentInfo.residentObj.unit} required={true} autoComplete="false"></input>
      <input className="bg-stone-100 m-1 ml-0 border-2 w-full" type="text" name="email" placeholder="Email" onChange={handleUpdateFormChange} value={clickedResidentInfo.residentObj.email} required={true} autoComplete="false"></input>
      <button className="block bg-green-700 text-white py-0.5 px-3 rounded mt-2 hover:bg-green-800 transition">Update</button>
    </motion.form>
  );
}

export default UpdateResident;
