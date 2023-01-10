# rangejs

This module is an ES6 class for creating number ranges with step intervals. Basic usage is inspired by Python's range function, but with extra methods for validating values, accessing steps out of order and by index.

[JSDOC](https://seanyoung247.github.io/rangejs/)

* Range
    * [constructor](#constructor)
    * [iterator](#iterator)
    * [size](#size)
    * [step](#step)
    * [indexOf](#indexof)
    * [inRange](#inrange)
    * [wrap](#wrap)
    * [clamp](#clamp)

### Constructor

#### new Range(start, stop, step)

Creates a new number range object.
If one number is passed, the range will be 0 to the given number.
If two numbers are passed, the range will run from start to stop (inclusive).
If three numbers are passed, the range will run from start to stop with interval step.


Parameters:
| Param | Type | Description |
| --- | --- | --- |
| start | Number | (optional) First value in range |
| stop | Number | Last value in range |
| step | Number | (optional) Step interval |

**Example**
```javascript
import { Range } from "range";

const rng1 = new Range(10);      // (0,1,2,3,4,5,6,7,8,9,10)
const rng2 = new Range(1,10);    // (1,2,3,4,5,6,7,8,9,10)
const rng3 = new Range(1,10,2);  // (1,3,5,7,9)
const rng4 = new Range(10,1);    // (10,9,8,7,6,5,4,3,2,1)
const rng5 = new Range(10,1,-2); // (10,8,6,4,2)
```

Range objects can also be created with the [range]() function:
```javascript
import { range } from "range";

const rng1 = range(10);      // (0,1,2,3,4,5,6,7,8,9,10)
const rng2 = range(1,10);    // (1,2,3,4,5,6,7,8,9,10)
const rng3 = range(1,10,2);  // (1,3,5,7,9)
const rng4 = range(10,1);    // (10,9,8,7,6,5,4,3,2,1)
const rng5 = range(10,1,-2); // (10,8,6,4,2)
```

### Iterator

Range values can be iterated over in for of loops or using the spread operator, for instance:
```javascript
import { range } from "range";

for (const value of range(5)) {
    console.log(value);
}

console.log([...range(5)]);
```

### Size

The size property gets the number of valid steps in the range.
```javascript
import { range } from "range";

const rng = range(5); // (0,1,2,3,4,5)
console.log(rng.size); // 6
```

### Step

#### step(index)

The step method returns an arbitary step value from the range based on it's index.

Parameters:
| Param | Type | Description |
| --- | --- | --- |
| index | Number | The index of the step |

```javascript
import { range } from "range";

const rng = range(1,10,2); // (1,3,5,7,9)
console.log(rng.step(2));  // 5
```

### indexOf

#### indexOf(value)

Returns the index of a given range step value, or -1 if the value is not in the range.

Parameters:
| Param | Type | Description |
| --- | --- | --- |
| value | Number | Step value to find |

```javascript
import { range } from "range";

const rng = range(1,10,2);   // (1,3,5,7,9)
console.log(rng.indexOf(5)); // 2 
```

### inRange

#### inRange(value)

Returns whether the given value is a valid step within the current range

Parameters:
| Param | Type | Description |
| --- | --- | --- |
| value | Number | Value to test |

```javascript
import { range } from "range";

const rng = range(1,10,2); // (1,3,5,7,9)
console.log(rng.inRange(-1)); // false
console.log(rng.inRange(10)); // false
console.log(rng.inRange(6));  // false
console.log(rng.inRange(5));  // true
```

### wrap

#### wrap(value)

Wraps the given value within the range. If the value is above the maximum, it's wrapped back from the minimum and vice versa. If the value is within the range, but is not a valid step, the closest valid step is returned.

Parameters:
| Param | Type | Description |
| --- | --- | --- |
| value | Number | Value to wrap |

```javascript
import { range } from "range";

const rng = range(1,10); // (1,2,3,4,5,6,7,8,9,10)
console.log(rng.wrap(-2));  // 7
console.log(rng.wrap(12));  // 3
console.log(rng.wrap(1.5)); // 2
```

### clamp

#### clamp(value)

Clamps the given value within the range. If the value is above the maximum, maximum is returned. If it is below the minimum, minimum is returned. If the value is within the range, but is not a valid step, the closest valid step is returned.

Parameters:
| Param | Type | Description |
| --- | --- | --- |
| value | Number | Value to clamp |

```javascript
import { range } from "range";

const rng = range(1,10); // (1,2,3,4,5,6,7,8,9,10)
console.log(rng.clamp(-2));  // 1
console.log(rng.clamp(12));  // 10
console.log(rng.clamp(1.5)); // 2
```