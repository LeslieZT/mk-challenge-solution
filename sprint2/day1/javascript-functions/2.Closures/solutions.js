// *****  1. Simple Counter
console.log("---------------- Exercise 1: ----------------");
function createSimpleCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}
const counter = createSimpleCounter();
console.log(counter());
console.log(counter());

// *****  2. Greeting Generator
console.log("---------------- Exercise 2: ----------------");
function greet(name) {
  return function (message) {
    console.log(`${message}, ${name}!`);
  };
}
const greetJohn = greet("John");
greetJohn("Hello");

// *****  3. Multiplier Function
console.log("---------------- Exercise 3: ----------------");
function createMultiplier(n) {
  return function (m) {
    return n * m;
  };
}
const double = createMultiplier(2);
console.log(double(5));

/*************************************************************************/
console.log("************************************************************");

// *****  1. Memoization Function
console.log("---------------- Exercise 1: ----------------");
function memoize(fn) {
  const cache = {};
  return function (arg) {
    const key = `${fn.name}(${arg})`;
    if (cache[key]) {
      console.log("use cache");
      return cache[key];
    } else {
      const result = fn(arg);
      cache[key] = result;
      return result;
    }
  };
}
const slowSquare = (n) => {
  for (let i = 0; i < 1000000000; i++) {} // Simulate slow computation
  return n * n;
};
const fastSquare = memoize(slowSquare);
console.log(fastSquare(5));
console.log(fastSquare(5));

// *****  2. Private Counter with Reset
console.log("---------------- Exercise 2: ----------------");
const createCounter = function () {
  let count = 0;
  return {
    increment: function () {
      count++;
      return count;
    },
    reset: function () {
      count = 0;
    },
  };
};
const myCounter = createCounter();
console.log(myCounter.increment()); // Output: 1
console.log(myCounter.increment()); // Output: 2
myCounter.reset();
console.log(myCounter.increment()); // Output: 1

// *****  3. Once Function
console.log("---------------- Exercise 3: ----------------");

function once(fn) {
  let result;
  return function (args) {
    if (result) {
      return fn(result);
    }
    result = args;
    return result;
  };
}

const logOnce = once((msg) => console.log(msg));
logOnce("Hello!");
logOnce("Hello again!");

// *****  4. Curry Function
console.log("---------------- Exercise 4: ----------------");
function curry(fn) {
  return function curried(...args) {
    if (args.length === fn.length) {
      return fn(...args);
    } else {
      return function (...newArgs) {
        return curried(...args, ...newArgs);
      };
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3));

// *****  5. Function Composition
console.log("---------------- Exercise 5: ----------------");

function compose(...fns) {
  return function (result) {
    let final = result;
    for (var i = fns.length - 1; i >= 0; i--) {
      final = fns[i](final);
    }
    return final;
  };
}
const add1Fn = (x) => x + 1;
const doubleFn = (x) => x * 2;
const subtract3Fn = (x) => x - 3;
const composed = compose(subtract3Fn, doubleFn, add1Fn);
console.log(composed(5));
