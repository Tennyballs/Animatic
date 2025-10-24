export interface Color {

    // attributes
    /**
     * @private
     */
    value: number;

    /**
     * Constructor
     * @default r = 0;
     * @default g = 0;
     * @default b = 0;
     * @default a = 0;
     */
    constructor(r? : number, g? : number, b? : number, a? : number): Color;

    // Methods
    /**
     * toHSV
     * @returns {string}
     * @description Turns the r, g, b, a channels into H, S, and V (alpha staying the same)
     */
    toHSV(): string;

    /**
     * toArray
     * @description Returns the r, g, b, a values as an array in the order [r, g, b, a].
     * these values range from 0 to 255.
     */
    toArray(): number[];

    /**
     * @returns {string}
     * @override
     * @description turns the r, g, b, a values into a single hex code
     * @example rgba(67, 255, 100, 0.85) -> `#43ff64d9`
     */
    toString(): string;
}