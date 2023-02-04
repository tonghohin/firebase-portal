const express = require("express");
const app = express();

app.listen(process.env.PORT || 8000, () => {
  console.log("SERVER LISTENING!");
});

app.use(express.json());

// ------------------------------ Both ------------------------------
const Message = require("./route/message");
app.use(Message);

// ------------------------------ Admin ------------------------------
const Resident = require("./route/admin/residents");
app.use("/admin", Resident);

const Register = require("./route/admin/register");
app.use("/admin", Register);

// ------------------------------ User ------------------------------
const UserGym = require("./route/user/gym");
app.use("/", UserGym);
