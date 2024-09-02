// *****  1. IIFE simple
console.log("---------------- Exercise 1: ----------------");
let globalVar = "Global";
(function () {
  let globalVar = "Local";
  console.log(globalVar);
})();
console.log(globalVar);

// *****  2. Basic Counter with IIFE
console.log("---------------- Exercise 2: ----------------");
const counter = (function () {
  let count = 0;
  return {
    increment: function () {
      count++;
    },
    getCount: function () {
      return count;
    },
  };
})();
counter.increment();
console.log(counter.getCount());

// *****  3.Simple Configuration Object
console.log("---------------- Exercise 3: ----------------");
const config = (function () {
  const defaultConfig = {
    color: "blue",
    fontSize: "14px",
  };

  return {
    getConfig: function () {
      return defaultConfig;
    },
  };
})();
console.log(config.getConfig());

/*************************************************************************/
console.log("************************************************************");

// *****  1.Private Variable with IIFE
console.log("---------------- Exercise 1: ----------------");

const modules = (function () {
  let variable = 0;
  function getVar() {
    return variable;
  }

  function setVar(value) {
    variable = value;
  }

  return {
    getVar,
    setVar,
  };
})();
console.log(modules.getVar()); // Output: 0
modules.setVar(42);
console.log(modules.getVar());

// *****  2.Singleton Pattern with IIFE
console.log("---------------- Exercise 2: ----------------");
const singleton = (function () {
  let instance;
  function createInstance() {
    return {
      name: "SingletonInstance",
    };
  }
  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

const obj1 = singleton.getInstance();
const obj2 = singleton.getInstance();
console.log(obj1 === obj2);

// *****  3.Module Pattern
console.log("---------------- Exercise 3: ----------------");
const myModule = (function () {
  const privateVar = "secret";

  function privateMethod() {
    console.log("Private method");
  }

  return {
    publicMethod: function () {
      console.log("Public method");
      privateMethod();
      console.log(privateVar);
    },
  };
})();

myModule.publicMethod();

// *****  4.Lazy Initialization
console.log("---------------- Exercise 4: ----------------");

const lazyInit = (function () {
  let initialized = false;

  return function () {
    if (!initialized) {
      console.log("Initializing...");
      initialized = true;
    } else {
      console.log("Already initialized");
    }
  };
})();

lazyInit();
lazyInit();

// *****  5.Configuration Module
console.log("---------------- Exercise 5: ----------------");

const configModule = (function () {
  const setting = {};

  function set(key, value) {
    setting[key] = value;
  }

  function get(key) {
    return setting[key];
  }

  return { get, set };
})();
configModule.set("theme", "dark");
console.log(configModule.get("theme"));
