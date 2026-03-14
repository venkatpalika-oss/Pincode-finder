const fs = require("fs");

let urls = [];

fs.readdirSync("pincode").forEach(f=>{
urls.push(`/pincode/${f}`);
});

fs.readdirSync("city").forEach(f=>{
urls.push(`/city/${f}`);
});

fs.readdirSync("state").forEach(f=>{
urls.push(`/state/${f}`);
});

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

urls.forEach(url=>{
xml+=`<url><loc>https://pincode4u.com${url}</loc></url>\n`;
});

xml+=`</urlset>`;

fs.writeFileSync("sitemap.xml",xml);

console.log("sitemap generated");