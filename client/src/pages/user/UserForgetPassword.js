import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/config";

function UserForgetPassword() {
    const [formData, setFormData] = useState({ email: "" });
    const [message, setMessage] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);

    function handleChange(e) {
        setFormData({ email: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        sendPasswordResetEmail(auth, formData.email)
            .then(() => {
                setIsEmailSent(true);
                setMessage(`Email sent to ${formData.email}! Please check your email and follow the instructions.`);
            })
            .catch((error) => {
                setMessage(error.code);
            });
    }

    return isEmailSent ? (
        <main className="col-span-full bg-main-bg bg-cover">
            <div className="backdrop-blur-sm h-full w-full">
                <h1 className="bg-gray-700 text-gray-100 text-2xl font-bold text-center py-4">Granbury Place</h1>
                <form className="text-center mt-40 bg-slate-300 border-2 rounded border-gray-300 w-72 h-72 m-auto flex flex-col items-center justify-around" onSubmit={handleSubmit}>
                    <h3 className="text-xl font-semibold">Welcome to Granbury Place</h3>
                    <p>{message}</p>
                    <Link to="/login" className="underline text-stone-600 hover:text-black">
                        Login
                    </Link>
                </form>
            </div>
        </main>
    ) : (
        <main className="col-span-full bg-main-bg bg-cover">
            <div className="backdrop-blur-sm h-full w-full">
                <h1 className="bg-gray-700 text-gray-100 text-2xl font-bold text-center py-4">New Apartments</h1>
                <form className="text-center mt-40 bg-slate-300 border-2 rounded border-gray-300 w-96 h-72 m-auto flex flex-col items-center justify-around" onSubmit={handleSubmit}>
                    <h3 className="text-xl font-semibold">Forget Password</h3>
                    <input type="email" name="email" className="rounded bg-slate-100 p-2 w-4/5" placeholder="Email" value={formData.email} onChange={handleChange} autoComplete="false" required={true}></input>
                    <p className="text-red-600">{message}</p>
                    <button className="bg-slate-500 text-white rounded p-1  hover:bg-slate-600">Get the password reset email</button>
                    <Link to="/login" className="underline text-stone-600 hover:text-black">
                        Login
                    </Link>
                </form>
            </div>
        </main>
    );
}

export default UserForgetPassword;
