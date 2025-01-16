const express = require("express");
const path = require("path");
const app = express();

// Define paths for HTML files
const indexPath = path.join(__dirname, "index.html");
const aboutPath = path.join(__dirname, "about.html");
const contactPath = path.join(__dirname, "contact-me.html");
const notFoundPath = path.join(__dirname, "404.html");

// Routes
app.get("/", (req, res) => {
    res.sendFile(indexPath);
});

app.get("/about", (req, res) => {
    res.sendFile(aboutPath);
});

app.get("/contact-me", (req, res) => {
    res.sendFile(contactPath);
});

// Handle 404
app.use((req, res) => {
    res.status(404).sendFile(notFoundPath);
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
