import {Range, range} from "../range.js";
import {example} from "./utils.js";

(()=>{

const rng = range(0, 10, 2); // (0,2,4,6,8,10)


example(
    'Creating a range with one parameter:',

    ()=>(new Range(5)).size === 6 // (0,1,2,3,4,5)
);


example(
    'Creating a range with two parameters:',

    ()=>(new Range(1, 5)).size === 5 // (1,2,3,4,5)
)


example(
    'Creating a range with three parameters:',
    
    ()=>(new Range(1, 5, 2)).size === 3 // (1,3,5)
)


example(
    'Creating a range with helper function:',

    ()=>(
        (range(5).size === 6) && 
        (range(1, 5).size === 5) &&
        (range(1, 5, 2).size === 3)
    )
);


example(
    'Getting range(0, 10, 2) size:',

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

    ()=>console.log('range(0, 10, 2).step(2) ===', rng.step(2))
);


example(
    'Getting index from range value:',

    ()=>console.log('range(0, 10, 2).indexOf(4) ===', rng.indexOf(4))
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