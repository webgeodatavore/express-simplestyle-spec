var express = require('express');
var path = require('path');
var markers = require('./../index');

var app = express();
app.use(express.static('public'));
app.use('/', markers);

const port = process.env.PORT || 3000;
const listen = process.env.LISTEN || '127.0.0.1';
app.listen(port, () => console.log('Example app listening on port %s!', port));
