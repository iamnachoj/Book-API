// require modules
const http = require("http"),
  fs = require("fs"),
  url = require("url");

// create server. This wraps everything but the listen method
http
  .createServer((request, response) => {
    let addr = request.url; // obtains requested url, and appends it in the variable 'addr'
    let q = url.parse(addr, true); // parses the URL
    let filePath;

    fs.appendFile(
      // here we will log into the log.txt file the recent requests made to the server.
      // it takes 3 parameters, 1st the file, 2nd the text that will be logged, 3rd a callback function to console log whether there was an error or it was successful
      "log.txt",
      "URL: " + addr + "\nTimestamp: " + new Date() + "\n\n", // '\n' acts just as <br> in HTML
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Added to log.");
        }
      }
    );

    // The pathname is the part that comes immediately after the first “/” in the URL
    if (q.pathname.includes("documentation")) {
      filePath = __dirname + "/documentation.html"; // if the pathname of that parsed URL contains documentation (if true), then the filePath will be the documentation.html file.
    } else {
      filePath = "index.html"; // otherwise, the user will be redirected to the homepage
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw err;
      }

      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      response.end();
    });
  })
  .listen(8080);

console.log("Server is running on Port 8080.");
