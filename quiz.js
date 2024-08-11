let myArray1 = ["Value 1", "Value 2", "Value 3"];
let myArray2 = ["Value A", "Value B", "Value C"];
let myArray3 = ["Value X", "Value Y", "Value Z"];

// Create an array with references to the original arrays
let arrays = [myArray1, myArray2, myArray3];

// Randomize the order of accessing the arrays
let shuffledIndexes = [...Array(arrays.length).keys()].sort(() => Math.random() - 0.5);

// Display the values at the corresponding indexes
for (let i = 0; i < arrays.length; i++) {
  let arrayIndex = shuffledIndexes[i];
  let value = arrays[arrayIndex][2];
  console.log(`myArray${arrayIndex + 1}[2]: ${value}`);
}