//require fs package
const fs = require("fs");
const data  = require("../db/db.json");

//exporting to Heroku?
module.exports = function(app) {
    //Get API notes
    app.get("/api/notes", function(req, res) {
        return res.json(data);
    })
    //Post API notes
    app.post("/api/notes", function (req, res) {
        console.log("Post Successful!")
        //ID assigned
        req.body.id = data.length + 1;
        //push dbJason
        notesData.push(req.body);
        fs.writeFileSync("./db/db.json", JSON.stringify(data), 'utf8');
        res.json(true);
    });
    //Delete API notes
    app.delete("/api/notes/:id", function (req, res) {
        const requestID = req.params.id;
        console.log(requestID);

        let note = data.filter(note => {
            return note.id === requestID;
        })[0];

        console.log(note);
        const index = data.indexOf(note);

        data.splice(index, 1);

        fs.writeFileSync('./db/db.json', JSON.stringify(data), 'utf8');
        res.json("Note deleted");
    });

}