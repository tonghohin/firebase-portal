import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/config";

function UserLogin() {
    const [formData, setFormData] = useState({ email: "demo@demo.com", password: "123456" });
    const [isInvalidEmailOrPassword, setIsInvalidEmailOrPassword] = useState(false);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then(() => {
                setFormData({ email: "", password: "" });
            })
            .catch(() => {
                setIsInvalidEmailOrPassword(true);
            });
    }

    return (
        <main className="col-span-full bg-main-bg bg-cover">
            <div className="backdrop-blur-sm h-full w-full">
                <h1 className="bg-gray-700 text-gray-100 text-2xl font-bold text-center py-4">New Apartments</h1>
                <form className="text-center mt-40 bg-slate-300 border-2 rounded border-gray-300 w-96 h-72 m-auto flex flex-col items-center justify-around" onSubmit={handleSubmit}>
                    <h3 className="text-xl font-semibold">Welcome to New Apartments</h3>
                    <input type="email" name="email" className="rounded bg-slate-100 p-2 w-4/5" placeholder="Email" value={formData.email} onChange={handleChange} autoComplete="false" required={true}></input>
                    <input type="password" name="password" className="rounded bg-slate-100 p-2 w-4/5" placeholder="Password" value={formData.password} onChange={handleChange} autoComplete="false" required={true}></input>
                    {isInvalidEmailOrPassword && <p className="text-red-600">Invalid Email/password</p>}
                    <button className="bg-slate-500 text-white rounded p-1 w-20 hover:bg-slate-600">Login</button>
                    <Link to="/forget-password" className="underline text-stone-600 hover:text-black">
                        Forget password
                    </Link>
                </form>
            </div>
        </main>
    );
}

export default UserLogin;
