const fs = require("fs");

const rows = fs.readFileSync("pincode.csv","utf8").split("\n");

const data = {};

rows.slice(1).forEach(row => {

const cols = row.split(",");

const pincode = cols[4];      // column E
const city = cols[7];         // district
const state = cols[8];        // state
const lat = cols[9];
const lng = cols[10];

if(!pincode) return;

/* allow only real pincodes */

if(!/^\d{6}$/.test(pincode)) return;

data[pincode] = {
city: city,
state: state,
lat: lat,
lng: lng
};

});

fs.writeFileSync(
"locations.json",
JSON.stringify(data,null,2)
);

console.log("locations.json generated successfully");