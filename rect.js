
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
     * @returns {string}
     */
    toString()
    {
        return `Rect(x=${this.x}, y=${this.y}, width=${this.width}, height=${this.height}, fillColor="${this.fillColor.toString()}, outlineColor="${this.outlineColor.toString()}", rotation=${this.rotation})`
    }
}