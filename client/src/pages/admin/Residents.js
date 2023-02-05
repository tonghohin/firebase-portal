import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { useState, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import AddResident from "../../components/admin/residents/AddResident";
import UpdateResident from "../../components/admin/residents/UpdateResident";
import DeleteResident from "../../components/admin/residents/DeleteResident";
import { db } from "../../firebase/config";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

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
    if (e.target.textContent === "Update") {
      setUpdateFormOrDeleteFormIsShown("Update");
    } else if (e.target.textContent === "Delete") {
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
    });
  }

  function handleDeleteClick() {
    // delete Firestore
    deleteDoc(doc(db, "residents", clickedResidentInfo.id)).then(() => {
      setResponseMessage("The resident is deleted.");
      setToggleRerender((prevToggleRerender) => !prevToggleRerender);
    });

    // delete auth
    fetch(`/admin/resident/${clickedResidentInfo.uid}`, { method: "DELETE" });
  }

  function handleExportClick() {
    const worksheet = XLSX.utils.json_to_sheet(allResidents);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Residents");
    XLSX.writeFile(workbook, "Residents.xlsx");
  }

  return (
    <>
      <motion.main className="p-5 bg-stone-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <nav className="flex justify-between mb-2">
          <h1 className="text-xl font-semibold">Residents</h1>
          <button className="bg-green-600 text-white py-0.5 px-3 rounded hover:bg-green-700 transition" onClick={handleExportClick}>
            Export
          </button>
        </nav>
        <div className="bg-white w-full rounded border-2">
          <table className="w-full">
            <thead>
              <tr className="text-left ">
                <th className="py-2">
                  First Name
                  <button onClick={handleSorting} data-column="firstName">
                    <ArrowsUpDownIcon className="h-5 w-5 inline cursor-pointer p-0.5 ml-1 text-stone-600 rounded hover:bg-stone-200" />
                  </button>
                </th>
                <th className="py-2">
                  Last Name
                  <button onClick={handleSorting} data-column="lastName">
                    <ArrowsUpDownIcon className="h-5 w-5 inline cursor-pointer p-0.5 ml-1 text-stone-600 rounded hover:bg-stone-200" />
                  </button>
                </th>
                <th className="py-2">
                  Unit
                  <button onClick={handleSorting} data-column="unit">
                    <ArrowsUpDownIcon className="h-5 w-5 inline cursor-pointer p-0.5 ml-1 text-stone-600 rounded hover:bg-stone-200" />
                  </button>
                </th>
                <th className="py-2">
                  Email
                  <button onClick={handleSorting} data-column="email">
                    <ArrowsUpDownIcon className="h-5 w-5 inline cursor-pointer p-0.5 ml-1 text-stone-600 rounded hover:bg-stone-200" />
                  </button>
                </th>
                <th className="py-2">
                  UID
                  <button onClick={handleSorting} data-column="uid">
                    <ArrowsUpDownIcon className="h-5 w-5 inline cursor-pointer p-0.5 ml-1 text-stone-600 rounded hover:bg-stone-200" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {allResidents.map((resident) => (
                <tr key={resident.id} id={resident.id} data-uid={resident.uid} className="odd:bg-stone-200 even:bg-stone-50 first:border-t border-stone-400 hover:bg-stone-300 cursor-pointer" onContextMenu={handleContextmenu}>
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
      </motion.main>
    </>
  );
}

function Contextmenu(props) {
  return (
    <aside className="bg-white border border-stone-500 rounded fixed" style={{ left: props.clickedResidentInfo.coor.x, top: props.clickedResidentInfo.coor.y }}>
      <button className="block rounded-t px-1 text-left w-full hover:bg-stone-300 hover:text-green-600" onClick={props.handleContextmenuClick}>
        Update
        <PencilSquareIcon className="h-5 w-5 inline ml-2 mb-1 text-green-600" />
      </button>
      <button className="block rounded-b px-1 text-left w-full hover:bg-stone-300 hover:text-red-600" onClick={props.handleContextmenuClick}>
        Delete
        <TrashIcon className="h-5 w-5 inline ml-2 mb-1 text-red-600" />
      </button>
    </aside>
  );
}

export default Residents;
