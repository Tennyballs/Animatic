"use strict";
// const canvas = document.createElement('canvas');
// const ctx = canvas.getContext('2d');

// document.body.appendChild(canvas);


/**
 * 
 * @param {number} a value
 * @param {number} b minimum
 * @param {number} c maximum
 * @returns {number} between 0 - 255
 */
const clamp = (a, b, c) => Math.min(Math.max(a, b), c);

// // normalized number to hex
/**
 * @param {number} value
 * @returns {string}
*/
function n2hx(value)
{
    return clamp(Math.floor(value * 255), 0, 255).toString(16).padStart(2, '0');
}

// const objectsToRenderToCtx = [];
// const bpmChanges = [];
// const loopFns = [];
// let autoClear = true;
// let audio = null;


// function loop(passedSong = null)
// {
//     if(passedSong)
//     {
//         audio = passedSong;
//     }

//     requestAnimationFrame(loop);


//     if(autoClear)
//     {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//     }
//     objectsToRenderToCtx.forEach(obj => {
//         obj.draw(ctx);
//     });
//     loopFns.forEach(func => {
//         func();
//     });
    
// }

// function removeFromLoop(func)
// {
//     loopFns.splice(loopFns.indexOf(func), 1)
// }

// function addToLoop(func)
// {
//     loopFns.push(func);
// }

// class Task {
//     static wait(length = 0.001)
//     {
//         return new Promise(resolve => setTimeout(resolve, length));
//     }
// }

// function setBpm(time, bpm)
// {
//     bpmChanges.push({time, bpm})
// }

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
        this.bpm = [{time: -1, bpm: -1}]
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
        this.bpm.push({time: -1, bpm})
        return this;
    }

    addBpm(time, bpm)
    {
        this.bpm.push({time, bpm})
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

    getBpm()
    {
        if(this.bpm.length == 1)
            return this.bpm[0].bpm;
        
        let time = this.element.currentTime;

        for (let b = 0; b < this.bpm.length; b++) {
            const beat = this.bpm.reverse()[b];
            if(time > beat.time){
                this.bpm.reverse()
                return beat.bpm;
            }
        }


        return time;
    }
}

class Color {
    
    /** @type {number} */
    r;
    g;
    b;
    a;

    /**
     * 
     * @param {number} r between 0 - 1
     * @param {number} g between 0 - 1
     * @param {number} b between 0 - 1
     * @param {number} a between 0 - 1
     */
    constructor(r = 0, g = 0, b = 0, a = 1)
    {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    toString()
    {
        return `#${n2hx(this.r) + n2hx(this.g) + n2hx(this.b) + n2hx(this.a)}`
    }

    /**
     * @param {number} alpha 
     * @returns {Color}
     */
    static random(alpha = 1)
    {
        return new Color(Math.random(), Math.random(), Math.random(), alpha)
    }
}

class Rect {

    /**
     * @type {number}
     */
    x;
    y;
    width;
    height;
    rotation;

    /**
     * @type {Color}
     */
    fillColor;
    outlineColor;

    /**
     * @param {number} width width in pixels
     * @param {number} height height in pixels
     * @param {Color} fillColor ex: new Color(r, g, b, a)
     * @param {Color} outlineColor ex: new Color(r, g, b, a)
     */
    constructor(width, height, fillColor = new Color(1, 1, 1, 1), outlineColor = new Color(0, 0, 0, 0))
    {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.fillColor = fillColor;
        this.outlineColor = outlineColor;
        this.rotation = 0;
    }

    /**
     * @param {number} amount degrees of rotation
     */
    rotate(amount = 0)
    {
        this.rotation += amount;
        return this;
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx)
    {
        ctx.save();
        ctx.strokeStyle = this.outlineColor.toString();
        ctx.fillStyle = this.fillColor.toString();
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }

    /**
     * @override
     * @returns {string}
     */
    toString()
    {
        return `Rect(x=${this.x}, y=${this.y}, width=${this.width}, height=${this.height}, fillColor="${this.fillColor.toString()}, outlineColor="${this.outlineColor.toString()}", rotation=${this.rotation})`
    }
}

class Canvas {

    /**
     * @type {boolean}
     */
    autoClear;

    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    element;

    /**
     * @private
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * @type {number}
     */
    width;
    height;

    /**
     * @private
     * @type {[Rect]} Objects of any kind supported by the API ive created.
     */
    children;

    /**
     * @param {string} id ex: "canvas"
     * @param {number} width width in pixels 
     * @param {number} height height in pixels 
     */
    constructor(id, width = 1, height = 1) {
        this.width = width;
        this.height = height;
        this.children = [];
        this.autoClear = false;

        this.element = document.createElement('canvas');
        if(!this.element)
        {
            throw new Error("Could not create the Canvas element!!\nThis browser or window does not support the HTMLCanvasElement Properties/Attributes needed to use this web-application.")
        }

        this.ctx = this.element.getContext('2d');

        if(!this.ctx)
        {
            throw new Error("Could not get the 2d context from the canvas element!!!")
        }

        this.element.id = id;

        this.resize(width, height);

        document.body.appendChild(this.element);

    }

    /**
     * @returns {CanvasRenderingContext2D}
     */
    get ctx()
    {
        return this.ctx;
    }

    /**
     * 
     * @param {number} width
     * @param {number} height 
     * @returns {Canvas}
     */
    resize(width, height)
    {
        this.element.width = width;
        this.element.height = height;
        return this;
    }

    /**
     * @returns {void}
     */
    render()
    {
        if(this.autoClear)
        {

        }
        const ctx = this.element.getContext('2d');
        this.children.forEach(child => {
            child.draw(ctx);
        });
    }
}

const mainCanvas = new Canvas("test-canvas", 640, 480);


/**
 * @type {[TimedFunction]}
 */
const funcs = [];

class TimedFunction
{

    /**
     * @type {number}
     */
    startTime;
    endTime;

    /**
     * @type {Ease}
     */
    ease;
    
    /**
     * @type {function(number): void}
     */
    callback;

    /**
     * 
     * @param {number} startTime
     * @param {number} length in beats 
     * @param {Ease} ease 
     * @param {function(number): void} callback 
     */
    constructor(startTime, length, ease, callback)
    {
        this.startTime = startTime;
        this.endTime = startTime + length;
        this.ease = ease;
        this.callback = callback;
        
        funcs.push(this)
    }

    /**
     * @param {number} value
     * @returns {void}
     */
    run(value)
    {
    }

    /**
     * 
     * @param {HTMLAudioElement} audio
     */
    getLinearInterpolation(audio)
    {
        
    }
}

function mainLoop()
{
    requestAnimationFrame(mainLoop);
    mainCanvas.render();
    funcs.forEach(func => {
        func();
    });
}

// /**
//  * @param {number} [time=-1] the time
//  * @param {number} [bpm=120] the beat
//  * @returns {void}
//  */
// function addBPM(time = -1, bpm = 120)
// {
//     console.log(time, bpm)
// }