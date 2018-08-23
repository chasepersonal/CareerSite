const express = require('express');
const app = express();
const path = require('path');

// Serve static files for application
app.user(express.static(__dirname + '/dist/career-site'));

// Will listen on port 8080
app.listen(process.env.PORT || 8080);

// Allow Angular to handle routing instead of server
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/career-site/index.html'));
})
