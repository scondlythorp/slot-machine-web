// async-practice.js

// simulate async delay
function delay(time, data) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data);
        }, time);
    });
}

//--------------------------------
// ASYNC FUNCTION
//-------------------------------
async function fetchFare1() {
    return await delay(1000, "Fare 1 (Taxi - D25)");
    
}

async function fetchFare2() {
    return await delay(500, "Fare 2 (Bus - D12)");   
}

async function fetchFare3() {
    return await delay(300, "Fare 3 (Gelegele - D10)");
    
}

// ----------------------------------
// @ML ...RUN ALL (ORDER OF COMPLETION)
//------------------------------------
async function runAsync() {
    console.log("Fetching Fares.....\n");
    fetchFare1().then(result => console.log(result));
    //----------------------------------------------
    console.log("Fetching Fares.....\n");
    fetchFare2().then(result => console.log(result));
    //-----------------------------------------------
    console.log("Fetching Fares.....\n");
    fetchFare3().then(result => console.log(result)); 
}

runAsync();
