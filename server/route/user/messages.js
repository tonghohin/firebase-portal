const express = require("express");
const router = express.Router();
const { db } = require("../../firebase/config");

router.route("/message/:unit").get((req, res) => {
    const template = [];

    db.collection("messages")
        .where("unit", "==", req.params.unit)
        .orderBy("createdAt", "desc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
                template.push({ id: doc.id, ...doc.data() });
            });
            res.json(template);
        });
});

module.exports = router;
