const express = require('express');
const app = express();
const path = require('path');

// Serve static files for application
app.user(express.static(__dirname + '/dist'));

// Will listen on port 8080
app.listen(process.env.PORT || 8080);

// Allow Angular to handle routing instead of server
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})
