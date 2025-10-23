/**
 * @abstract
 */
class Shape {

    /**
     * rotation
     * @type {number} rotation in degrees.
     * @description (rotation * (Math.PI / 180))
     */
    rotation;

    /**
     * @param {number} x x-coordinate
     * @param {number} y y-coordinate
     */
    constructor(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }

    /**
     * @param {number} x x-coordinate
     * @param {number} y y-coordinate
     */
    xy(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }
}