const express = require("express");
const router = express.Router();
const { db } = require("../firebase/config");

const timeslots = [
    { time: "7am - 8am", slotOne: "Available", slotTwo: "Available", slotThree: "Available", order: 1 },
    { time: "8am - 9am", slotOne: "Available", slotTwo: "Available", slotThree: "Available", order: 2 },
    { time: "9am - 10am", slotOne: "Available", slotTwo: "Available", slotThree: "Available", order: 3 },
    { time: "10am - 11am", slotOne: "Available", slotTwo: "Available", slotThree: "Available", order: 4 },
    { time: "11am - 12nn", slotOne: "Available", slotTwo: "Available", slotThree: "Available", order: 5 },
    { time: "12nn - 1pm", slotOne: "Available", slotTwo: "Available", slotThree: "Available", order: 6 },
    { time: "1pm - 2pm", slotOne: "Available", slotTwo: "Available", slotThree: "Available", order: 7 },
    { time: "2pm - 3pm", slotOne: "Available", slotTwo: "Available", slotThree: "Available", order: 8 },
    { time: "3pm - 4pm", slotOne: "Available", slotTwo: "Available", slotThree: "Available", order: 9 },
    { time: "4pm - 5pm", slotOne: "Available", slotTwo: "Available", slotThree: "Available", order: 10 },
    { time: "5pm - 6pm", slotOne: "Available", slotTwo: "Available", slotThree: "Available", order: 11 },
    { time: "6pm - 7pm", slotOne: "Available", slotTwo: "Available", slotThree: "Available", order: 12 },
    { time: "7pm - 8pm", slotOne: "Available", slotTwo: "Available", slotThree: "Available", order: 13 },
    { time: "8pm - 9pm", slotOne: "Available", slotTwo: "Available", slotThree: "Available", order: 14 },
    { time: "9pm - 10pm", slotOne: "Available", slotTwo: "Available", slotThree: "Available", order: 15 }
];

router.route("/cron").post((req, res) => {
    // db.collection("gym")
    //   .orderBy("date")
    //   .get()
    //   .then((querySnapshot) => {
    //     db.collection("gym").doc(querySnapshot.docs[0].id).delete();
    //   })
    //   .catch((err) => console.log(err));

    db.collection("gym")
        .add({ date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000) })
        .then((doc) => {
            timeslots.forEach((timeslot) => db.collection("gym").doc(doc.id).collection("timeslot").add(timeslot));
        })
        .catch((err) => console.log(err));

    return res.end();
});

module.exports = router;
