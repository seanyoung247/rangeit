import Range from "../range.js";

describe('Range class', () => {

    describe('range creation', () => {
        test('Creates correct range with no parameters', () => {
            const rng = new Range();
            expect(rng.size).toBeGreaterThan(0);
        });
        test('Creates correct range with one parameter', () => {
            const rng = new Range(5);
            const comp = [0,1,2,3,4,5];
            expect([...rng]).toEqual(comp);
        });
        test('Creates correct range with two parameters', () => {
            const rng = new Range(1, 5);
            const comp = [1,2,3,4,5];
            expect([...rng]).toEqual(comp);
        });
        test('Creates correct range with three parameters', () => {
            const rng = new Range(1, 10, 2);
            const comp = [1,3,5,7,9];
            expect([...rng]).toEqual(comp);
        });
        test('Creates reverse ranges', () => {
            const rng = new Range(10, 1, -1);
            const comp = [10,9,8,7,6,5,4,3,2,1];
            expect([...rng]).toEqual(comp);
        });

        test('Floating point ranges', () => {
            const rng = new Range(0.5, 0.55, 0.01);
            const comp = [0.5,0.51,0.52,0.53,0.54,0.55];
            expect([...rng]).toEqual(comp);
        });

        test('Handles ranges with no valid steps', () => {
            const rng = new Range(10,1,1);
            const comp = [];
            expect([...rng]).toEqual(comp);
        });
        test('Throws error on incorrect parameters', () => {
            expect(() => new Range(1, 10, '2')).toThrow(TypeError);
            expect(() => new Range(1, {}, 2)).toThrow('All range inputs must be valid numbers');
        });
    });
});