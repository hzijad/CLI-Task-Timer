var express = require('express');
var router = express.Router();
const AllTimers=require("../models/taskTimer.js")

const allTimers =new AllTimers()
allTimers.createTimer("first")
allTimers.createTimer("second")
allTimers.startTimer("first")
allTimers.pauseTimer("first")
console.log(allTimers.showAllTimers())

/* GET users listing. */
router.get('/', function(req, res, next) {
    try{
        //CAN MOVE COMMAND INTERPRETER TO FRONTEND LATER, SEND IN REQUEST CLEAN
        const userSentence = req.body
        console.log(userSentence)
        const userCommand = userSentence.command.split(" ")[0]
        const userCommandTarget = userSentence.command.split(" ")[1]
        console.log(userCommand, userCommandTarget)

        // TILL HERE

        switch (userCommand) {
            case "start":
                res.json({message:allTimers.startTimer(userCommandTarget)})
                break;
            case "create":
                res.json({message:allTimers.createTimer(userCommandTarget)})
                break;
            case "pause":
                res.json({message:allTimers.pauseTimer(userCommandTarget)})
                break;
            case "reset":
                res.json({message:allTimers.resetTimer(userCommandTarget)})
                break;
            case "stop":
                res.json({message:allTimers.stopTimer(userCommandTarget)})
                break;
            case "getStatus":
                res.json({message: "Status of timer: " + allTimers.getStatusTimer(userCommandTarget)})
                break;
            case "getElapsedTime":
                res.json({message: "Last action happened on" ,toIsoString:allTimers.getElapsedTimeTimer(userCommandTarget)})
                break;
            case "getUid":
                res.json({message: "Unique ID of timer: " + allTimers.getUidTimer(userCommandTarget)})
                break;
            case "showAllTimers":
                res.json({message: "List of all timers:" + allTimers.showAllTimers()})
                break;
            default:
                res.status(422)
                res.send("Bad input")
        }
    }catch (e){
        console.log(e)
        console.log("USAUUDSA")
        res.status(422)
        res.send({message:e.toString()})
    }
    res.send();
});

module.exports = router;
