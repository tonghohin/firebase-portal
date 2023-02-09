require("./firebase/job");
const express = require("express");
const app = express();
const path = require("path");

app.listen(process.env.PORT || 8000, () => {
  console.log("SERVER LISTENING!");
});

const options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html", "css", "js", "ico", "jpg", "jpeg", "png", "svg"],
  index: ["index.html"],
  maxAge: "1m",
  redirect: false
};
app.use(express.static("build", options));
app.use(express.static(path.join(__dirname, "../client/build")));
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

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
