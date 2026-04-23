// calculator.js

// Add
function add(a, b) {
  return a + b;
}

// Subtract
function subtract(a, b) {
  return a - b;
}

// Multiply
function multiply(a, b) {
  return a * b;
}

// Divide (with error handling)
function divide(a, b) {
  if (b === 0) {
    return "Error: Cannot divide by zero";
  }
  return a / b;
}

// Export all functions
module.exports = {
  add,
  subtract,
  multiply,
  divide
};


