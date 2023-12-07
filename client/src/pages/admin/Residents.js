import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiOutlineArrowDownTray, HiOutlineArrowsUpDown, HiOutlinePencilSquare, HiOutlineUserMinus } from "react-icons/hi2";
import * as XLSX from "xlsx";
import AddResident from "../../components/admin/residents/AddResident";
import DeleteResident from "../../components/admin/residents/DeleteResident";
import UpdateResident from "../../components/admin/residents/UpdateResident";
import { db } from "../../firebase/config";

function Residents() {
    const [allResidents, setAllResidents] = useState([]);
    const [toggleRerender, setToggleRerender] = useState(false);
    const [contextmenuIsShown, setContextmenuIsShown] = useState(false);
    const [clickedResidentInfo, setClickedResidentInfo] = useState({ id: "", uid: "", coor: { x: 0, y: 0 }, residentObj: {} });
    const [updateFormOrDeleteFormIsShown, setUpdateFormOrDeleteFormIsShown] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    useEffect(() => {
        const template = [];

        getDocs(collection(db, "residents")).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                template.push({ id: doc.id, ...doc.data() });
            });
            setAllResidents(template);
        });
    }, [toggleRerender]);

    useEffect(() => {
        window.addEventListener("click", () => {
            setContextmenuIsShown(false);
        });
    }, []);

    function handleSorting(e) {
        switch (e.currentTarget.dataset.column) {
            case "firstName":
                setAllResidents((prevAllResidents) => [...prevAllResidents.sort((a, b) => a.firstName.localeCompare(b.firstName))]);
                break;
            case "lastName":
                setAllResidents((prevAllResidents) => [...prevAllResidents.sort((a, b) => a.lastName.localeCompare(b.lastName))]);
                break;
            case "unit":
                setAllResidents((prevAllResidents) => [...prevAllResidents.sort((a, b) => a.unit - b.unit)]);
                break;
            case "email":
                setAllResidents((prevAllResidents) => [...prevAllResidents.sort((a, b) => a.email.localeCompare(b.email))]);
                break;
            case "uid":
                setAllResidents((prevAllResidents) => [...prevAllResidents.sort((a, b) => a.uid.localeCompare(b.uid))]);
                break;
            default:
                return;
        }
    }

    function handleContextmenu(e) {
        e.preventDefault();
        setClickedResidentInfo({ ...clickedResidentInfo, id: e.currentTarget.id, uid: e.currentTarget.dataset.uid, coor: { x: e.clientX, y: e.clientY } });
        setContextmenuIsShown(true);
    }

    function handleContextmenuClick(e) {
        if (e.currentTarget.textContent === "Update") {
            setUpdateFormOrDeleteFormIsShown("Update");
        } else if (e.currentTarget.textContent === "Delete") {
            setUpdateFormOrDeleteFormIsShown("Delete");
        }
        setClickedResidentInfo({ ...clickedResidentInfo, residentObj: allResidents.filter((resident) => resident.id === clickedResidentInfo.id)[0] });
        setResponseMessage("");
    }

    function handleContextmenuClose() {
        setUpdateFormOrDeleteFormIsShown("");
    }

    function handleUpdateFormChange(e) {
        setClickedResidentInfo({ ...clickedResidentInfo, residentObj: { ...clickedResidentInfo.residentObj, [e.target.name]: e.target.value } });
    }

    function handleUpdateSubmit(e) {
        e.preventDefault();

        // update Firestore
        updateDoc(doc(db, "residents", clickedResidentInfo.id), clickedResidentInfo.residentObj)
            .then(() => {
                setClickedResidentInfo({ id: "", uid: "", coor: { x: 0, y: 0 }, residentObj: {} });
                setResponseMessage("The resident has been edited.");
                setToggleRerender((prevToggleRerender) => !prevToggleRerender);
            })
            .catch((err) => {
                console.log(err);
            });

        // update auth
        fetch(`/admin/resident/${clickedResidentInfo.uid}`, {
            method: "PUT",
            body: JSON.stringify({ unit: clickedResidentInfo.residentObj.unit }),
            headers: {
                "Content-type": "application/json"
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleDeleteClick() {
        // delete Firestore
        deleteDoc(doc(db, "residents", clickedResidentInfo.id))
            .then(() => {
                setResponseMessage("The resident is deleted.");
                setToggleRerender((prevToggleRerender) => !prevToggleRerender);
            })
            .catch((err) => {
                console.log(err);
            });

        // delete auth
        fetch(`/admin/resident/${clickedResidentInfo.uid}`, { method: "DELETE" }).catch((err) => {
            console.log(err);
        });
    }

    function handleExportClick() {
        const worksheet = XLSX.utils.json_to_sheet(allResidents);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Residents");
        XLSX.writeFile(workbook, "Residents.csv");
    }

    return (
        <>
            <motion.main className="bg-main-bg bg-cover overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <div className="backdrop-blur-sm backdrop-contrast-50 h-full w-full p-5 overflow-auto">
                    <nav className="flex justify-between mb-4">
                        <h1 className="text-4xl text-neutral-100 font-semibold">Residents</h1>
                        <button className="bg-green-700 flex items-center gap-2 text-white py-0.5 px-3 rounded hover:bg-green-800 transition" onClick={handleExportClick}>
                            Export
                            <HiOutlineArrowDownTray className="h-5 w-5 text-white inline" />
                        </button>
                    </nav>
                    <div className="bg-white w-full rounded border-2 border-neutral-500 mb-4 overflow-auto">
                        <table className="w-full overflow-auto">
                            <thead>
                                <tr className="text-left">
                                    <th className="py-2">
                                        First Name
                                        <button onClick={handleSorting} data-column="firstName">
                                            <HiOutlineArrowsUpDown className="h-5 w-5 inline cursor-pointer p-0.5 ml-1 text-neutral-600 rounded hover:bg-neutral-200" />
                                        </button>
                                    </th>
                                    <th className="py-2">
                                        Last Name
                                        <button onClick={handleSorting} data-column="lastName">
                                            <HiOutlineArrowsUpDown className="h-5 w-5 inline cursor-pointer p-0.5 ml-1 text-neutral-600 rounded hover:bg-neutral-200" />
                                        </button>
                                    </th>
                                    <th className="py-2">
                                        Unit
                                        <button onClick={handleSorting} data-column="unit">
                                            <HiOutlineArrowsUpDown className="h-5 w-5 inline cursor-pointer p-0.5 ml-1 text-neutral-600 rounded hover:bg-neutral-200" />
                                        </button>
                                    </th>
                                    <th className="py-2">
                                        Email
                                        <button onClick={handleSorting} data-column="email">
                                            <HiOutlineArrowsUpDown className="h-5 w-5 inline cursor-pointer p-0.5 ml-1 text-neutral-600 rounded hover:bg-neutral-200" />
                                        </button>
                                    </th>
                                    <th className="py-2">
                                        UID
                                        <button onClick={handleSorting} data-column="uid">
                                            <HiOutlineArrowsUpDown className="h-5 w-5 inline cursor-pointer p-0.5 ml-1 text-neutral-600 rounded hover:bg-neutral-200" />
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {allResidents.map((resident) => (
                                    <tr key={resident.id} id={resident.id} data-uid={resident.uid} className="odd:bg-neutral-200 even:bg-neutral-50 first:border-t border-neutral-400 hover:bg-neutral-300 cursor-pointer" onContextMenu={handleContextmenu}>
                                        <td>{resident.firstName}</td>
                                        <td>{resident.lastName}</td>
                                        <td>{resident.unit}</td>
                                        <td>{resident.email}</td>
                                        <td>{resident.uid}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <section className="grid grid-cols-2 gap-2">
                        <AddResident setToggleRerender={setToggleRerender} setUpdateFormOrDeleteFormIsShown={setUpdateFormOrDeleteFormIsShown} />
                        {updateFormOrDeleteFormIsShown === "Update" && <UpdateResident clickedResidentInfo={clickedResidentInfo} handleUpdateFormChange={handleUpdateFormChange} responseMessage={responseMessage} handleContextmenuClose={handleContextmenuClose} handleUpdateSubmit={handleUpdateSubmit} />}
                        {updateFormOrDeleteFormIsShown === "Delete" && <DeleteResident clickedResidentInfo={clickedResidentInfo} responseMessage={responseMessage} handleContextmenuClose={handleContextmenuClose} handleDeleteClick={handleDeleteClick} />}
                    </section>
                    {contextmenuIsShown && <Contextmenu clickedResidentInfo={clickedResidentInfo} handleContextmenuClick={handleContextmenuClick} />}
                </div>
            </motion.main>
        </>
    );
}

function Contextmenu({ clickedResidentInfo, handleContextmenuClick }) {
    return (
        <aside className="bg-white border border-neutral-500 rounded fixed" style={{ left: clickedResidentInfo.coor.x, top: clickedResidentInfo.coor.y }}>
            <button className="block rounded-t px-1 text-left w-full hover:bg-neutral-300 hover:text-green-600" onClick={handleContextmenuClick}>
                Update
                <HiOutlinePencilSquare className="h-5 w-5 inline ml-2 mb-1 text-green-600" />
            </button>
            <button className="block rounded-b px-1 text-left w-full hover:bg-neutral-300 hover:text-red-600" onClick={handleContextmenuClick}>
                Delete
                <HiOutlineUserMinus className="h-5 w-5 inline ml-2 mb-1 text-red-600" />
            </button>
        </aside>
    );
}

export default Residents;
