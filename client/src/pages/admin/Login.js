import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isInvalidEmailOrPassword, setIsInvalidEmailOrPassword] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        setFormData({ email: "", password: "" });
      })
      .catch((error) => {
        setIsInvalidEmailOrPassword(true);
        console.log(error.code);
      });
  }

  return (
    <main className="col-span-full bg-stone-100">
      <h1 className="bg-stone-700 text-gray-100 text-2xl font-bold text-center py-4">Granbury Place</h1>
      <form className="text-center mt-40 bg-stone-300 border-2 rounded border-gray-300 w-72 h-72 m-auto flex flex-col items-center justify-around" onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold">Admin Login</h3>
        <input type="text" name="email" className="rounded bg-stone-100 p-2" placeholder="Email" value={formData.email} onChange={handleChange} autoComplete="false" required={true}></input>
        <input type="password" name="password" className="rounded bg-stone-100 p-2" placeholder="Password" value={formData.password} onChange={handleChange} autoComplete="false" required={true}></input>
        {isInvalidEmailOrPassword && <p className="text-red-600">Invalid email/password</p>}
        <button className="bg-stone-500 text-white rounded p-1 w-20 hover:bg-stone-600">Login</button>
        <Link to="/admin/register" className="underline text-stone-600 hover:text-black">
          Register
        </Link>
        <Link to="/admin/forget-password" className="underline text-stone-600 hover:text-black">
          Forget password
        </Link>
      </form>
    </main>
  );
}

export default Login;
