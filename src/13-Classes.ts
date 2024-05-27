class Book {
  // We need to explicitly set these properties for typescript
  readonly title: string;
  author: string;
  checkedOut: boolean = false;
  private pages: number = 121;

  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }

  pageCount() {
    this.pages = 133;
  }
}

const deepWork = new Book("deep work ", "cal newport");
deepWork.checkedOut = true;

// deepWork.title = "something else";             // err
// deepWork.pages = 133;                          //

deepWork.pageCount();

/*
NOTE:

readonly - cannot be modified
private - can only be accessed within the class
public - by default


NOTE: We cannot update private properties outside class, but we can create methods to 
  update them and use it outside class.
*/

// =================================================================================================

// Shortcut

class Book1 {
  checkedOut: boolean = false;
  constructor(
    readonly title: string,
    public author: string,
    private somevalue: string
  ) {}

  public getSomeValue() {
    return this.somevalue;
  }
}

const deepWork1 = new Book1("deep work ", "cal newport", "Hello World!");
deepWork1.author = "Anshul";
deepWork1.getSomeValue();

// =================================================================================================

// GETTERS & SETTERS

class Book2 {
  private checkedOut: boolean = false;
  constructor(public readonly title: string, public author: string) {}

  // Getter  - must return
  get info() {
    return `${this.title} by ${this.author}`;
  }

  // Setter  - must take one argument
  private set checkOut(checkedOut: boolean) {
    this.checkedOut = checkedOut;
  }

  get checkOut() {
    return this.checkedOut;
  }

  public get someInfo() {
    this.checkOut = true;
    return `${this.title} by ${this.author}`;
  }
}

const deepWork2 = new Book2("deep work ", "cal newport");
console.log(deepWork2.info)
// deepWork2.checkOut = true;      // if public



// ====================================================================================

// Implements

interface IPerson {
  name: string;
  age: number;
  greet(): void;
}

class Person implements IPerson {
  constructor(public name: string, public age: number) {}

  greet() {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`
    );
  }
}

const hipster = new Person("shakeAndBake", 100);
hipster.greet();