


class Music {

    /**
     * @private
     * @type {HTMLAudioElement}
     */
    element;

    /**
     * @type {number}
     */
    offset;
    
    /**
     * @param {string} src 
     * @param {number?} offset the offset for the entire song to be synced for the bpm to be correct (additave).
     */    
    constructor(src, offset = 0)
    {
        // we default bpm changes to -1
        // this just means it hasnt been set and we go off;
        // of time-based events instead
        // unlike beat-based events
        this.src = src;
        this.offset = offset;
        this.bpm = [{time: 0, bpm: 0}]
        this.element = new Audio(src);
    }

    clearBpm()
    {
        this.bpm = [];
    }

    /**
     * 
     * @param {number} bpm 
     * @returns {Music}
     */
    setBpm(bpm)
    {
        this.bpm = [];
        this.bpm.push({time: -0.0001, bpm})
        return this;
    }

    addBpm(time, bpm)
    {
        this.bpm.push({time, bpm})
        return this;
    }

    reset()
    {
        this.element.currentTime = 0;
        return this;
    }


    play()
    {
        this.element.play();
        return this;
    }

    /**
     * @param {boolean} value 
     */
    set playing(value)
    {
        if(this.element.paused && value)
            this.element.play();
        if(!this.element.paused && !value)
            this.element.pause();
    }

    /**
     * @param {number} value 
     */
    set volume(value)
    {
        this.element.volume = value / 100; // instead of the user putting in a specific point value for each audio they can just do this;
    }

    /**
     * @param {number} value 
     */
    set speed(value)
    {
        this.element.playbackRate = value / 100 + 1;
    }

    /**
     * @param {boolean} value 
     */
    set speedEffectsPitch(value)
    {
        this.element.preservesPitch = !value
    }

    /**
     * @param {number} [time=this.element.currentTime] 
     * @returns {number}
     */
    getBpm(time = this.element.currentTime)
    {
        if(this.bpm.length == 1)
            return this.bpm[0].bpm;

        for (let b = 0; b < this.bpm.length; b++) {
            const beat = this.bpm.toReversed()[b];
            if(time > beat.time){
                return beat.bpm;
            }
        }

        return time;
    }


    /**
     * @param {number}
     * @returns {number}
     */
    getBeat(time = this.element.currentTime)
    {
        const beat = time * (this.getBpm(time) / 60)

        return beat;
    }
}