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



/**
 * @type {import("./types/canvas").Canvas}
 */
const mainCanvas = new Canvas("canvas", 640, 480);

/**
 * @type {[
 * {
 * fn:function(number):void,
 * startTime:number,
 * length:number,
 * easing:function(number):number
 * }
 * ]}
 */
const funcs = [];

// /**
//  * @type {[
//  * {
//  * fn:function(number):void,
//  * time:number,
//  * }
//  * ]}
//  */
// const setFuncs = [];

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
function addFunc(startTime, length, easing, fn)
{
    funcs.push({
        startTime: startTime * 1000,
        length: length * 1000,
        easing,
        fn
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