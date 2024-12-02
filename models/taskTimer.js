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
    stop(){
        this.updatedAt=Date.now()
        this.actionList.push({action:"stopped",date:Date.now()})
    }
    getStatus(){
        return this.actionList[this.actionList.length - 1].action
    }
    getElapsedTime(){
        return this.actionList[this.actionList.length-1].date
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
        return (name+" created")
    }

    startTimer(name) {
        if (!this.timerList[name]) {
            throw new Error(`Timer with name "${name}" does not exist.`);
        }else if(this.timerList[name].getStatus()==="started"){
            throw new Error('Timer already started')
        }else if(this.timerList[name].getStatus()==="stopped"){
            throw new Error('Timer is stopped')
        }
        this.timerList[name].start();
        return (name+" started")
    }

    pauseTimer(name) {
        if (!this.timerList[name]) {
            throw new Error(`Timer with name "${name}" does not exist.`);
        }else if(this.timerList[name].getStatus()==="paused"){
            throw new Error('Timer already paused')
        }else if(this.timerList[name].getStatus()==="stopped"){
            throw new Error('Timer is stopped')
        }
        this.timerList[name].pause();
        return (name+" paused")
    }

    resetTimer(name) {
        if (!this.timerList[name]) {
            throw new Error(`Timer with name "${name}" does not exist.`);
        }
        this.timerList[name].reset();
        return (name+" reset")
    }
    stopTimer(name){
        if (!this.timerList[name]) {
            throw new Error(`Timer with name "${name}" does not exist.`);
        }else if(this.timerList[name].getStatus()==="stopped"){
            throw new Error('Timer already stopped')
        }
        this.timerList[name].stop();
        return (name+" stopped")
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