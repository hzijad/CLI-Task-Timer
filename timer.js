class Timer{

    constructor(){
        this.starttime = 0;
        this.stoptime = 0;
        this.running = false;
        this.elapsed = 0;
    }
    start(){
        this.starttime = Date.now();
        this.running = true;
    }

    stop(){
    this.stoptime = Date.now();
    this.running = false;
    this.elapsed += this.stoptime - this.starttime;
    }

    reset(){
        this.starttime = 0;
        this.stoptime = 0;
        this.running = false;
        this.elapsed = 0;
    }
}
/*test kod
    elapsedtime(){
        if (this.running) {
            return this.elapsed + (Date.now() - this.starttime);
        }
        return this.elapsed;
    }
    }
    const timer = new Timer();

    console.log("Starting timer...");
    timer.start();
    
    setTimeout(() => {
        console.log("Stopping timer...");
        timer.stop();
        console.log("Elapsed time:", timer.elapsedtime(), "ms");
    
        console.log("Resetting timer...");
        timer.reset();
        console.log("Elapsed time after reset:", timer.elapsedtime(), "ms");
    }, 2000);
*/ 
