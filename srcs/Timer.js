class Timer {

    #timeBuff;
    #timeoutVal;
    #date;

    constructor(timeoutValSeg) 
    {
        let time = new Date();
        this.#timeBuff = time.getTime();
        this.#timeoutVal = timeoutValSeg * 1000;    
    }

    isTimeout() 
    {
        let time = new Date();
        let actualTime = time.getTime();
       // console.log("time now: " + actualTime);
       // console.log("time buff: " + this.#timeBuff);

        if (actualTime - this.#timeBuff >= this.#timeoutVal)
        {
            this.#timeBuff = actualTime;
		    return (true);
        }
	    else 
		    return (false);
    }
}

