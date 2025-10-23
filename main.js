"use strict";

function rgb2hsv (r, g, b) {
    let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs),
    diff = v - Math.min(rabs, gabs, babs);
    diffc = c => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = num => Math.round(num * 100) / 100;
    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = (1 / 3) + rr - bb;
        } else if (babs === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: percentRoundFn(s * 100),
        v: percentRoundFn(v * 100)
    };
}

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

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
    lineWidth;

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
        this.lineWidth = 1;

        mainCanvas.addChild(this);
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
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation * (Math.PI / 180))
        ctx.translate(-this.width/2, -this.height/2)
        ctx.strokeStyle = this.outlineColor.toString();
        ctx.fillStyle = this.fillColor.toString();
        ctx.lineWidth = this.lineWidth;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.strokeRect(0, 0, this.width, this.height);
        ctx.restore();
    }


    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    center(x, y)
    {
        this.x = x;
        this.y = y;
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
        this.autoClear = true;

        this.element = document.createElement('canvas');
        if(!this.element)
        {
            throw new Error("Could not create the Canvas element!!\nThis browser or window does not support the HTMLCanvasElement Properties/Attributes needed to use this web-application.")
        }

        this.ctx = this.element.getContext('2d', {
            willReadFrequently: true
        });

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
            this.ctx.clearRect(0, 0, this.element.width, this.element.height);
        }
        this.children.forEach(child => {
            child.draw(this.ctx);
        })
    }

    addChild(child)
    {
        this.children.push(child);
    }

    hueShift(degrees)
    {
        const imageData = this.ctx.createImageData(this.width, this.height)
        const pixels = this.ctx.getImageData(0, 0, this.width, this.height).data;
        for(let i = 0; i < pixels.length; i += 4)
        {
            let r = pixels[i+0];
            let g = pixels[i+1];
            let b = pixels[i+2];

            let hsv = rgb2hsv(r, g, b);

            let rgb = HSVtoRGB(hsv.h* degrees, hsv.s, hsv.v);

            imageData.data[i+0] = rgb.r
            imageData.data[i+1] = rgb.g
            imageData.data[i+2] = rgb.b
            imageData.data[i+3] = 255
        }


        this.ctx.putImageData(imageData, 0, 0)
    }
}

const mainCanvas = new Canvas("test-canvas", 640, 480);


/**
 * @type {[
 * {
 * fn:function(number):void,
 * startTime:number,
 * length:number,
 * easing:function(number):number
 * once:boolean
 * }
 * ]}
 */
const funcs = [];
/**
 * @type {[
 * {
 * fn:function(number):void,
 * time:number,
 * }
 * ]}
 */
const setFuncs = [];

function mainLoop()
{
    requestAnimationFrame(mainLoop);
    mainCanvas.render();
    funcs.filter(v => {
        return v.startTime < performance.now() && v.startTime + v.length > performance.now();
    }).forEach(func => {
        func.fn(func.easing((performance.now() - func.startTime) / func.length));
    });
    // setFuncs.filter(v => {
    //     return v.time < performance.now();
    // }).forEach(func => {
    //     func.fn(1);
    //     setFuncs.splice(setFuncs.findIndex(func), 1);
    // })
}

/**
 * @param {number} startTime
 * @param {number} length
 * @param {Ease.linear} ease
 * @param {function(number):number} fn
 * @param {boolean} once
 */
function addFunc(startTime, length, easing, fn, once = false)
{
    funcs.push({
        startTime: startTime * 1000,
        length: length * 1000,
        easing,
        fn,
        once
    })
}

/**
 * 
 * @param {function(number):void} fn 
 */
function delFunc(fn)
{
    funcs.splice(funcs.indexOf(fn), 1);
}

function clearFuncs()
{
    funcs.length = 0;
}


/**
 * @param {number} startTime
 * @param {function(number):number} fn
 */
function addSetFunc(startTime, fn)
{
    setFuncs.push({time: startTime * 1000, fn})
}