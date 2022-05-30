const fs = require("fs");

const path = require("path");

const express = require("express");

const app = express();

// This is how we set a template engine.
app.set("views", path.join(__dirname, "views"));
// this will tell express where to find our template files.
// The first "views" is a reserved word used on express
// "views" inside the path is the name of the folder where the template files exist.
app.set("view engine", "ejs");
// "Set" will allow us to set certain "options" for the express app
// "view engine" will tell express that we need to use an engine called template engine.
// EJS is the name of the engine.
// now we need to "convert" the "html" files into "ejs" files by renaming html project files from .html to .ejs

// CSS and JavaScript files responsible for front end are examples for "static files"
// They are pre written, therefore known as static, they are not dynamic.
// Static files won't ever be touched or changed by the server side code.
app.use(express.static("public"));
// The above code sets up a request handler that will be executed on every incoming request
// that checks if this request is for a static file
// and if it's able to deliver that file from some folder in the project.
// "public" is the name of the folder that holds the static files we want to serve.
// The above line of code tells express that for every incoming request,
// it should check whether it is a file that can be found in the public folder.
// And if it is, the file will be return as a response.
// If it's not, the request will be forwarded to our other routes.
// And if it's also not in the routes, then the request fails.
// Now we can see the Styles and JS on the HTML pages.
// But "we don't have to change" the links on the HTML files
// from styles/shared.css to => public/styles/shared.css

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  // const htmlFilePath = path.join(__dirname, "views", "index.html");
  // res.sendFile(htmlFilePath);
  res.render("index");
  // .render will render templates.
  // Which means parse a template file with help of a "template engine"
  // and then convert it into html then will be send back to the browser.
  // the path to the index.ejs was set on this code above. =>
  // app.set("views", path.join(__dirname, "views"));
});

app.get("/restaurants", function (req, res) {
  // const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  // res.sendFile(htmlFilePath);
  // This is how we serve a file (such as a HTML file) as the response.

  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
  // In the JS object above, we specify any variables we refer in the template as keys => numberOfRestaurants
  // And then we store an value for that key.
  // And that's the value that will be output in the template.
  // storedRestaurants.length will give the number of items in that array.
  // That number is equal to the number of restaurants we've entered.
  // restaurants is the key we created for the "for loop" inside the restaurants.ejs file.
});

app.get("/recommend", function (req, res) {
  // const htmlFilePath = path.join(__dirname, "views", "recommend.html");
  // res.sendFile(htmlFilePath);
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  // const restaurantName = req.body.name;
  // The above code will extract the "name" from the submitted form

  const restaurant = req.body;
  // The above code will extract the entire form.

  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  // We can just send back a html response like following.
  // res.send("<h1>Username stored!</h1>");
  // but if the user ever try to "reload" the confirmation page,
  // they will be asked whether to submit the form data again through an alert.
  // And if the user hits confirm, then the same form will be submitted again.
  // We can get rid of this by "redirecting" a user to another page like this.
  res.redirect("/confirm");
  // the path to the html file of /confirm has already been created by a code below.
});
// It's allowed to use the same path for two different routes if we use different http methods.

app.get("/confirm", function (req, res) {
  // const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  // res.sendFile(htmlFilePath);
  res.render("confirm");
});

app.get("/about", function (req, res) {
  // const htmlFilePath = path.join(__dirname, "views", "about.html");
  // res.sendFile(htmlFilePath);
  res.render("about");
});

app.listen(3000);
