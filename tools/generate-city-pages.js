const fs = require("fs")

const data = JSON.parse(fs.readFileSync("locations.json"))

const cities = {}

/* ============================
COLLECT STATE + CITY + PIN
============================ */

for (const pin in data) {

let city = data[pin].city
let state = data[pin].state

if (!city || !state) continue
if (state === "NA") continue

city = city.replace(/"/g,"").trim()
state = state.replace(/"/g,"").trim()

const key = state + "|" + city

if (!cities[key]) {
cities[key] = {
state: state,
city: city,
pins: []
}
}

cities[key].pins.push(pin)

}

/* ============================
GENERATE CITY PAGES
============================ */

for (const key in cities) {

const cityData = cities[key]

const state = cityData.state
const city = cityData.city
const pins = cityData.pins.sort()

const stateSlug = state
.toLowerCase()
.replace(/\s+/g,"-")

const citySlug = city
.toLowerCase()
.replace(/\s+/g,"-")

/* create state folder if not exists */

const stateFolder = `state/${stateSlug}`

if (!fs.existsSync(stateFolder)) {
fs.mkdirSync(stateFolder)
}

/* build pincode links */

let pinLinks = ""

pins.forEach(pin => {

pinLinks += `<a href="/pincode/${pin}.html">${pin}</a>\n`

})

/* HTML template */

const html = `<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${city} Pincode List (${state}) | Pincode4U</title>

<meta name="description"
content="Find all postal PIN codes in ${city}, ${state}. Browse post offices and area pincodes." />

<link rel="stylesheet" href="/css/style.css">

</head>

<body>

<header>

<h1>${city} Pincode Directory</h1>

<p>All postal PIN codes in ${city}, ${state}</p>

</header>

<div class="container">

<div class="card">

<h2>Pincodes in ${city}</h2>

${pinLinks}

</div>

</div>

</body>
</html>`

fs.writeFileSync(`${stateFolder}/${citySlug}.html`, html)

console.log("Created city page:", stateSlug + "/" + citySlug)

}