// test-calculator.js

const calc = require("./calculator");

console.log("=== CALCULATOR TEST ===");

console.log("Add:", calc.add(10, 5));
console.log("Subtract:", calc.subtract(10, 5));
console.log("Multiply:", calc.multiply(10, 5));
console.log("Divide:", calc.divide(10, 5));

// Test divide by zero
console.log("Divide by zero:", calc.divide(10, 0));