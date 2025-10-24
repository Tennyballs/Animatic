/**
 * @typedef {import("../types/Actor").Actor} Actor
 */

const { min, max } = Math;


/**
 * @type {Actor[]}
 */
const actors = [];

/**
 * Color3
 */
class Color3 {
    /**
     * @private
     */
    clamp = (val, mn, mx) => min(max(val, mn), mx);

    // Attr
    value;

    constructor(r = 1, g = 1, b = 1, a = 1){
        this.value = (Math.floor(r * 255) & 0xFF) << 24 | (Math.floor(g * 255) & 0xFF) << 16 | (Math.floor(b * 255) & 0xFF) << 8 | (Math.floor(a * 255) & 0xFF);
    }

    get r()
    {
        return (this.value >> 24) & 0xFF;
    }

    get g()
    {
        return (this.value >> 16) & 0xFF;
    }

    get b()
    {
        return (this.value >> 8) & 0xFF;
    }

    get a()
    {
        return this.value & 0xFF;
    }

    toString()
    {
        return `#${this.r.toString(16) + this.g.toString(16) + this.b.toString(16) + this.a.toString(16)}`
    }
}

/**
 * Actor
 */
class Actor {
    /**
     * @private
     */
    clamp = (val, mn, mx) => min(max(val, mn), mx);


    // Attr
    x;
    y;
    width;
    height;
    rotation;

    /**
     * @type {number[]} 2 numbers in this array, x and y pivot from 0 to 1 on the
     */
    pivotPoint;

    /**
     * @type {Texture2D}
     */
    texture;
    /**
     * @type {Texture2D}
     */
    normal;

    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.rotation = 0;
        this.pivotPoint = [0.5, 0.5];

        this.texture = null;
        this.normal = null;

        actors.push(this);
    }

    /**
     * Sets the position and size of the Actor without needing more Functions.
     * @param {number} x [Default: null]
     * @param {number} y [Default: null]
     * @param {number} w [Default: null]
     * @param {number} h [Default: null]
     * @returns {Actor} this
     */
    xywh(x, y, w, h)
    {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        return this;
    }

    /**
     * @param {number} degrees Degrees of rotation on the z-plane.
     * @returns {Actor} this
     */
    rotate(degrees)
    {
        this.rotation += degrees;
        return this;
    }

    /**
     * @param {number} x [0 - 1]
     * @param {number} y [0 - 1]
     * @returns {Actor} this
     */
    pivot(x, y){
        x = this.clamp(x, 0, 1);
        y = this.clamp(y, 0, 1);
        this.pivotPoint = [x, y];
        return this;
    }

    /**
     * @param {number | string} axis
     * @example
     * getPivot(0) = x
     * getPivot(1) = y
     * getPivot("2") = x
     * getPivot("3") = y
     * getPivot("x") = x
     * getPivot("y") = y
     * getPivot("z") = null
     */
    getPivot(axis)
    {
        if(typeof(axis) == "string"){
            // simplify :pleading:
            let int = parseInt(axis);
            return (axis == 'x' || int & 1 != 0) ? this.pivotPoint[0] : (axis == 'y' || int & 1 == 0) ? this.pivotPoint[1] : null;
        }
        if(typeof(axis) == "number")
        {
            return this.pivotPoint[axis%2];
        }
        return null;
    }

    /**
     * @param {Texture2D} tex 
     * @returns {Actor} this
     */
    setTexture(tex){
        this.texture = tex;
        return this;
    }

    getTexture()
    {
        return this.texture;
    }

    /**
     * @param {Texture2D} tex 
     * @returns {Actor} this
     */
    setNormal(tex){
        this.normal = tex;
        return this;
    }

    getNormal()
    {
        return this.normal;
    }


    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx)
    {
        
    }
}


/**
 * PointLight
 */
class PointLight {
    // Attr
    x;
    y;
    width;
    height;

    /**
     * @type {Color}
     */
    color;

    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.color = new Color3(1, 0, 0)

        actors.push(this);
    }

    /**
     * Sets the position and size of the Actor without needing more Functions.
     * @param {number} x [Default: null]
     * @param {number} y [Default: null]
     * @param {number} w [Default: null]
     * @param {number} h [Default: null]
     * @returns {Actor} this
     */
    xywh(x, y, w, h)
    {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        return this;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx)
    {
        ctx.save();
        ctx.translate(this.x - this.width / 2, this.y - this.height / 2);
        for(let x = -this.width / 2; x < this.width / 2; x++)
        {
            for(let y = -this.width / 2; y < this.width / 2; y++)
            {
                ctx.fillStyle = 
                ctx.fillRect(x, y, 1, 1)
            }
        }
        ctx.restore();
    }
}