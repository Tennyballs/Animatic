
async function getSize(src){
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img); // Resolve the promise when the image loads
        img.onerror = (error) => reject(error); // Reject the promise if an error occurs
        img.src = src;
    });

}

class Texture2D {

    /**
     * @type {number}
     */
    width;
    height;

    /**
     * @type {URL | string}
     */
    src;

    /**
     * @type {HTMLImageElement}
     */
    element;

    /**
     * @type {boolean}
     */
    isUV

    /**
     * Texture2D
     * @param {URL | string} src [Image Source]
     * @param {boolean} isUV [Default: false]
     * @param {{ width: number; height: number; } | null} size
     */
    constructor(src,  size, isUV = false) {
        this.src = src;
        this.ready = false;
        this.element;
        this.isUV = isUV;
        this.width = 0;
        this.height = 0;

        this.getSize(src)
            .then((image) => {
                if(size){
                    size.width = image.naturalWidth;
                    size.height = image.naturalHeight;
                }
                this.element = image;
                this.width = size.width;
                this.height = size.height;
            }
        ).catch(err => {
            console.err(`there was an error loading a resource from ${src}`);
        });
    }



    /**
     * getSize
     * @param {URL | string} src 
     * @returns {Promise<Image>}
     */
    getSize(src)
    {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img); // Resolve the promise when the image loads
            img.onerror = (error) => reject(error); // Reject the promise if an error occurs
            img.src = src;
        });
    }

    get(x1, y1)
    {
        return [0, 0, 0, 0]
    }

    static randomNoise()
    {
        
    }

}