const path = require("path");

module.exports = function(app) {
    //read and export notes.html
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });
    //read and export index.html
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  });
};