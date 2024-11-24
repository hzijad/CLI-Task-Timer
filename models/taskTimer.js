const utility=require("../functions.js")

class taskTimer{
    constructor(name){
        this.name=name
        this.uid=utility.makeID(6)
        this.updatedAt=Date.now();
        this.actionList=[{action:"created",date:Date.now()}]
    }

    start(){
        this.updatedAt = Date.now()
        this.actionList.concat([{action:"started",date:Date.now()}])
    }
    pause(){
        this.updatedAt = Date.now()
        this.actionList.concat([{action:"paused",date:Date.now()}])
    }
    reset(){
        this.updatedAt=Date.now();
        this.actionList=[{action:"created",date:Date.now()}]
    }
    getStatus(){
        return this.actionList[this.actionList.length - 1].action
    }
    getElapsedTime(){
        return ("Time since task " + this.actionList[this.actionList.length - 1].action + this.actionList[this.actionList.length - 1].date)
    }
    getUid(){
        return this.uid;
    }
}

class AllTimers{
    constructor() {
        //ensures wrapper class AllTimers is singleton
        if (AllTimers._instance) {
            return AllTimers._instance
        }
        AllTimers._instance = this;

        this.timerList={}
    }
    createTimer(name){
        this.timerList[name]=new taskTimer(name)
    }
    startTimer(name){
        this.timerList[name].start();
    }
    pauseTimer(name){
        this.timerList[name].pause()
    }
    resetTimer(name){
        this.timerList[name].reset()
    }
    getStatusTimer(name){
        return this.timerList[name].getStatus()
    }
    getElapsedTimeTimer(name){
        return this.timerList[name].getElapsedTime()
    }
    getUidTimer(name){
        return this.timerList[name].getUid()
    }
}

module.exports = AllTimers;