// Given an Array,
// complete the start() function to perform following result
// ** the wait() function must be used in start() function
// ** you are not allowed to modify the wait() function

// start!
// 1
// 3
// 5
// 2
// done!

/**
 * @param {Number} sec
 * @returns {Promise}
 */
function wait(sec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(sec)
      resolve()
    }, sec * 1000)
  })
}

/**
 * @param {Number[]} arr, a array of numbers to be printed
 */
// Todo
async function start(arr) {
  console.log('start!');

  for (let i = 0; i < arr.length; i++) {
    await wait(arr[i]);
  }

  console.log('done!');
}


start([1, 3, 5, 2])
