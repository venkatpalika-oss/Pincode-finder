const fs = require("fs")

const BASE_URL = "https://pincode4u.com"

let urls = []

/* =============================
STATIC PAGES
============================= */

urls.push(`${BASE_URL}/`)
urls.push(`${BASE_URL}/states.html`)

/* =============================
STATE PAGES
============================= */

const stateFiles = fs.readdirSync("state")

stateFiles.forEach(file => {

if(file.endsWith(".html")){

urls.push(`${BASE_URL}/state/${file}`)

}

})

/* =============================
CITY PAGES
============================= */

stateFiles.forEach(folder => {

const path = `state/${folder}`

if(fs.existsSync(path) && fs.lstatSync(path).isDirectory()){

const cities = fs.readdirSync(path)

cities.forEach(city => {

urls.push(`${BASE_URL}/state/${folder}/${city}`)

})

}

})

/* =============================
PINCODE PAGES
============================= */

const pinFiles = fs.readdirSync("pincode")

pinFiles.forEach(pin => {

urls.push(`${BASE_URL}/pincode/${pin}`)

})

/* =============================
BUILD XML
============================= */

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

urls.forEach(url => {

xml += `
<url>
<loc>${url}</loc>
<changefreq>weekly</changefreq>
<priority>0.8</priority>
</url>
`

})

xml += `
</urlset>
`

fs.writeFileSync("sitemap.xml", xml)

console.log("Sitemap generated with", urls.length, "URLs")