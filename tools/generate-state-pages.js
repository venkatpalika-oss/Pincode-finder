const fs = require("fs")

const data = JSON.parse(fs.readFileSync("locations.json"))

const states = {}

/* =================================
COLLECT STATES + CITIES
================================= */

for (const pin in data) {

let state = data[pin].state
let city = data[pin].city

if (!state || state === "NA") continue

state = state.replace(/"/g, "").trim()
city = city.replace(/"/g, "").trim()

if (!states[state]) {
states[state] = new Set()
}

states[state].add(city)

}

/* =================================
GENERATE STATE PAGES
================================= */

for (const state in states) {

const slug = state
.toLowerCase()
.replace(/\s+/g,"-")

const cities = [...states[state]].sort()

let cityLinks = ""

cities.forEach(city => {

const citySlug = city
.toLowerCase()
.replace(/\s+/g,"-")

cityLinks += `<a href="/city/${citySlug}.html">${city}</a>\n`

})

const html = `<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${state} Pincode List | Cities & Post Offices</title>

<meta name="description"
content="Find all cities and postal PIN codes in ${state}. Browse districts, cities and post offices." />

<link rel="stylesheet" href="/css/style.css">

</head>

<body>

<header>

<h1>${state} Pincode Directory</h1>

<p>Browse all cities in ${state} to find postal PIN codes.</p>

</header>

<div class="container">

<div class="card">

<h2>Cities in ${state}</h2>

${cityLinks}

</div>

</div>

</body>
</html>`

fs.writeFileSync(`state/${slug}.html`, html)

console.log("Created state page:", slug)

}