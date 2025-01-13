const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    const baseURL = `http://${req.headers.host}/`;
    const parsedURL = new URL(req.url, baseURL);
    const pathname =
        parsedURL.pathname === "/" ? "/index.html" : parsedURL.pathname;

    let filePath;
    if (pathname.endsWith(".html")) {
        filePath = "." + pathname;
    } else {
        filePath = "." + pathname + ".html";
    }
    filePath = path.resolve(__dirname, filePath);

    let contentType = "text/html";

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === "ENOENT") {
                fs.readFile(
                    path.resolve(__dirname, "404.html"),
                    (err, content404) => {
                        res.writeHead(404, { "Content-Type": contentType });
                        res.end(content404, "utf-8");
                    }
                );
            } else {
                res.writeHead(500);
                res.end(
                    "Sorry, check with the site admin for error: " +
                        error.code +
                        " ..\n"
                );
            }
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf-8");
        }
    });
});

server.listen(8081, () => {
    console.log("Server running at http://localhost:8080/");
});
