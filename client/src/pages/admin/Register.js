import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isAccountCreated, setIsAccountCreated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        // did not create the user on client side because 1) custom claims have to be added on server side anyway, 2) onAuthStateChanged in App.js cannot catch the custom claims as it's set after the user being created on the client side
        fetch("/admin/register", { method: "POST", body: JSON.stringify(formData), headers: { "Content-Type": "application/json" } })
            .then((res) => res.json())
            .then((data) => {
                if (data.isAccountCreated) {
                    setIsAccountCreated(data.isAccountCreated);
                }
                if (data.errorMessage) {
                    setErrorMessage(data.errorMessage);
                }
            });
    }

    return (
        <main className="col-span-full bg-main-bg bg-cover">
            <div className="backdrop-blur-sm backdrop-contrast-50 h-full w-full">
                <h1 className="bg-neutral-700 text-neutral-100 text-2xl font-bold text-center py-4">New Apartments</h1>
                {isAccountCreated ? (
                    <section className="text-center mt-40 bg-neutral-300 rounded w-72 h-72 m-auto flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                        <h3 className="font-semibold">New admin account has been registered!</h3>
                        <Link to="/admin/login" className="underline text-neutral-600 hover:text-black">
                            Login Now!
                        </Link>
                    </section>
                ) : (
                    <form className="text-center mt-40 bg-neutral-300 rounded w-96 h-72 m-auto flex flex-col items-center justify-around" onSubmit={handleSubmit}>
                        <h3 className="text-xl font-semibold">Admin Register</h3>
                        <input type="email" name="email" className="rounded bg-neutral-100 p-2 w-4/5" placeholder="Email" value={formData.email} onChange={handleChange} autoComplete="false" required={true}></input>
                        <input type="text" name="password" className="rounded bg-neutral-100 p-2 w-4/5" placeholder="Password" value={formData.password} onChange={handleChange} autoComplete="false" required={true} minLength={6}></input>
                        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                        <button className="bg-neutral-500 text-white rounded p-1 w-20 hover:bg-neutral-600">Register</button>
                        <Link to="/admin/login" className="underline text-neutral-600 hover:text-black">
                            Login
                        </Link>
                    </form>
                )}
            </div>
        </main>
    );
}

export default Register;
