const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const members = require("./Members");

const logger = require("./middleware/logger");

const app = express();

// Innit middleware
// app.use(logger);

// Hanldebars Middleware
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Members App title",
    members,
  })
);

// Set static folder
// if this was above the Homepage Route it would show, it works from top down
app.use(express.static(path.join(__dirname, "public")));

// Members API Routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
