// Type Annotations:

let myName: string = "Anshul";

myName = "Parik";
// myName = 24     // err

let amount: number = 25;
// amount = "amount"    // err

let isLoading: boolean = true;

// NOTE: Typescript is really smart, it can infer types.
let store = "saree store";
// store = 27 // err (automatically inferring string type)


// NOTE: Even though we have type errors, we can still run our project locally.
console.log(myName, "  ", amount, "  ", store)

// NOTE: It is running locally. But in order to host it we need to make a build.
//       It won't pass the build. So, we can host it without fixing them.




