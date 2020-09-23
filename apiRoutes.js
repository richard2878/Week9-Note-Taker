  
var fs = require("fs");
var notesData = getNotes();

function getNotes() {
    let data = fs.readFileSync('./db/db.json', 'utf8');

    let notes = JSON.parse(data);

    // Give each note an ID that matches its index (runs for every time the page is refreshed)
    for (let i = 0; i < notes.length; i++) {
        notes[i].id = '' + i;
    }

    return notes;
}

module.exports = function (app) {
    //Get API notes
    app.get("/api/notes", function (req, res) {
        notesData = getNotes();
        res.json(notesData);
    });
    //Create API notes
    app.post("/api/notes", function (req, res) {
        notesData.push(req.body);
        fs.writeFileSync('./db/db.json', JSON.stringify(notesData), 'utf8');
        res.json(true);
    });
    //Delete API notes
    app.delete("/api/notes/:id", function (req, res) {
        const requestID = req.params.id;
        console.log(requestID);

        let note = notesData.filter(note => {
            return note.id === requestID;
        })[0];

        console.log(note);
        const index = notesData.indexOf(note);

        notesData.splice(index, 1);

        fs.writeFileSync('./db/db.json', JSON.stringify(notesData), 'utf8');
        res.json("Note deleted");
    });
};