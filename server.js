var express = require("express")

var port = process.env.PORT || 8080;

var app = express();

app.use('/', express.static(__dirname + '/client'))

app.get("/*", (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
})

app.listen(port, () => console.log("app listening on port " + port));