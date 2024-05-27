// Variable already declared

/*
If your TypeScript files aren't modules (i.e., they don't have any import or export statements), 
they're treated as scripts in the global scope. In this case, declaring the same variable in 
two different files would cause a conflict.


By default: In TS files are created in global scope.
So it limits the number of variables.
When we try to declare variable, it says already declared in another file.

NOTE:
This is because, TS doesn't read files as module by default. It reads files as script in global-scope.

TO OVERCOME THIS:
- tsconfig.json
  - "moduleDetection": "force",
- using import and export
*/

// =======================================================================================================


// Export/Import Var

export function sayHello(name: string): void {
  console.log(`Hello ${name}!`);
}

export let person = "susan";

export type Student = {
  name: string;
  age: number;
};

const newStudent: Student = {
  name: "peter",
  age: 24,
};

export default newStudent;

// import newStudent, { sayHello, person, type Student } from "./actions";

/*
NOTE: 
We cannot import modules from JS file into TS file directly.
TO OVERCOME THIS:
- tsconfig.json
  - "allowJs": true,
*/