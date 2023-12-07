import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/config";

function ForgetPassword() {
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

    return (
        <main className="col-span-full bg-main-bg bg-cover">
            <div className="backdrop-blur-sm backdrop-contrast-50 h-full w-full">
                <h1 className="bg-neutral-700 text-gray-100 text-2xl font-bold text-center py-4">New Apartments</h1>
                <form className="text-center mt-40 bg-neutral-300 border-2 rounded border-gray-300 w-96 h-72 m-auto flex flex-col items-center justify-around" onSubmit={handleSubmit}>
                    <h3 className="text-xl font-semibold">Forget Password</h3>
                    {isEmailSent ? (
                        <p>{message}</p>
                    ) : (
                        <>
                            <input type="email" name="email" className="rounded bg-neutral-100 p-2 w-4/5" placeholder="Email" value={formData.email} onChange={handleChange} autoComplete="false" required={true}></input>
                            <p className="text-red-600">{message}</p>
                            <button className="bg-neutral-500 text-white rounded p-1 hover:bg-neutral-600">Get the password reset email</button>
                        </>
                    )}
                    <Link to="/admin/login" className="underline text-neutral-600 hover:text-black">
                        Login
                    </Link>
                    <Link to="/admin/register" className="underline text-neutral-600 hover:text-black">
                        Register
                    </Link>
                </form>
            </div>
        </main>
    );
}

export default ForgetPassword;
