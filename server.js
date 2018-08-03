//Install express server
const express = require('express');
const path = require('path');

const app = express();

// var FileSaver = require('file-saver');


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/minesweeper'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/minesweeper/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);


// var keysString = "export const testKeys = {" +
//                               "apiKey:" + process.env.API_KEY +
//                               "authDomain:" + process.env.AUTH_DOMAIN +
//                               "databaseURL:"+ process.env.DATABASE_URL +
//                               "storageBucket:" + process.env.STORAGE_BUCKET +
//                               "};";
//
//
// var blob = new Blob([keysString], {type: "text/plain;charset=utf-8"});
// FileSaver.saveAs(blob, "confTest.ts");

//
// console.log("process.env = ", process.env);
