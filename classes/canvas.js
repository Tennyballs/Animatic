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
}