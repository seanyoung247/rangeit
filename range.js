
/**
 * Range Class
 * 
 * Models a range of numbers between start and stop with a given step interval.
 */
export class Range {
    /**
     * Creates a new number range object.
     * If one number is passed, the range will be 0 to given number.
     * If two numbers are passed, the range will be start to stop.
     * If three numbers are passed, the range will be start to stop 
     * with interval step.
     * 
     * @param {Number} start (optional) First value in range
     * @param {Number} stop Range upper bound
     * @param {Number} step (optional) Interval step
     */
    constructor(start, stop=start, step=1) {
        this._start = start === stop ? 0 : start;
        this._stop = stop;
        this._step = step;

        this._normaliser = 1e10;
        // If Range has been initialised with any invalid values, raise exception
        if (!checkValues(this, Number.isFinite)) {
            throw new TypeError('Tried to create range with invalid inputs');
        }
    }

    /**
     * Iterates through the range
     */
    *[Symbol.iterator]() {
        const size = this.size;
        const step = normalise(this._step, this);
        let count = normalise(this._start, this);
        for (let i = 0; i < size; i++) {
            yield deNormalise(count, this);
            count += step;
        }
    }

    /**
     * Returns the count of valid steps within the range.
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
        const value = indexToStep(index, this);
        if (!this.inRange(value)) throw new Error('Invalid index');
        return value;
    }

    /**
     * Returns the index of a given step in the range
     * @param {Number} value - Value to find
     * @returns {Number} The step index of the value, or -1 if not in range
     */
    indexOf(value) {
        return this.inRange(value) ? stepToIndex(value, this) : -1;
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
            ((normalise(value, this) - normalise(this._start, this)) %
            normalise(this._step, this) === 0)
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
        const wrapped = (( (value % (max - min)) +
            (max - min)) % (max - min) + min);

        return makeValidStep(wrapped, this);
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

        return makeValidStep(Math.min(Math.max(value, min), max), this);
    }
}


/**
 * Creates a new number range.
 * If one number is passed, the range will be 0 to given number.
 * If two numbers are passed, the range will be start to stop.
 * If three numbers are passed, the range will be start to stop 
 * with interval step.
 * 
 * @param {Number} start (optional) First value in range
 * @param {Number} stop Range upper bound
 * @param {Number} step (optional) Interval step
 */
export function range(start, stop=start, step=1) {
    return new Range(start, stop, step);
}


/* Helper functions */
function checkValues(rng, comp) {
    return comp(rng._start) && comp(rng._stop) && comp(rng._step);
}

function normalise(value, rng) {
    return Math.round(value * rng._normaliser);
}

function deNormalise(value, rng) {
    return value / rng._normaliser;
}

function stepToIndex(value, rng) {
    return Math.abs((normalise(value, rng) - normalise(rng._start, rng)) / normalise(rng._step, rng));
}

function indexToStep(index, rng) {
    return deNormalise(normalise(rng._start, rng) + (normalise(rng._step, rng) * index), rng);
}

function makeValidStep(value, rng) {
    return indexToStep(Math.round(stepToIndex(value, rng)), rng); 
}
