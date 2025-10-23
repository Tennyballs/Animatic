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
     * 
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

function mainLoop()
{

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