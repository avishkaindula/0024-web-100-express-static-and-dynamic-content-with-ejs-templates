const path = require("path");

const express = require("express");

const app = express();

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

app.get("/", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
});

app.get("/restaurants", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  res.sendFile(htmlFilePath);
  // This is how we serve a file (such as a HTML file) as the response.
});

app.get("/recommend", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "recommend.html");
  res.sendFile(htmlFilePath);
});

app.get("/confirm", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  res.sendFile(htmlFilePath);
});

app.get("/about", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "about.html");
  res.sendFile(htmlFilePath);
});

app.listen(3000);
