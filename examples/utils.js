
export function example(title, func, ws=true) {
    console.log(title);
    const ret = func();
    if (ret) console.log(ret);
    if (ws) console.log();
}
