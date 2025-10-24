class Canvas {
    
    /**
     * @type {Music}
     */
    sync;

    /**
     * @type {number}
     */
    width;
    height;
    
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
     * @private
     * @type {Rect[]}
     */
    children;

    /**
     * 
     * @param {string} id 
     * @param {number} width 
     * @param {number} height 
     * @param {{ willReadFrequently: boolean; }} [contextSettings={willReadFrequently: false}] 
     */
    constructor(id, width = 1, height = 1, contextSettings = {willReadFrequently: false})
    {
        this.children = [];

        this.element = document.createElement('canvas');
        this.element.width = width;
        this.element.height = height;
        this.element.id = id;

        window.CANVAS_WIDTH = width;
        window.CANVAS_HEIGHT = height;
        window.SCX = width / 2;
        window.SCY = height / 2;

        document.body.appendChild(this.element);

        this.ctx = this.element.getContext('2d', contextSettings);
        this.ctx.fillRect(0, 0, width, height)
    }

    getChildren()
    {
        return this.children;
    }

    clear()
    {
        this.ctx.fillRect(0, 0, this.width, this.height);
        return this;
    }

    getCtx()
    {
        return this.ctx
    }
    
    /**
     * @param {Music} music
     * @param {"beat"|"time"} [mode="beat"] 
     */
    syncMusic(music, mode = "beat")
    {
        this.sync = music;
        this.syncMode = mode;
    }

    add(child)
    {
        this.children.push(child);
    }

    getBeat(time = (performance.now() / 1000))
    {
        if(this.sync)
        {
            if(this.syncMode == "beat")
            {
                return (this.sync.getTime() + this.sync.offset) * (this.sync.bpm / 60);
            }
            return this.sync.getTime();
        }

        return time;
    }
}

/**
 * @type {{beat:number,len:number,easing:function(number):void,object:Object,property:string,value:number}[]}
 */
const eases = [];
const func_eases = [];
const funcs = [];
const set = [];
const resets = [];

/**
 * @type {Canvas}
 */
let mainCanvas;

let ctx;
function loop()
{
    const beat = mainCanvas.getBeat()
    eases.forEach(fn => {
        if(fn.beat <= beat && fn.beat + fn.len >= beat)
        {
            /**
             * @type {number} a 0-1
             */
            let a = fn.object[fn.property]
            let b = fn.value
            let v = fn.easing((beat - fn.beat) / fn.len)
            fn.object[fn.property] = (v * (b - a) + a)
            console.log(fn.object[fn.property].toFixed(3))
        }
    });
    if(!ctx && mainCanvas)
    {
        ctx = mainCanvas.getCtx();
    }
    if(ctx)
    {
        mainCanvas.clear().getChildren().forEach(element => {
            element.draw(ctx);
        });
    }
    requestAnimationFrame(loop);
}

/**
 * 
 * @param {number} beat 
 * @param {number} len (in beats)
 * @param {Ease} ease specified Easing type
 * @param {Object} obj object that has [property]
 * @param {string} property contained in the object (to be modified)
 * @param {number} value new value
 * @returns 
 */
function ease(beat, len, easing, object, property, value)
{
    eases.push({beat, len, easing, object, property, value})
}

