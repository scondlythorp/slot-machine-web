// fareApp.js
const chalk = require("chalk");

// import module
const {
    fares,
    getFareById,
    getFareByRoute,
    getFareByVehicleType
} = require("./fareData");

console.log (chalk.yellow("\n=== PASSO FARE MODULE TEST ===\N"));

//-------------------------------
// TEST: GET ALL FARES
//-------------------------------
console.log(chalk.blue("ALL Fares:"));
console.table(fares);

//-------------------------------
// TEST: GET FARE BY ID
//-------------------------------
console.log(chalk.green("\nGet Fare By ID (3):"));
console.log(getFareById(3));


//------------------------------
// TEST: GET FARE BY ROUTE
//------------------------------
console.log(chalk.red("\nFares Banjul ──> Serekunda:"));
console.log(getFareByRoute("Banjul","Serekunda"));

//--------------------------------
//@ML Thorp TEST: BY VEHICLE TYPE
//--------------------------------
console.log(chalk.white("\Taxi Fare:"));
console.table(getFareByVehicleType("taxi"));
