const fs = require("fs")

const data = JSON.parse(fs.readFileSync("locations.json"))

/* ===============================
GENERATE PINCODE PAGES
=============================== */

for (const pin in data) {

let city = data[pin].city
let state = data[pin].state

if (!city || !state) continue
if (state === "NA") continue

city = city.replace(/"/g,"").trim()
state = state.replace(/"/g,"").trim()

const citySlug = city.toLowerCase().replace(/\s+/g,"-")
const stateSlug = state.toLowerCase().replace(/\s+/g,"-")

const html = `<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${pin} Pincode | ${city}, ${state}</title>

<meta name="description"
content="Pincode ${pin} belongs to ${city}, ${state}. Find post office, location and postal details." />

<link rel="stylesheet" href="/css/style.css">

</head>

<body>

<header>

<h1>Pincode ${pin}</h1>

<p>${city}, ${state}</p>

</header>

<div class="container">

<div class="card">

<h2>Pincode Details</h2>

<p><strong>Pincode:</strong> ${pin}</p>

<p><strong>City:</strong> <a href="/state/${stateSlug}/${citySlug}.html">${city}</a></p>

<p><strong>State:</strong> <a href="/state/${stateSlug}.html">${state}</a></p>

</div>

</div>

</body>
</html>`

fs.writeFileSync(`pincode/${pin}.html`, html)

console.log("Created pincode page:", pin)

}