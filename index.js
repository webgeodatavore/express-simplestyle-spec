// Copyright 2016 - Yuri Astrakhan
// Copyright 2017 - Thomas Gratier
'use strict';
const express = require('express');
const router = express.Router();

var makiwich = require('@mapbox/makiwich');
var mapnik = require('mapnik');

// marker icon generator  (base, size, symbol, color, scale), with the symbol being optional
// /v4/marker/pin-m-cafe+7e7e7e@2x.png -- the format matches that of mapbox to simplify their library usage
router.get('/v4/marker/:base([\\w]+)-:size([sml])\\+:color([a-f0-9]+).png', markerHandler);
router.get('/v4/marker/:base([\\w]+)-:size([sml])\\+:color([a-f0-9]+)@:scale([\\.\\d]+)x.png', markerHandler);
router.get('/v4/marker/:base([\\w]+)-:size([sml])-:symbol([-\\w]+)\\+:color([a-f0-9]+).png', markerHandler);
router.get('/v4/marker/:base([\\w]+)-:size([sml])-:symbol([-\\w]+)\\+:color([a-f0-9]+)@:scale([\\.\\d]+)x.png', markerHandler);

module.exports = router;

/**
 * Web server (express) route handler to get a marker icon
 * @param req request object
 * @param res response object
 * @param next will be called if request is not handled
 */
function markerHandler(req, res, next) {

    let start = Date.now(),
        params = req.params;

    if (params.color.length !== 3 && params.color.length !== 6) {
        throw new Error('Bad color');
    }
    let scale;
    if (params.scale === undefined) {
        scale = {};
    } else if (params.scale === '2') {
        scale = { scale: 2 }
    } else {
        throw new Error('Only retina @2x scaling is allowed for marks');
    }

    makiwich({
        tint: params.color,
        symbol: params.symbol, // Valid Maki v2.1.0 icon
        size: params.size // `s` or `l`
    }, (err, svg) => {
      if (err) {
        return res.status(500)
        .json({
          message: err.message
        });
      };

      // Use mapnik to convert the SVG to a PNG and save it
      var s = new mapnik.Image.fromSVGBytesSync(new Buffer(svg), scale);
      s.premultiplySync();
      s.encode('png', {}, function(err, encode) {
        if (err) {
          throw err;
        }
        res.type('png').send(encode);
      });
    });
}
