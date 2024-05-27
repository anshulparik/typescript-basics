// UNKNOWN

/*
The unknown type in TypeScript is a type-safe counterpart of the any type. 
It's like saying that a variable could be anything, but we need to perform some 
type-checking before we can use it.

"error instanceof Error" checks if the error object is an instance of the Error class.

NOTE: To use unknow we need to perform type check. 
*/

let unknownValue: unknown;

unknownValue = "Hello World!";
unknownValue = 25;
unknownValue = [32, "Hello"];

// unknownValue.toFixed(2)   // err

if(typeof unknownValue === 'number'){
    unknownValue.toFixed(2); 
}

// use case  
function runSomeCode() {
  const random = Math.random();
  if (random < 0.5) {
    throw new Error("Something went wrong!");
  } else {
    throw "some error";
  }
}

try {
  runSomeCode();
} catch (error) {   // error = unknown

  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log(error);
    console.log("there was an error....");
  }

}


// ========================================================================================================


// NEVER

/*
In TypeScript, never is a type that represents the type of values that never occur. You can't assign 
any value to a variable of type never.
TypeScript will give a compile error if there are any unhandled cases, helping ensure that 
all cases are handled.

NOTE: We cannot assign any value to type never.
*/

// let someValue: never = 1;   // err


// use case
type Theme1 = 'light' | 'dark';

function checkTheme(theme: Theme) {
  if (theme === "light") {
    console.log("light theme");
    return;
  }
  if (theme === "dark") {
    console.log("dark theme");
    return;
  }
  theme;
  // theme is of type never, because it can never have a value that is not 'light' or 'dark'.
}

// use case 2
enum Color {
  Red,
  Blue,
}

function getColorName(color: Color) {
  switch (color) {
    case Color.Red:
      return 'Red';
    case Color.Blue:
      return 'Blue';
    default:
      // at build time
      let unexpectedColor: never = color;
      // at runtime
      throw new Error(`Unexpected color value: ${unexpectedColor}`);
  }
}

console.log(getColorName(Color.Red)); // Red
console.log(getColorName(Color.Blue)); // Blue
// console.log(getColorName(Color.Green)); // err