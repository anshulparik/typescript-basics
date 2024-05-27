// TYPE ALIAS

const john: { id: number; name: string; isActive: boolean } = {
  id: 1,
  name: "john",
  isActive: true,
};
const susan: { id: number; name: string; isActive: boolean } = {
  id: 1,
  name: "susan",
  isActive: false,
};

function createUser(user: { id: number; name: string; isActive: boolean }): {
  id: number;
  name: string;
  isActive: boolean;
} {
  console.log(`Hello there ${user.name.toUpperCase()} !!!`);

  return user;
}


/*
A type alias in TypeScript is a new name or shorthand for an existing type, 
making it easier to reuse complex types. 
*/

type User = { id: number; name: string; isActive: boolean };

const john1: User = {
  id: 1,
  name: "john",
  isActive: true,
};
const susan1: User = {
  id: 1,
  name: "susan",
  isActive: false,
};

function createUser1(user: User): User {
  console.log(`Hello there ${user.name.toUpperCase()} !!!`);
  return user;
}

// NOTE: This is not limited to object type.

// Examples: 
type Theme = "dark" | "light";

let theme: Theme;
theme = "dark";
// theme = "jelly"   // err

// Function that accepts the Theme type alias
function setTheme(mode: Theme) {
  theme = mode;
}

setTheme('dark'); // This will set the theme to 'dark'

type Employee = { id: number; name: string; department: string };
type Manager = { id: number; name: string; employees: Employee[] };

type Staff = Employee | Manager;

function printStaffDetails(staff: Staff) {
  if ("employees" in staff) {
    console.log(
      `${staff.name} is a manager of ${staff.employees.length} employees.`
    );
  } else {
    console.log(
      `${staff.name} is an employee in the ${staff.department} department.`
    );
  }
}

const alice: Employee = { id: 1, name: "Alice", department: "Sales" };
const steve: Employee = { id: 1, name: "Steve", department: "HR" };
const bob: Manager = { id: 2, name: "Bob", employees: [alice, steve] };

// printStaffDetails(alice); // Outputs: Alice is an employee in the Sales department.
// printStaffDetails(bob);


// =============================================================================================================

// INTERSECTION TYPE  "&"
// It allows us to an extra type to an already existing type.

/*
In TypeScript, an intersection type (TypeA & TypeB) is a way of combining multiple types into one.
This means that an object of an intersection type will have all the properties of TypeA and all 
the properties of TypeB. It's a way of creating a new type that merges the properties of existing types.
*/

type Book = { id: number; name: string; price: number };
type DiscountedBook = Book & { discount: number };
const book1: Book = {
  id: 2,
  name: "How to Cook a Dragon",
  price: 15,
};

const book2: Book = {
  id: 3,
  name: "The Secret Life of Unicorns",
  price: 18,
};

const discountedBook: DiscountedBook = {
  id: 4,
  name: "Gnomes vs. Goblins: The Ultimate Guide",
  price: 25,
  discount: 0.15,
};


// =============================================================================================================

// COMPUTED PROPERTIES

/* 
Computed properties in JavaScript are a feature that allows you to dynamically create property keys on objects.
This is done by wrapping an expression in square brackets [] that computes the property name when 
creating an object.  
*/
const propName = 'age'
let dog = { age: 5 };
let cat = { [propName]: 3 };


type Animal = {
  [propName]: number;
};

let tiger: Animal = { [propName]: 5 };


// =============================================================================================================


// INTERFACE
// allows us to setup shape for objects (only objects).

interface Play {
  readonly isbn: number;
  title: string;
  author: string;
  genre?: string;
}

const deepWork: Play = {
    isbn: 9781455586691,
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Self-help",
};

/* METHODS IN INTERFACE */

interface Bike {
  model: string;
  color: string;
  brand: string;

  // method1
  printModel(): void;

  // method2
  printColor(): string;
  printColor2(): string;

  // method3
  // NOTE: 'someValue' name doesn't need to match.
  printSomething: (someValue: number) => number;
  printSomething2: (someValue: number) => number;
  printSomething3: (someValue: number) => number;
}


/*
NOTE: It doen't matter, how we define out method type or define it in object.
Only 'this' context is changed.
'this' - Arrow fn - global
'this' - Normal fn - object itself
*/


const myBike: Bike = {
  model: "Meteor 350",
  color: "Red",
  brand: "RE",

  // method1
  printModel() {
    console.log(this, "method1")
    console.log(`Model of my bike is ${this.model}`);
  },
 
  // method2
  printColor() {
    console.log(this, "method2-1")
    return `Color of my bike is ${this.color}`;
  },
  printColor2: () => {
    // console.log(this, "method2-2") // global obj
    return `Color of my bike is ${myBike.color}`;
  },

  // method3 
  printSomething: function (value){
    console.log(this, "method3-1");
    return value;
  },
  
  printSomething2: (value) => {
    // NOTE: Here in arrow function "this" is a global object
    // console.log(this, "method3-2"); // global obj
    console.log(`Color of my bike is ${myBike.color}`, "method3-2");
    return value;
  },
  
  printSomething3(value){
    console.log(this, "method3-3");
    return value;
  }
};


myBike.printModel()

const color = myBike.printColor()
console.log(color)
const color2 = myBike.printColor2()
console.log(color2)

const x = myBike.printSomething(25);
console.log(x);
const y = myBike.printSomething2(26);
console.log(y);
const z = myBike.printSomething3(27);
console.log(z);


// =============================================================================================================

// INTERFACE MERGING

interface Person {
    name: string;
    getDetails(): string;
}

interface DogOwner {
    dogName: string;
    getDogDetails(): string;
}

interface Person {
    age: number;    
}

const person: Person = {
    name: "Anshul",
    age: 24,
    getDetails(){
        return `My name is ${this.name} and my age is ${this.age} years`;
    }
}


/*
NOTE: In this both the interface with name 'PERSON' are automatically merged (DECLARATION MERGING).
*/

interface EmployeeDetails extends Person {
    employeeId: number;
}

const empDetail: EmployeeDetails = {
  name: "Jane",
  age: 33,
  employeeId: 118,
  getDetails() {
    return `My name is ${this.name} and my emp id is ${this.employeeId}.`;
  },
};

interface ManagerDetails extends Person, DogOwner {
  managePeople(): void;
}

const manager: ManagerDetails = {
  name: "Bob",
  age: 35,
  dogName: "Rex",
  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  getDogDetails() {
    return `Dog Name: ${this.dogName}`;
  },
  managePeople() {
    console.log("Managing people...");
  },
};
