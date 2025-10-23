export class Color {

    r: number;
    g: number;
    b: number;
    a: number;

    /**
     * @description r, g, b, a; values that range from numbers between 0 and 1.
     * @param r number from 0 - 1 (default: 0)
     * @param g number from 0 - 1 (default: 0)
     * @param b number from 0 - 1 (default: 0)
     * @param a number from 0 - 1 (default: 1)
     */
    constructor(r?: number = 0, g?: number = 0, b?: number = 0, a?: number = 1)
    {
        this.rgba(r, g, b, a);
    }

    rgba(r: number = 0, g: number = 0, b: number = 0, a: number = 1)
    {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    static random(alpha?: number): Color;
}