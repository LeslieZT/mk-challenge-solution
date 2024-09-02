// *****  1. Basic Callback Example
console.log("---------------- Exercise 1: ----------------");
function withDelay(callback, delay) {
  setTimeout(callback, delay);
}
withDelay(() => console.log("This is delayed"), 1000);

// *****  2. Simple Array Filter
console.log("---------------- Exercise 2: ----------------");
function filterArray(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}

const numbers = [1, 2, 3, 4, 5];
const evens = filterArray(numbers, (x) => x % 2 === 0);
console.log(evens);

// *****  3. Function Timer
console.log("---------------- Exercise 3: ----------------");
function timeFunction(fn) {
  const start = Date.now();
  fn();
  const end = Date.now();
  console.log(`Function took ${end - start}ms to execute.`);
}

timeFunction(() => {
  for (let i = 0; i < 1000000; i++) {} // Some computation
});

/*************************************************************************/
console.log("************************************************************");

// *****  1. Function Debouncing
console.log("---------------- Exercise 1: ----------------");

function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const log = debounce(() => console.log('Debounced!'), 500);
log();
log();
log();

// *****  2. Throttle Function
console.log("---------------- Exercise 2: ----------------");

function throttle(fn, interval) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= interval) {
      lastCall = now;
      fn(...args);
    }
  };
}

const logThrottle = throttle(() => console.log('Throttled!'), 500);
logThrottle();
logThrottle()


// *****  3. Custom Map Function
console.log("---------------- Exercise 3: ----------------");

function customMap(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
}

const numbersArr = [1, 2, 3];
const doubled = customMap(numbersArr, x => x * 2);
console.log(doubled);

// *****  4. Compose Functions
console.log("---------------- Exercise 4: ----------------");




// *****  5. Partial Application
console.log("---------------- Exercise 5: ----------------");

function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

const add = (a, b, c) => a + b + c;
const add5 = partial(add, 5);

console.log(add5(10, 15));
