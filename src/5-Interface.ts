interface Person1 {
  name: string;
}

interface DogOwner1 extends Person1 {
  dogName: string;
}

interface Manager1 extends Person1 {
  managePeople(): void;
  delegateTasks(): void;
}

function getEmployee(): Person1 | DogOwner1 | Manager1 {
  const random = Math.random();

  if (random < 0.33) {
    return {
      name: "john",
    };
  } else if (random < 0.66) {
    return {
      name: "sarah",
      dogName: "Rex",
    };
  } else {
    return {
      name: "bob",
      managePeople: () => console.log("Managing people..."),
      delegateTasks: () => console.log("Delegating tasks..."),
    };
  }
}

const employee: Person1 | DogOwner1 | Manager1 = getEmployee();
console.log(employee);
// console.log(employee.delegateTasks());    // not allowing

// For this (TYPEGUARD):
function isManager(obj: Person1 | DogOwner1 | Manager1): obj is Manager1 {
  if ("managePeople" in obj) {
    return true;
  } else {
    return false;
  }
}

// Typeguard for interface 
if(isManager(employee)){
    // console.log(employee.delegateTasks());    //  still err for boolean type
    console.log(employee.delegateTasks());    //  will work after type change
}

/*
NOTE: This is passing the if condition only. Still typescript is not aware of exact return type.
So, we change return type to boolean -> obj is Manager
*/

/*
    1. By using typeof
    2. By checking value in an object ("managePeople" in obj)   // for single object return type
    3. By checking value in an object & returning object type 
        ("managePeople" in obj  and   obj is Manager1)   // for multiple object return type
*/


// =============================================================================================================


/*  

type vs interface

type: A type alias is a way to give a name to a type. It can represent primitive types, 
    union types, intersection types, tuples, and any other types. Once defined, the alias can be 
    used anywhere in place of the actual type.

interface: An interface is a way to define a contract for a certain structure of an object.

Key Differences

- Type aliases can represent primitive types, union types, intersection types, tuples, etc., 
  while interfaces are primarily used to represent the shape of an object.
- Interfaces can be merged using declaration merging. If you define an interface with the same name
  more than once, TypeScript will merge their definitions. Type aliases can't be merged in this way.
- Interfaces can be implemented by classes, while type aliases cannot.
- Type aliases can use computed properties, while interfaces cannot.  


*/


// Interface in a class

interface Person3 {
  name: string;
  greet(): void;
}

class Employee3 implements Person3 {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

let johnny = new Employee3('Johnny');
johnny.greet(); // Outputs: Hello, my name is John
