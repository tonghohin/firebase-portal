const express = require("express");
const router = express.Router();
const { db } = require("../../firebase/config");

router.route("/gymcalendar/:dayId/:unit").get((req, res) => {
    const template = [];

    db.collection("gym")
        .doc(req.params.dayId)
        .collection("timeslot")
        .orderBy("order")
        .get()
        .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
                template.push({ timeslotId: doc.id, ...doc.data() });
            });

            const sanitizedResult = template.map((timeslot) => {
                if (timeslot.slotOne !== "Available" && timeslot.slotOne !== req.params.unit && timeslot.slotOne !== "Closed") {
                    timeslot.slotOne = "Unavailable";
                }
                if (timeslot.slotTwo !== "Available" && timeslot.slotTwo !== req.params.unit && timeslot.slotTwo !== "Closed") {
                    timeslot.slotTwo = "Unavailable";
                }
                if (timeslot.slotThree !== "Available" && timeslot.slotThree !== req.params.unit && timeslot.slotThree !== "Closed") {
                    timeslot.slotThree = "Unavailable";
                }
                return timeslot;
            });

            res.json(sanitizedResult);
        });
});

module.exports = router;
