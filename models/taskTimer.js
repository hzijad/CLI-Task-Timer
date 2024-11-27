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
        this.actionList.push({action:"started",date:Date.now()})
    }
    pause(){
        this.updatedAt = Date.now()
        this.actionList.push({action:"paused",date:Date.now()})
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
    createTimer(name) {
        if (this.timerList[name]) {
            throw new Error(`Timer with name "${name}" already exists.`);
        }
        this.timerList[name] = new taskTimer(name);
    }

    startTimer(name) {
        if (!this.timerList[name]) {
            throw new Error(`Timer with name "${name}" does not exist.`);
        }
        this.timerList[name].start();
    }

    pauseTimer(name) {
        if (!this.timerList[name]) {
            throw new Error(`Timer with name "${name}" does not exist.`);
        }
        this.timerList[name].pause();
    }

    resetTimer(name) {
        if (!this.timerList[name]) {
            throw new Error(`Timer with name "${name}" does not exist.`);
        }
        this.timerList[name].reset();
    }

    getStatusTimer(name) {
        if (!this.timerList[name]) {
            throw new Error(`Timer with name "${name}" does not exist.`);
        }
        return this.timerList[name].getStatus();
    }

    getElapsedTimeTimer(name) {
        if (!this.timerList[name]) {
            throw new Error(`Timer with name "${name}" does not exist.`);
        }
        return this.timerList[name].getElapsedTime();
    }

    getUidTimer(name) {
        if (!this.timerList[name]) {
            throw new Error(`Timer with name "${name}" does not exist.`);
        }
        return this.timerList[name].getUid();
    }

    showAllTimers(){
        let allTimerList=[]
        for(const [key] of Object.entries(this.timerList)){
            allTimerList.push(" "+key)
        }
        return allTimerList;
    }
}

module.exports = AllTimers;