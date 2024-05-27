// TUPLES
/*
- It allows us to set an array of fixed length and ordered with fixed types.
- Tuples are useful when you want to return multiple values from a function.
*/

// NORMAL ARRAY TYPE: let person: (string | number)[] =  ['Anshul', 25]

let person: [string, number] = ['Anshul', 25]

// person = [25, "Anshul"];           // err
// person = ['Anshul', 25, 'John'];  // err


let date: readonly [number, number, number] = [25, 12, 1999]
// date.push(27)   // TS not complaining, for this we need to make it readonly


/*
- TS not complaining when we use methids like push, pop etc,
  for this we need to make it readonly.
*/

function getPerson(): [string, number] {
  return ["john", 25];
}

let randomPerson = getPerson()
// console.log(randomPerson[0])
// console.log(randomPerson[1])

let susan: readonly [string, number?] = ["susan"];



// ========================================================================================================


// ENUM

/*
Enums in TypeScript allow us to define a set of named constants. Using enums can make it easier
to document intent, or create a set of distinct cases.

NOTE: If we don't provide values, by default ENUM get 0, 1, 2... values in increasing order,
    or we can set the values.
*/

enum ServerResponseStatus {
  Success = 200,
  Error = "Enemy",
  // Error = 500,
}

/*
NOTE: Checkout the logs

REVERSE MAPPING:
In a numeric enum, TypeScript creates a reverse mapping from the numeric values to the enum member names.
This means that if you assign a numeric value to an enum member, you can use that numeric value
anywhere the enum type is expected.

In a string enum, TypeScript does not create a reverse mapping.
This means that if you assign a string value to an enum member, you cannot use that string value
anywhere the enum type is expected. You must use the enum member itself.
*/

console.log(Object.values(ServerResponseStatus), "======= ENUM VALUES")
console.log(Object.keys(ServerResponseStatus), "======= ENUM KEYS")
Object.values(ServerResponseStatus).forEach(item => {
  console.log(item, "========")
})

interface ServerResponse {
  result: ServerResponseStatus;
  data: string[];
}

function getServerResponse(): ServerResponse {
  return {
    result: ServerResponseStatus.Success,
    data: ["first item", "second item"],
  };
}

const response: ServerResponse = getServerResponse();
// console.log(response);



enum NumericEnum {
  Member = 1,
}

enum StringEnum {
  Member = 'Value',
}

let numericEnumValue: NumericEnum = 1; // This is allowed
// console.log(numericEnumValue); // 1

// let stringEnumValue: StringEnum = 'Value'; // Err

/*
NOTE: 
For numbers: We can directly use the value of ENUM
For string: We cannot directly use the value of ENUM
*/


// ========================================================================================================


// TYPE ASSERTIONS

/*
Type assertion in TypeScript is a way to tell the compiler what the type of an existing variable is.
This is especially useful when you know more about the type of a variable than TypeScript does.
*/

let someValue: any = 'This is a string';

let strLength: number = someValue.length    // here someValue = any
let strLength1: number = (someValue as string).length    



type Bird = {
  name: string;
};

// Assume we have a JSON string from an API or local file
let birdString = '{"name": "Eagle"}';
let dogString = '{"breed": "Poodle"}';

//

// Parse the JSON string into an object
let birdObject = JSON.parse(birdString);  // birdObject = any
let birdObject1 = JSON.parse(birdString) as Bird;  // birdObject = Bird
let dogObject = JSON.parse(dogString) as Bird;  // BE CAREFUL!

console.log(birdObject1.name);
console.log(dogObject.name);  // will give undefined


// use case

enum Status {
  Pending = "pending",
  Declined = "declined",
}

type User1 = {
  name: string;
  status: Status;
};

// save Status.Pending in the DB as a string
// retrieve string from the DB
const statusValue = 'pending';

// const user: User1 = { name: 'john', status: statusValue };   // err
const user: User1 = { name: 'john', status: statusValue as Status}; 