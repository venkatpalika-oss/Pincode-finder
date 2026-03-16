const fs = require("fs")

const BASE_URL = "https://pincode4u.com"

/* =============================
STATE SITEMAP
============================= */

let stateUrls = []

const stateFiles = fs.readdirSync("state")

stateFiles.forEach(file => {

if(file.endsWith(".html")){

stateUrls.push(`${BASE_URL}/state/${file}`)

}

})

let stateXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

stateUrls.forEach(url => {

stateXml += `
<url>
<loc>${url}</loc>
<changefreq>monthly</changefreq>
<priority>0.8</priority>
</url>
`

})

stateXml += `</urlset>`

fs.writeFileSync("sitemap-states.xml", stateXml)



/* =============================
CITY SITEMAP
============================= */

let cityUrls = []

stateFiles.forEach(folder => {

const path = `state/${folder}`

if(fs.existsSync(path) && fs.lstatSync(path).isDirectory()){

const cities = fs.readdirSync(path)

cities.forEach(city => {

cityUrls.push(`${BASE_URL}/state/${folder}/${city}`)

})

}

})

let cityXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

cityUrls.forEach(url => {

cityXml += `
<url>
<loc>${url}</loc>
<changefreq>monthly</changefreq>
<priority>0.7</priority>
</url>
`

})

cityXml += `</urlset>`

fs.writeFileSync("sitemap-cities.xml", cityXml)



/* =============================
PINCODE SITEMAP
============================= */

let pinUrls = []

const pinFiles = fs.readdirSync("pincode")

pinFiles.forEach(pin => {

pinUrls.push(`${BASE_URL}/pincode/${pin}`)

})

let pinXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

pinUrls.forEach(url => {

pinXml += `
<url>
<loc>${url}</loc>
<changefreq>monthly</changefreq>
<priority>0.6</priority>
</url>
`

})

pinXml += `</urlset>`

fs.writeFileSync("sitemap-pincodes.xml", pinXml)



/* =============================
SITEMAP INDEX
============================= */

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<sitemap>
<loc>${BASE_URL}/sitemap-states.xml</loc>
</sitemap>

<sitemap>
<loc>${BASE_URL}/sitemap-cities.xml</loc>
</sitemap>

<sitemap>
<loc>${BASE_URL}/sitemap-pincodes.xml</loc>
</sitemap>

</sitemapindex>
`

fs.writeFileSync("sitemap-index.xml", sitemapIndex)

console.log("Sitemaps generated successfully.")