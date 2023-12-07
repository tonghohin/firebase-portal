const express = require("express");
const app = express();
const path = require("path");

app.listen(process.env.PORT || 8000, () => {
    console.log("SERVER LISTENING");
});

const OPTIONS = {
    dotfiles: "ignore",
    etag: false,
    extensions: ["htm", "html", "css", "js", "ico", "jpg", "jpeg", "png", "svg"],
    index: ["index.html"],
    maxAge: "1m",
    redirect: false
};
app.use(express.static("build", OPTIONS));
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());

// ------------------------------ Scheduled Cron Job ------------------------------
const Cron = require("./route/cron");
app.use(Cron);

// ------------------------------ Admin ------------------------------
const Resident = require("./route/admin/residents");
app.use("/admin", Resident);

const Register = require("./route/admin/register");
app.use("/admin", Register);

// ------------------------------ User ------------------------------
const UserGym = require("./route/user/gym");
app.use("/", UserGym);

const Message = require("./route/user/messages");
app.use("/", Message);

// ------------------------------ For React ------------------------------
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
