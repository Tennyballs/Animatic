/**
 * @private
 * @param {number} v [0-1]
 */
function c(v){
    return Math.floor(v * 255).toString(16)
}

/**
 * @typedef {import("../types/Color").Color} Color
 * @type {Color}
 */
class Color {
    /**
     * @type {number}
     */
    value
    
    /**
     * 
     * @param {number} r 
     * @param {number} g 
     * @param {number} b 
     * @param {number} a 
     */
    constructor(r = 1, g = 1, b = 1, a = 1)
    {
        this.value = 0;
        this.rgba(r * 255, g * 255, b * 255, a * 255);
    }

    rgba(r = (this.color & 0xFF000000) / 255, g = (this.color & 0xFF0000) / 255, b = (this.color & 0xFF00) / 255, a = (this.color & 0xFF) / 255)
    {
        this.value = r << 24 | g << 16 | b << 8 | a;
    }

    static random(a = 1)
    {
        return new Color(Math.random(), Math.random(), Math.random(), a)
    }

    /**
     * @returns {string}
     */
    toString()
    {
        return `#${c(this.r)+c(this.g)+c(this.b)+c(this.a)}`
    }
}