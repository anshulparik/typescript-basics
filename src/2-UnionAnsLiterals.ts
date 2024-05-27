// Union Types: |
// Union type allows us to setup multiple types for a single variable.

let tax: number | string = 10;
tax = 100;
tax = "$50"
// tax = true;   // err


// =============================================================================================================


// Literal Types:
// Literal type allows us to setup multiple values for a single variable.

let request: 'pending' | 'success' | 'error' = 'pending';
// request = "random"  // err 

let GST: "2.5%" | true | 79 = 79;
// GST = false // err

let some: any | number = 50;
some = true  // we can simply declare 'any' type only.

let test: string | 34 = "harry";
test = 34;
// test = 47;          // err
test = "sam";


// =============================================================================================================



// ANY Type:  That's how variales berhave in JS
// NOTE: It is not a good practice to use 'any'. It spreads like a wildfire.

let notSure: any = 7;
notSure = `What's up!`;
notSure = () => {
    console.log("Hello!")
}

notSure = false

console.log(notSure, "  notSure")


let random;    // It infers type 'any



// =============================================================================================================



// PRACTICAL EXAMPLES:

const books = ['1999', 'Brave new world!', 'Atomic habits'];

let foundbook: string | undefined;

for (let book of books){
    if(book === '1999'){
        foundbook = book;
        break;
    }
}   

// foundbook = 10;
console.log(foundbook);

/*

let foundbook;
Above, typescript is allowing us to define 
foundbook = 10;
But, in this case we want our foundbook var to be string.


If we define
let foundbook: string;
In this case we are not sure whether it will be string 100% string,
if conditiions didn't match then it can be undefined also.
For this case TS presents this kind of error:
Variable 'foundbook' is used before being assigned.


To solve this error we need to define:
let foundbook: string | undefined;


*/
