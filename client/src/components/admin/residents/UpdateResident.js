import { motion } from "framer-motion";
import { HiOutlinePencilSquare, HiXMark } from "react-icons/hi2";

function UpdateResident({ clickedResidentInfo, handleUpdateFormChange, responseMessage, handleContextmenuClose, handleUpdateSubmit }) {
    return responseMessage ? (
        <p className="text-green-700 p-2 text-md bg-white mt-2 border-2 border-green-700 rounded">{responseMessage}</p>
    ) : (
        <motion.form
            className="text-md bg-white mt-2 border-2 border-green-700 rounded overflow-hidden"
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
            <h2 className="font-semibold flex justify-between">
                Update a resident
                <HiXMark className="cursor-pointer h-5 w-5 rounded text-neutral-600 hover:bg-neutral-300 transition" onClick={handleContextmenuClose} />
            </h2>
            <input className="bg-neutral-100 m-1 ml-0 border-2 w-full" type="text" name="firstName" placeholder="First Name" onChange={handleUpdateFormChange} value={clickedResidentInfo.residentObj.firstName} required={true} autoComplete="false"></input>
            <input className="bg-neutral-100 m-1 ml-0 border-2 w-full" type="text" name="lastName" placeholder="Last Name" onChange={handleUpdateFormChange} value={clickedResidentInfo.residentObj.lastName} required={true} autoComplete="false"></input>
            <input className="bg-neutral-100 m-1 ml-0 border-2 w-full" type="text" name="unit" placeholder="Unit" onChange={handleUpdateFormChange} value={clickedResidentInfo.residentObj.unit} required={true} autoComplete="false"></input>
            <input className="bg-neutral-100 m-1 ml-0 border-2 w-full" type="text" name="email" placeholder="Email" onChange={handleUpdateFormChange} value={clickedResidentInfo.residentObj.email} required={true} autoComplete="false"></input>
            <button className="flex items-center gap-2 bg-green-700 text-white py-0.5 px-3 rounded mt-2 hover:bg-green-800 transition">
                Update
                <HiOutlinePencilSquare className="h-5 w-5 inline" />
            </button>
        </motion.form>
    );
}

export default UpdateResident;
