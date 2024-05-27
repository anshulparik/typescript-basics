/*
Type guarding is a term in TypeScript that refers to the ability to narrow down the type of an object
 within a certain scope. This is usually done using conditional statements that check the type
 of an object.

In the context of TypeScript, a type guard is some expression that performs a runtime check that
guarantees the type in some scope.
*/



// 1- "typeof" guard
type ValueType = string | number | boolean;

let value: ValueType;
const random = Math.random();
value = random < 0.33 ? "Hello" : random < 0.66 ? 123.456 : true;

function checkValue(value: ValueType): void {
  if (typeof value === "string") {
    console.log(value.toLowerCase());
    return;
  }
  if (typeof value === "number") {
    console.log(value.toFixed(2));
    return;
  }
  console.log(`boolean: ${value}`);
}

// checkValue(value);


// =================================================================================================

// 2- Equality Narrowing

/*
In TypeScript, equality narrowing is a form of type narrowing that occurs when you use 
equality checks like === or !== in your code
*/

type Dog = { type: "dog"; name: string; bark: () => void };
type Cat = { type: "cat"; name: string; meow: () => void };
type Animal = Dog | Cat;

function makeSound(animal: Animal): void {
  if (animal.type === "dog") {
    // TypeScript knows that `animal` is a Dog in this block
    animal.bark();
  } else {
    // TypeScript knows that `animal` is a Cat in this block
    animal.meow();
  }
}


// 3- Check for property

/*
The "in" operator in TypeScript is used to narrow down the type of a variable when used in a 
conditional statement.It checks if a property or method exists on an object. If it exists, 
TypeScript will narrow the type to the one that has this property.
*/

function makeSound1(animal: Animal): void {
  if ("bark" in animal) {
    // TypeScript knows that `animal` is a Dog in this block
    animal.bark();
  } else {
    // TypeScript knows that `animal` is a Cat in this block
    animal.meow();
  }
}


// ===============================================================================================



// 4- "Truthy"/"Falsy" guard

/*
In TypeScript, "Truthy"/"Falsy" guard is a simple check for a truthy or falsy value
*/

function printLength(str: string | null | undefined): void {
  if (str) {
    // In this block, TypeScript knows that `str` is a string
    // because `null` and `undefined` are falsy values.
    console.log(str.length);
  } else {
    console.log('No string provided');
  }
}

printLength('Hello'); // Outputs: 5
printLength(null); // Outputs: No string provided
printLength(undefined); // Outputs: No string provided

// ================================================================================================

// 5- "instanceof" type guard

/*
The instanceof type guard is a way in TypeScript to check the specific class or constructor function 
of an object at runtime. It returns true if the object is an instance of the class or created 
by the constructor function, and false otherwise.
*/

try {
  // Some code that may throw an error
  throw new Error("This is an error");
} catch (error) {    // error - unknown
  if (error instanceof Error) {
    console.log("Caught an Error object: " + error.message);
  } else {
    console.log("Caught an unknown error");
  }
}

function checkInput(input: Date | string): string {
  if (input instanceof Date) {
    return input.getFullYear().toString();
  }
  return input;
}

const year = checkInput(new Date());
const randomDate = checkInput("2020-05-05");
console.log(year);
console.log(randomDate);


// ================================================================================================

// 6- type predicate

/*
A type predicate is a function whose return type is a special kind of type that can be used 
to narrow down types within conditional blocks.
*/

type Student = {
  name: string;
  study: () => void;
};

type User = {
  name: string;
  login: () => void;
};

type Person = Student | User;

const randomPerson = (): Person => {
  return Math.random() > 0.5
    ? { name: "john", study: () => console.log("Studying") }
    : { name: "mary", login: () => console.log("Logging in") };
};

const person = randomPerson();

// const person: Person = {
//   name: "anna",
//   study: () => console.log("Studying"),
// //   login: () => console.log('Logging in'),
// };

// created a type check
function isStudent(person: Person): person is Student{
  // return 'study' in person;
  return (person as Student).study !== undefined;
}

// using type check
if (isStudent(person)) {
  person.study(); // This is safe because TypeScript knows that 'person' is a Student.
} else {
  person.login();
}


// =============================================================================================

// Discriminated Unions and exhaustive check using the never type

/*
A discriminated union in TypeScript is a type that can be one of several different types, 
each identified by a unique literal property (the discriminator), allowing for type-safe 
handling of each possible variant.
*/

type IncrementAction1 = {
  amount: number;
  timestamp: number;
  user: string;
};

type DecrementAction1 = {
  amount: number;
  timestamp: number;
  user: string;
};

type Action1 = IncrementAction1 | DecrementAction1;

// TO OVERCOME THIS

type IncrementAction = {
  type: "increment";
  amount: number;
  timestamp: number;
  user: string;
};

type DecrementAction = {
  type: "decrement";
  amount: number;
  timestamp: number;
  user: string;
};

type Action = IncrementAction | DecrementAction;

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "increment":
      return state + action.amount;
    case "decrement":
      return state - action.amount;

    default:
      const unexpectedAction: never = action;
      throw new Error(`Unexpected action: ${unexpectedAction}`);
  }
}

const newState = reducer(15, {
  user: "john",
  type: "increment",
  amount: 5,
  timestamp: 123456,
});