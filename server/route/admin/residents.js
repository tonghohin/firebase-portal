const express = require("express");
const router = express.Router();
const { auth } = require("../../firebase/config");

router.route("/resident").post((req, res) => {
    auth.createUser({ email: req.body.email, password: req.body.password })
        .then((x) => {
            auth.setCustomUserClaims(x.uid, { unit: req.body.unit, isAdmin: false });
            res.json({ errorMessage: false, uid: x.uid });
        })
        .catch((error) => {
            console.log(error.code);

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

router
    .route("/resident/:uid")
    .put((req, res) => {
        auth.setCustomUserClaims(req.params.uid, { unit: req.body.unit, isAdmin: false });
        res.end();
    })
    .delete((req, res) => {
        auth.deleteUser(req.params.uid);
        res.end();
    });

module.exports = router;
