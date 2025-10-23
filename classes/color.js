/**
 * @type {import("../types/color").Color}
 */
class Color {
    constructor(r = 0, g = 0, b = 0, a = 1)
    {
        this.rgba(r,g,b,a);
    }

    rgba(r = this.r, g = this.g, b = this.b, a = this.a)
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

    static random(alpha = 1)
    {
        return new Color(Math.random(), Math.random(), Math.random(), alpha)
    }
}
