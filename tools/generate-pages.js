const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..");

const dataPath = path.join(projectRoot, "locations.json");

const pincodeDir = path.join(projectRoot, "pincode");
const cityDir = path.join(projectRoot, "city");
const stateDir = path.join(projectRoot, "state");

/* Create folders if missing */

[pincodeDir, cityDir, stateDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
});

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const cities = {};
const states = {};

Object.keys(data).forEach(pincode => {

  const item = data[pincode];

  /* Collect city/state data */

  if (!cities[item.city]) cities[item.city] = [];
  if (!states[item.state]) states[item.state] = [];

  cities[item.city].push(pincode);
  states[item.state].push(pincode);

  /* PINCODE PAGE */

  const html = `
<!DOCTYPE html>
<html>
<head>
<title>${pincode} Pincode – Pincode4U</title>
</head>
<body>

<h1>${pincode} Pincode</h1>

<p>City: ${item.city}</p>
<p>State: ${item.state}</p>

</body>
</html>
`;

  fs.writeFileSync(
    path.join(pincodeDir, `${pincode}.html`),
    html
  );

});

/* CITY PAGES */

Object.keys(cities).forEach(city => {

  let list = cities[city];

  let html = `
<!DOCTYPE html>
<html>
<head>
<title>${city} Pincode – Pincode4U</title>
</head>
<body>

<h1>${city} Pincode</h1>
<ul>
`;

  list.forEach(pin=>{
    html += `<li><a href="../pincode/${pin}.html">${pin}</a></li>`;
  });

  html += `
</ul>

</body>
</html>
`;

  const cleanCity = city
  .toLowerCase()
  .replace(/"/g,"")
  .replace(/[^\w\s-]/g,"")
  .replace(/\s+/g,"-")
  .trim();

const fileName = cleanCity + ".html";

  fs.writeFileSync(
    path.join(cityDir, fileName),
    html
  );

});

/* STATE PAGES */

Object.keys(states).forEach(state => {

  let list = states[state];

  let html = `
<!DOCTYPE html>
<html>
<head>
<title>${state} Pincodes – Pincode4U</title>
</head>
<body>

<h1>${state} Pincode Directory</h1>
<ul>
`;

  list.forEach(pin=>{
    html += `<li><a href="../pincode/${pin}.html">${pin}</a></li>`;
  });

  html += `
</ul>

</body>
</html>
`;

  const cleanState = state
  .toLowerCase()
  .replace(/"/g,"")
  .replace(/\s+/g,"-")
  .trim();

const fileName = cleanState + ".html";

  fs.writeFileSync(
    path.join(stateDir, fileName),
    html
  );

});

console.log("SEO pages generated successfully");