import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { db } from "../../../firebase/config";

function AddResident({ setToggleRerender, setUpdateFormOrDeleteFormIsShown }) {
    const [formData, setFormData] = useState({ firstName: "", lastName: "", unit: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setUpdateFormOrDeleteFormIsShown("");
    }

    function handleSubmit(e) {
        e.preventDefault();

        const { firstName, lastName, unit, email, password } = formData;

        // add auth
        fetch("/admin/resident", { method: "POST", body: JSON.stringify({ unit: unit, email: email, password: password }), headers: { "Content-Type": "application/json" } })
            .then((res) => res.json())
            .then((data) => {
                if (data.errorMessage) {
                    setMessage(data.errorMessage);
                } else {
                    // add to Firestore
                    addDoc(collection(db, "residents"), { firstName: firstName, lastName: lastName, unit: unit, email: email, uid: data.uid })
                        .then(() => {
                            setMessage("New resident has been added.");
                            setToggleRerender((prevToggleRerender) => !prevToggleRerender);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            });

        setFormData({ firstName: "", lastName: "", unit: "", email: "", password: "" });
    }

    return (
        <form className="p-2 text-md bg-white mt-2 border-2 border-neutral-500 rounded" onSubmit={handleSubmit}>
            <h2 className="font-semibold">Add a resident</h2>
            <input className="bg-neutral-100 m-1 ml-0 border-2 w-full" type="text" name="firstName" placeholder="First Name" onChange={handleChange} value={formData.firstName} required={true} autoComplete="false"></input>
            <input className="bg-neutral-100 m-1 ml-0 border-2 w-full" type="text" name="lastName" placeholder="Last Name" onChange={handleChange} value={formData.lastName} required={true} autoComplete="false"></input>
            <input className="bg-neutral-100 m-1 ml-0 border-2 w-full" type="text" name="unit" placeholder="Unit" onChange={handleChange} value={formData.unit} required={true} autoComplete="false"></input>
            <input className="bg-neutral-100 m-1 ml-0 border-2 w-full" type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required={true} autoComplete="false"></input>
            <input className="bg-neutral-100 m-1 ml-0 border-2 w-full" type="text" name="password" placeholder="Password" onChange={handleChange} value={formData.password} required={true} autoComplete="false" minLength={6}></input>
            <button className="bg-neutral-500 flex items-center gap-2 text-white py-0.5 px-3 rounded mt-2 hover:bg-neutral-600 transition">
                Add
                <HiOutlineUserPlus className="h-5 w-5 text-white inline" />
            </button>
            <p className="text-neutral-700">{message}</p>
        </form>
    );
}

export default AddResident;
