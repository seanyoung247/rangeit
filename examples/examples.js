import {Range, range} from "../range.js";
import {example} from "./utils.js";

(()=>{

const rng = range(0, 10, 2);


example(
    'Creating a range with one parameter:',

    ()=>{
        const rng = new Range(5);
        return rng.size === 6;
    }
);


example(
    'Creating a range with two parameters:',

    ()=>{
        const rng = new Range(1, 5);
        return rng.size === 5;
    }
)


example(
    'Creating a range with three parameters:',
    
    ()=>{
        const rng = new Range(1, 5, 2);
        return rng.size === 3;
    }
)


example(
    'Creating a range with helper function:',

    ()=>{
        const rng1 = range(5);
        const rng2 = range(1, 5);
        const rng3 = range(1, 5, 2);

        return (rng1.size === 6) && (rng2.size === 5) && (rng3.size === 3);
    }
);


example(
    'Getting range size:',

    ()=>rng.size
);


example(
    'Iterating over a range:',

    ()=>{
        for (const value of new Range(5)) {
            console.log(value);
        }
    }
);


example(
    'Creating an array from a range:',

    ()=>[...new Range(5)]
);


example(
    'Checking whether a value is a valid range step:',

    ()=>{
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

    ()=>rng.step(2)
);


example(
    'Getting index from range value:',

    ()=>rng.indexOf(4)
);


example(
    'Wrapping values to range:',

    ()=>{
        console.log('-3 wrapped to range(0, 10, 2):',
            rng.wrap(-3)
        );
        console.log('13 wrapped to range(0, 10, 2):',
            rng.wrap(13)
        );
        console.log('3 wrapped to range(0, 10, 2):',
            rng.wrap(3)
        );
    }
);


example(
    'Clamping values to range:',

    ()=>{
        console.log('-3 clamped to range(0, 10, 2):',
            rng.clamp(-3)
        );
        console.log('13 clamped to range(0, 10, 2):',
            rng.clamp(13)
        );
        console.log('3 clamped to range(0, 10, 2):',
            rng.clamp(3)
        );
    }
)

})();