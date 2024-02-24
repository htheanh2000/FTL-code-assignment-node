// The following code is identified as "bad Promise implementation".
// Please briefly describe what issue(s) it caused and try to rewrite it.

// function runTasks() {
//   return functionA()
//     .then((resultA) => functionB(resultA))
//     .then((resultB) => functionC(resultB))
//     .then((resultC) => functionD(resultC))
//     .then((resultD) => functionE(resultD))
//     .then((resultE) => console.log(resultE))
//     .catch((error) => console.log(error.message))
// }

// Bad Promise implementation name: Promise hell
// THere lead to some issue:
// 1: Error Handling: The error handling is done only at the end of the promise chain. 
//                    While this catches any error from the preceding promises
// 2: Debugging and Maintenance: when .then() is more complex => Very hard to debug and maintenance.
// 3: Optimization and Readability

// Below is my solution

async function runTasks() {
  try {
    const resultA = await functionA();
    const resultB = await functionB(resultA);
    const resultC = await functionC(resultB);
    const resultD = await functionD(resultC);
    const resultE = await functionE(resultD);
    console.log(resultE);
  } catch (error) {
    console.log(error.message);
  }
}
