// fare-manager.js

const fs = require("fs").promises;

// Sample fare data
const fares = [
  { id: 1, from: "Banjul", to: "Serekunda", price: 25 },
  { id: 2, from: "Brikama", to: "Banjul", price: 30 },
  { id: 3, from: "Brusubi", to: "Cape Point", price: 50 }
];


// Save data to file
async function saveFareData() {
  try {
    await fs.writeFile("fares.json", JSON.stringify(fares, null, 2));
    console.log("✓ fares.json saved successfully");
  } catch (error) {
    console.log("Error saving file:", error.message);
  }
}


// Check if file exists
async function checkFile(filename) {
  try {
    await fs.access(filename);
    console.log(`✓ ${filename} exists`);
  } catch {
    console.log(`✗ ${filename} does not exist`);
  }
}


// Read file
async function readFareData() {
  try {
    const data = await fs.readFile("fares.json", "utf-8");
    const parsed = JSON.parse(data);
    console.log("📂 File Data:", parsed);
  } catch (error) {
    console.log("Error reading file:", error.message);
  }
}


// Run everything
async function run() {
  await saveFareData();
  await checkFile("fares.json");
  await checkFile("missing.json");
  await readFareData();
}

run();