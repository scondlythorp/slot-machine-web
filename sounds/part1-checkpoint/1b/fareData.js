// fareData

// 10 Gambian fares
const fares = [
    {id: 1, 
     from:  "Banjul",
     to: "Serekunda",
     vehicleType: "taxi",
     price: 25
    },

    {id: 2, 
     from:  "Banjul",
     to: "Serekunda",
     vehicleType: "Bus",
     price: 12
    },

    {id: 3, 
     from:  "Brikama",
     to: "Banjul",
     vehicleType: "taxi",
     price: 50
    },

    {id: 4, 
     from:  "Brikama",
     to: "Banjul",
     vehicleType: "taxi",
     price: 50
    },

    {id: 5, 
     from:  "Bakau",
     to: "Serekunda",
     vehicleType: "Gelegele",
     price: 12
    },

    {id: 6, 
     from:  "Fajara",
     to: "Turntable",
     vehicleType: "7_Seater",
     price: 50
    },

    {id: 7, 
     from:  "Soma",
     to: "Farafenni",
     vehicleType: "taxi",
     price: 100
    },

    {id: 8, 
     from:  "Senegambia",
     to: "Cape point",
     vehicleType: "Van",
     price: 15
    },

    {id: 9, 
     from:  "Basse",
     to: "Banjul",
     vehicleType: "Bus",
     price: 110
    },

    {id: 10, 
     from:  "Brusubi",
     to: "Banjul",
     vehicleType: "7_Seater",
     price: 40
    }

    
];


//-------------------------------------
// GET FARE BY ID
//-------------------------------------

function getFareById(id) {
    return fares.find(fare => fare.id === id);
}

/* -----------------------------------
    GET FARES BY ROUTE
------------------------------------*/

function  getFareByRoute(from, to) {
    return fares.filter(fare => fare.from === from && fare.to === to);
}

/* -----------------------------------
    GET FARES BY VEHICLE TYPE
------------------------------------*/

function getFareByVehicleType(vehicleType) {
    return fares.filter(fare => fare.vehicleType === vehicleType);
}


// EXPORT ALL THE FUNCTION

module.exports = {
    fares,
    getFareById,
    getFareByRoute,
    getFareByVehicleType
};

