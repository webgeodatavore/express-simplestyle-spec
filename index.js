// Copyright 2016 - Yuri Astrakhan
// Copyright 2017 - Thomas Gratier
'use strict';
const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const makizushi = Promise.promisify(require('makizushi'));

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

    return Promise.try(() => {

        if (params.color.length !== 3 && params.color.length !== 6) {
            throw new Error('Bad color');
        }
        let isRetina;
        if (params.scale === undefined) {
            isRetina = false;
        } else if (params.scale === '2') {
            isRetina = true;
        } else {
            throw new Error('Only retina @2x scaling is allowed for marks');
        }

        return makizushi({
            base: params.base, // "pin"
            size: params.size, // s|m|l
            symbol: params.symbol, // undefined, digit, letter, or maki symol name - https://www.mapbox.com/maki/
            tint: params.color, // in hex - "abc" or "aabbcc"
            retina: isRetina // true|false
        });
    }).then(data => {
        res.type('png').send(data);
    }).catch(err => {
      return res.status(500)
      .json({
        message: err.message
      });
    }).catch(next);
}
