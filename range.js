/**
 * Range Class
 * 
 * Models a range of numbers between start and stop with a given step interval.
 */
export default class Range {
        /**
     * Creates a new number range.
     * If no values given, the range will be 0 to MAX_SAFE_INTEGER.
     * If one number is passed, the range will be 0 to given number.
     * If two numbers are passed, the range will be start to stop.
     * If three numbers are passed, the range will be start to stop 
     * with interval step.
     * 
     * @param {Number} start (optional) First value in range
     * @param {Number} stop (optional) Range upper bound
     * @param {Number} step (optional) Interval step
     */
    constructor(start, stop=start, step=1) {
        this._start = start === stop ? 0 : start;
        this._stop = stop === undefined ? Number.MAX_SAFE_INTEGER : stop;
        this._step = step;
        /**
         * normaliser is used to remove floating point imprecision from step calculations.
         * Default value is 1e10 which should work for most circumstances, but can be changed
         * if required. Calculations are multiplied by this number to make step
         * calculations integer operations instead of floating point operations.
         * @type {Number}
         * @public
         */
        this.normaliser = 1e10;
        // If Range has been initialised with any invalid values, raise exception
        if (!Object.values(this).every(el => Number.isFinite(el))) {
            throw new TypeError('All range inputs must be valid numbers');
        }
    }

    /**
     * Iterates through the range
     */
    *[Symbol.iterator]() {
        const size = this.size;
        let count = this._start;
        for (let i = 0; i < size; i++) {
            yield count;
            count = (this._normalise(count) + this._normalise(this._step)) / this.normaliser;
        }
    }

    /**
     * Provides the range size.
     * @returns The count of valid numbers in the range
     */
    get size() {
        const size = (1 + Math.floor((this._stop - this._start) / this._step));
        return size > 0 ? size : 0;
    }

    /**
     * Returns whether the given value is a valid step within the current range
     * @param {Number} value - Value to test
     * @returns {Boolean} - True if value is valid step in range, otherwise false
     */
    inRange(value) {
        const min = Math.min(this._start, this._stop);
        const max = Math.max(this._start, this._stop);

        return (
            (value >= min) && (value <= max) && (this.size > 0) &&
            ((this._normalise(value) - this._normalise(this._start)) 
            % this._normalise(this._step) === 0)
        );
    }
    
    /* Internal use only */
    _normalise(value) {
        return Math.round(value * this.normaliser);
    }
}