
/**
 * Range Class
 * 
 * Models a range of numbers between start and stop with a given step interval.
 */
export class Range {
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
        const step = this._normalise(this._step);
        let count = this._normalise(this._start);
        for (let i = 0; i < size; i++) {
            yield this._deNormalise(count);
            count += step;
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
     * Returns the value of a step at index given
     * @param {Number} index - The index of the step
     * @returns {Number} The step value
     */
    step(index) {
        const value = this._indexToStep(index);
        if (!this.inRange(value)) throw new Error('Invalid index');
        return value;
    }

    /**
     * Returns the index of a given step in the range
     * @param {Number} value - Value to find
     * @returns {Number} The step index of the value
     */
    indexOf(value) {
        return this.inRange(value) ? this._stepToIndex(value) : -1;
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

    /**
     * Wraps the given value within the range. If the value is above the maximum, 
     * it's wrapped back from the minimum and vice versa. If the value is within 
     * the range, but is not a valid step, the closest valid step is returned.
     * @param {Number} value - value to wrap
     * @returns {Number} - Wrapped value
     */
    wrap(value) {
        const min = Math.min(this._start, this._stop);
        const max = Math.max(this._start, this._stop);
        const wrapped = (( (value % (max - min)) 
            + (max - min)) % (max - min) + min);

        return this._makeValidStep(wrapped);
    }

    /**
     * Clamps the given value within the range. If the value is above the maximum,
     * maximum is returned. If it is below the minimum, minimum is returned. If the
     * value is within the range, but is not a valid step, the closest valid step 
     * is returned.
     * @param {Number} value - value to wrap
     * @returns {Number} - Wrapped value
     */
    clamp(value) {
        const min = Math.min(this._start, this._stop);
        const max = Math.max(this._start, this._stop);

        return this._makeValidStep(Math.min(Math.max(value, min), max));
    }

    /* Internal use only */
    _normalise(value) {
        // Only need to normalise if the range values are floating point
        if (Object.values(this).every(el => Number.isInteger(el))) return value;
        return Math.round(value * this.normaliser);
    }

    _deNormalise(value) {
        if (Object.values(this).every(el => Number.isInteger(el))) return value;
        return value / this.normaliser;
    }

    _stepToIndex(value) {
        return Math.abs((this._normalise(value) - this._normalise(this._start)) / this._normalise(this._step));
    }

    _indexToStep(index) {
        return this._deNormalise(this._normalise(this._start) + (this._normalise(this._step) * index));
    }

    _makeValidStep(value) {
        return this._indexToStep(Math.round(this._stepToIndex(value)));
    }
}

export function range(start, stop=start, step=1) {
    return new Range(start, stop, step)
}
