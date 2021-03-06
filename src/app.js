const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const port = process.env.PORT || 8080;

// defin paths for express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlevars engine and views location
app.set("view engine", "hbs"); // handle bars is set up
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to servie
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    author: "Elias Proctor",
    desc: "This page is the home page for the site",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    author: "Elias Proctor II",
    helpText:
      "This web application was created through a Udemy course. \
              Simply enter a location and it will show you the weather.",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    author: "Elias Josiah Proctor",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address || req.query.address == "") {
    return res.send({
      error: "Address is required",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        return res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/weather-by-coords", (req, res) => {
  const { latitude, longitude } = req.query;
  if (!latitude || !longitude) {
    return res.send({
      error: "Longitude and latitude are required",
    });
  }
  forecast(latitude, longitude, (err, forecastData) => {
    if (err) return res.send({ err });
    res.send({ data: forecastData });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send(req.query);
});

// if someone tries to request folder in help that doesn't exist
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help article not found",
    author: "Elias Proctor",
  });
});

// 404 page, must come last
app.get("*", (req, res) => {
  res.render("404", {
    title: "Page not found.",
    author: "Elias Proctor",
  });
});

app.listen(port, () => {
  console.log("Server is running up on " + port);
});
