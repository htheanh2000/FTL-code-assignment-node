// Finish the getCombination function that,
// when passed an array of numbers and a target number,
// it returns two indices of the array of numbers,
// whose sum are equal to the target number.
// If such combinations do not exist, the function should return null.

/**
 * @param {Number[]} numSet, the array of numbers
 * @param {Number} targetNum, the target number
 * @return {String}, indices of the numSet with 'X and Y' format
 */

function getCombination(numSet, targetNum) {
  let numMap = {}; // Create an object to store numbers and their indices

  for (let i = 0; i < numSet.length; i++) {
    let complement = targetNum - numSet[i];
    if (numMap.hasOwnProperty(complement)) {
      return `${numMap[complement]} and ${i}`; // Found the pair, return indices
    }
    numMap[numSet[i]] = i; // Store the index of the current number
  }

  return null; // Return null if no combination found
}



console.log(getCombination([1, 2, 3, 4, 5], 6))
// Expected Result - any pair of follow:
// 0 and 4
// 1 and 3

console.log(getCombination([6, 7, 8, 9, 10], 17))
// Expected Result - any pair of follow:
// 1 and 4
// 2 and 3
