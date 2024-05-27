// ARRAYS:

let prices: number[] = [100, 55, 78, 12];
//  prices = ['hello']         //err
//  prices.push('hello')       //err

// This will be type of empty array
let emptyArr: [] = [];
// emptyArr = [34]     // err (TS want this always to be empty array)

// TS will infer this as any[]
let anyArr = [];

let someArr: (number | string)[] = ["hello", 42, "KTM", 77];

// =============================================================================================================

// OBJECTS:

let bike: {
  brand: string;
  name: string;
  year: number;
} = {
  brand: "RE",
  name: "meteor 350",
  year: 2023,
  // color: "red"     // err
};

// bike.brand = 24   // err
// bike.rc = 'PB'    // err

let book = {
  title: "Mr Nice",
  author: "Howard Marks",
};
let play = {
  title: "Julius Caesar",
  author: "Shakespear",
};
let movie = {
  title: "Aam Aadmi",
};

let items: {
  readonly title: string;
  author?: string;
}[] = [book, play, movie];

// items[0].title = "Yes Man!"              // err

/*  
readonly: don't let us overwrite the value
*/

// =============================================================================================================

// FUNCTIONS:

function sayHi(name: string) {
  console.log(`Hi ${name}!`);
}

function calculate(price: number): number {
  return price * 0.9;
}

const finalPrice = calculate(200);

/*

NOTE: Typescript automatically infers return type of function:
It is a good practice to set a retrn and arguments type in a function. 

*/

// PROBLEMS WITH ANY

function addThree(num: any) {
  let anotherNum: number = 3;
  return num + anotherNum;
}

const result = addThree(4);
const value = result;

// value.myMethod()    // err (function doesn't exist)

// OPTIONAL AND DEFAULT PARAMETERS:

// OPTIONAL
function calcDiscount(price: number, discount?: number): number {
  // if (discount) {
  //   return price - discount;
  // } else {
  //   return price;
  // }
  return price - (discount || 0);
}

let discPrice = calcDiscount(100, 20);

// DEFAULT
function calcDiscount2(price: number, discount: number = 30): number {
  return price - discount;
}

let discPrice2 = calcDiscount2(100);

// REST PARAMETERS
function sum(message: string, ...numbers: number[]): void {
  const doubled = numbers.map((num) => num * 2);
  console.log(message + doubled);
}

sum("The sum is:", 1, 2, 3, 4, 5);

// OBJECT PARAMETERS
function createEmp({ id }: { id: number }): { id: number; isActive: boolean } {
  return { id: id, isActive: true };
}

let emp = {
  id: 4,
  name: "Anshul"
}
createEmp({id: 4})
createEmp(emp)    // no err

// ALTERNATIVE
function createEmp2(obj: { id: number }): { id: number; isActive: boolean } {
  return { id: obj.id, isActive: true };
}

createEmp2({id: 4})
// createEmp2({id: 4, name: "Anshul"}) // err


/*
NOTE: When we pass object properties inline TS checks the type exactly (createEmp2), 
    If we reference an object then TS will only check that the properties are there or not and
    will not care about extra properties.
    
    
  To pass default value of object in function:
  test(config: {reverse: boolean} = { reverse: true }){}   
*/