class LockDelay {

    constructor(level) { // LockDelay object should only exist while piece is on the ground
        this.time = 35 - level; 
        this.reset = 0; 
    }

    /**
     * Resets the lock delay timer up to 4 times. 
     * @returns {boolean} false if reset too many times, true if reset was successful.
     */
    resetTime() {
        if (this.reset == 4) {
            return false;
        } else {
            this.time = 35 - level;
            this.reset++; 
            return true;
        }
    }

}
  