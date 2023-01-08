import Range from "../range.js";


example(
    'Iterating over a range:',

    () => {
        for (const value of new Range(5)) {
            console.log(value);
        }
    }
)


example(
    'Creating an array from a range:',

    () => [...new Range(5)]
)



function example(title, func) {
    console.log(title);
    const ret = func();
    if (ret) console.log(ret);
}
