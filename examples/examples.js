import Range, {range} from "../range.js";


const rng = range(0, 10, 2);


example(
    'Creating a range with no parameters:',

    () => {
        const rng = new Range();
        return rng.size > 0
    }
);


example(
    'Creating a range with one parameter:',

    () => {
        const rng = new Range(5);
        return rng.size === 6;
    }
);


example(
    'Creating a range with two parameters:',

    () => {
        const rng = new Range(1, 5);
        return rng.size === 5;
    }
)


example(
    'Creating a range with three parameters:',
    
    () => {
        const rng = new Range(1, 5, 2);
        return rng.size === 3;
    }
)


example(
    'Creating a range with helper function:',

    () => {
        const rng1 = range();
        const rng2 = range(5);
        const rng3 = range(1, 5);
        const rng4 = range(1, 5, 2);

        return (rng1.size > 0) && (rng2.size === 6) && (rng3.size === 5) && (rng4.size === 3);
    }
);


example(
    'Getting range size:',

    () => rng.size
);


example(
    'Iterating over a range:',

    () => {
        for (const value of new Range(5)) {
            console.log(value);
        }
    }
);


example(
    'Creating an array from a range:',

    () => [...new Range(5)]
);


example(
    'Checking whether a value is a valid range step:',

    () => {
        console.log("-1 in range(0, 10, 2):", 
            rng.inRange(-1)
        );
        console.log("15 in range(0, 10, 2):", 
            rng.inRange(15)
        );
        console.log("1.5 in range(0, 10, 2):", 
            rng.inRange(1.5)
        );
        console.log("5 in range(0, 10, 2):",
            rng.inRange(5)
        );
        console.log("6 in range(0, 10, 2):",
            rng.inRange(6)
        );
    }
);


example(
    'Getting range values from index:',

    () => rng.step(2)
);


example(
    'Checking whether a value is a valid range step:',

    () => {
        console.log("-1 in range(0, 10, 2): ", rng.inRange(-1));
        console.log("15 in range(0, 10, 2): ", rng.inRange(15));
        console.log("1.5 in range(0, 10, 2): ", rng.inRange(1.5));
        console.log("5 in range(0, 10, 2): ", rng.inRange(5));
        console.log("6 in range(0, 10, 2): ", rng.inRange(6))
    }
);


function example(title, func) {
    console.log(title);
    const ret = func();
    if (ret) console.log(ret);
}
