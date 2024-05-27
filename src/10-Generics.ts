// GENERICS

/*
Generics in TypeScript are a way to create reusable code components that work with a 
variety of types as opposed to a single one.

In other words, generics allow you to write a function or a class that can work 
with any data type. You can think of generics as a kind of variable for types.

It allows us to pass the type dynamically.
*/

// ARRAY
// normal usage
// let array1: string[] = ['Apple', 'Banana', 'Mango'];
// let array2: number[] = [1, 2, 3];
// let array3: boolean[] = [true, false, true];

// usign generics
let array1: Array<string> = ["Apple", "Banana", "Mango"];
let array2: Array<number> = [1, 2, 3];
let array3: Array<boolean> = [true, false, true];

// FUNCTION
// normal usage
function createString(arg: string): string {
  return arg;
}


// usign generics
function create<T>(arg: T): T{
    return arg;
}

const res = create<string>("Hello world!")
const res2 = create<number>(24)


// INTERFACE
interface GenericInterface<T>{
    value: T;
    getValue: () => T;
}

const someString: GenericInterface<string> = {
    value: "test",
    getValue() {
        return this.value;
    },
}


// ASYNC FUNCTION
/*
NOTE: ASYNC function return Promise.
*/
async function someFunc(): Promise<string> {
    return "hello world!"
}

const res3 = someFunc();


// ==========================================================================================


function generateStringArray(length: number, value: string): string[]{
    let result: string[] = [];
    result = Array(length).fill(value);
    return result;
}

function createArray<T>(length: number, value: T): Array<T>{
    let result: T[] = [];
    result = Array(length).fill(value);
    return result;
}

const res4 = createArray<number>(10, 25);
const res5 = createArray<string>(10, "Hello!");



// MULTIPLE VARIABLES
function pair<T, U>(param1: T, param2: U): [T, U]{
    return [param1, param2];
}

let res6 = pair<number, string>(25, "Hello!");


// TYPE CONSTRAINTS
function processValue<T extends number | string>(value: T): T {
  console.log(value);
  return value;
}

processValue("hello");
processValue(12);
// processValue(true);  // err


type Car = {
  brand: string;
  model: string;
};

const car: Car = {
  brand: "ford",
  model: "mustang",
};

type Product = {
  name: string;
  price: number;
};

const product: Product = {
  name: "shoes",
  price: 1.99,
};

type Student = {
  name: string;
  age: number;
};

const student: Student = {
  name: "peter",
  age: 20,
};


/*
T extends Student is a type constraint on the generic type T. It means that the type T can be any 
type, but it must be a subtype of Student or Student itself. In other words, T must have at least 
the same properties and methods that Student has.
*/


function printName<T extends Student | Product>(input: T): void{
    console.log(input.name)
}


// REAL USECASE
// We can't keep passing all the types as UNION. 
/* 
The extends { name: string } part is a type constraint on T. It means that T can be any type,
but it must be an object that has at least a name property of type string.
In other words, T must have at least the same properties and methods that { name: string } has.
*/

function printName1<T extends { name: string }>(input: T): void {
  console.log(input.name);
}


// DEFAULT VALUE
interface StoreData<T = any> {
  data: T[];
}

const storeNumbers: StoreData<number> = {
  data: [1, 2, 3, 4],
};

const randomStuff: StoreData = {
  data: ["random", 1],
};