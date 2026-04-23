let myName = "Modou Lamin Thorp";

const currentDate = new Date();

console.log("Name:", myName);
console.log("Current Date:", currentDate);


const regions = [
  "Banjul",
  "Kanifing",
  "Brikama",
  "Mansakonko",
  "Kerewan"
];


function welcomeCity(city) {
    return "Welcome to " + city;
}

console.log(welcomeCity("Banjul"));

regions.forEach(region => {
  console.log(welcomeCity(region));
});


console.log("Node Version:", process.version);
console.log("Platform:", process.platform);

 

