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

/* ===============================
GENERATE NEARBY PINCODES
=============================== */

let nearbyLinks = ""

const pinNumber = parseInt(pin)

for(let i = 1; i <= 6; i++){

const nearby = (pinNumber + i).toString()

if(data[nearby]){

nearbyLinks += `<a href="/pincode/${nearby}.html">${nearby}</a>\n`

}

}

/* ===============================
HTML TEMPLATE
=============================== */

const html = `<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${pin} Pincode | ${city}, ${state}</title>

<meta name="description"
content="Pincode ${pin} belongs to ${city}, ${state}. Find post office, location and postal details." />

<link rel="stylesheet" href="/css/style.css">

<!-- =========================
SCHEMA: POSTAL ADDRESS
========================= -->

<script type="application/ld+json">
{
 "@context": "https://schema.org",
 "@type": "PostalAddress",
 "postalCode": "${pin}",
 "addressLocality": "${city}",
 "addressRegion": "${state}",
 "addressCountry": "IN"
}
</script>

<!-- =========================
SCHEMA: BREADCRUMB
========================= -->

<script type="application/ld+json">
{
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
 {
 "@type": "ListItem",
 "position": 1,
 "name": "Home",
 "item": "https://www.pincode4u.com/"
 },
 {
 "@type": "ListItem",
 "position": 2,
 "name": "${state}",
 "item": "https://www.pincode4u.com/state/${stateSlug}.html"
 },
 {
 "@type": "ListItem",
 "position": 3,
 "name": "${city}",
 "item": "https://www.pincode4u.com/state/${stateSlug}/${citySlug}.html"
 },
 {
 "@type": "ListItem",
 "position": 4,
 "name": "${pin}",
 "item": "https://www.pincode4u.com/pincode/${pin}.html"
 }
 ]
}
</script>

</head>

<body>

<header>

<h1>Pincode ${pin}</h1>
<p>${city}, ${state}</p>

</header>

<div class="container">

<div class="card">

<nav class="breadcrumb">

<a href="/">Home</a> >
<a href="/state/${stateSlug}.html">${state}</a> >
<a href="/state/${stateSlug}/${citySlug}.html">${city}</a> >
${pin}

</nav>

<h2>Pincode Details</h2>

<p><strong>Pincode:</strong> ${pin}</p>

<p><strong>City:</strong>
<a href="/state/${stateSlug}/${citySlug}.html">${city}</a>
</p>

<p><strong>State:</strong>
<a href="/state/${stateSlug}.html">${state}</a>
</p>

</div>

<div class="card">

<h2>Nearby Pincodes</h2>

<div class="grid">

${nearbyLinks}

</div>

</div>

</div>

<footer>

© 2026 Pincode4U.com

</footer>

</body>
</html>`

fs.writeFileSync(`pincode/${pin}.html`, html)

console.log("Created pincode page:", pin)

}