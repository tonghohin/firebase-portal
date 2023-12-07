const express = require("express");
const router = express.Router();
const { auth } = require("../../firebase/config");

router.route("/register").post((req, res) => {
    auth.createUser(req.body)
        .then((x) => {
            auth.setCustomUserClaims(x.uid, { isAdmin: true })
                .then(() => res.json({ isAccountCreated: true }))
                .catch((err) => console.log(err));
        })
        .catch((error) => {
            switch (error.code) {
                case "auth/invalid-email":
                    res.json({ errorMessage: "Invalid email" });
                    break;
                case "auth/invalid-password":
                    res.json({ errorMessage: "Password must be a string with at least six characters." });
                    break;
                case "auth/email-already-exists":
                    res.json({ errorMessage: "The email has already been registered." });
                    break;
                default:
                    res.json({ errorMessage: "Something's wrong. Please try again." });
            }
        });
});

module.exports = router;
