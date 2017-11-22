var express = require('express');
var path = require('path');
var markers = require('./../index');

var app = express();
app.use('/', markers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Example app listening on port %s!', port))
