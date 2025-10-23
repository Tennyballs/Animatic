const {abs, sin, pow} = Math;
/**
 * @tutorial Ease.{Enum.Ease}
 * @author CrittericallyOnline
 * @description Filled to the brim with functions!
 */
class Ease {
    /**
     * 
     * @param {function(number):number} ease 
     * @returns {function(number):number}
     */
    static flip(ease)
    {
        return function(t){
            return 1 - ease(t);
        }
    }
    
    /**
     * 
     * @param {number} t 
     * @returns number
     */
    static bounce(t)
    {
        return 4 * t * (1 - t);
    }

    /**
     * 
     * @param {number} t 
     * @returns number
     */
    static tri(t)
    {
        return 1 - abs(2 * t - 1);
    }

    /**
     * 
     * @param {number} t 
     * @returns number
     */
    static bell(t)
    {
        return Ease.inOutQuint(Ease.tri(t));
    }

    /**
     * 
     * @param {number} t 
     * @returns number
     */
    static pop(t)
    {
        return 3.5 * (1 - t) * (1 - t) * sqrt(t);
    }

    /**
     * 
     * @param {number} t 
     * @returns number
     */
    static tap(t)
    {
        return 3.5 * t * t * sqrt(1 - t);
    }

    /**
     * 
     * @param {number} t 
     * @returns number
     */
    static pulse(t)
    {
        return t < 0.5 && Ease.tap(t * 2) || -Ease.pop(t * 2 - 1);
    }

    /**
     * 
     * @param {number} t 
     * @returns number
     */
    static spike(t)
    {
        return exp(-10 * abs(2 * t - 1));
    }

    /**
     * 
     * @param {number} t 
     * @returns number
     */
    static inverse(t)
    {
        return t * t * (1 - t) * (1 - t) / (0.5 - t)
    }

    /**
     * @private
     * @param {number} t 
     * @param {number} damp 
     * @param {number} count 
     * @returns {number}
     */
    static popElasticInternal(t, damp, count)
    {
        return (1000 ^ -(t ** damp) - 0.001) * sin(count * pi * t)
    }

    /**
     * @private
     * @param {number} t 
     * @param {number} damp 
     * @param {number} count 
     * @returns {number}
     */
    static tapElasticInternal(t, damp, count)
    {
        return (1000 ** -((1 - t) ^ damp) - 0.001) * sin(count * pi * (1 - t))
    }
    
    /**
     * 
     * @param {number} t 
     * @returns {1}
     */
    static instant(t)
    {
        return 1;
    }

    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static linear(t)
    {
        return t;
    }

    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static inQuad(t)
    {
        return pow(t, 2);
    }

    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static outQuad(t)
    {
        return -t * (t - 2);
    }

    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static inOutQuad(t)
    {
        t *= 2;
        return t < 1 ? 0.5 * (t ** 2) : 1 - 0.5 * ((2 - t) ** 2);
    }

    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static outInQuad(t)
    {
        t *= 2;
        return t < 1 ? 0.5 - 0.5 * ((1 - t) ** 2) : 0.5 + 0.5 * ((t - 1) ** 2);
    }

    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static inCubic(t)
    {
        return pow(t, 3);
    }

    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static outCubic(t)
    {
        return 1 - Math.pow((1 - t), 3);
    }

    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static inOutCubic(t)
    {
        t = t * 2
        return t < 1 ? 0.5 * pow(t, 3) : 1 - (0.5 * pow(2 - t, 3));
    }

    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static outInCubic(t)
    {
        t *= 2
        return t < 1 ? 0.5 - 0.5 * pow(1 - t, 3) : 0.5 + (0.5 * pow(t - 1, 3));
    }

    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static inQuart(t)
    {
        return pow(t, 4);
    }

    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static outQuart(t)
    {
        return 1 - pow(1 - t, 4);
    }

    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static inOutQuart(t)
    {
        t *= 2;
        return t < 1 ? 0.5 * pow(t, 4) : 1 - (0.5 * pow(2 - t, 4));
    }


    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static inQuint(t)
    {
        return pow(t, 5);
    }
    
    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static outQuint(t)
    {
        return 1 - pow(1 - t, 5);
    }
    
    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static inOutQuint(t)
    {
        t *= 2;
        return t < 1 ? 0.5 - (0.5 * pow(1 - t, 5)) : 0.5 + (0.5 * pow(t - 1, 5));
    }

    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static outInQuint(t)
    {
        t *= 2;
        return t < 1 ? 0.5 - (0.5 * pow(1 - t, 5)) : 0.5 + (0.5 * pow(t - 1, 5));
    }

    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static outInQuart(t)
    {
        t *= 2;
        return t < 1 ? 0.5 - (0.5 * pow(1 - t, 5)) : 0.5 + (0.5 * pow(t - 1, 5));
    }

    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static inExpo(t)
    {
        return pow(1000, t - 1) - 0.001;
    }

    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static outExpo(t)
    {
        return 1.001 - pow(1000, -t);
    }

    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static inOutExpo(t)
    {
        t *= 2;
        return t < 1 ? 0.5 * pow(1000, t - 1) - 0.0005 : 1.0005 - (0.5 * pow(1000, 1 - t));
    }

    /**
     * 
     * @param {number} t 
     * @returns {number}
     */
    static outInExpo(t)
    {
        t *= 2;
        return t < 1 ? Ease.outExpo(t * 2) * 0.5 : Ease.inExpo(t * 2 - 1) * 0.5 + 0.5;
    }
    
}