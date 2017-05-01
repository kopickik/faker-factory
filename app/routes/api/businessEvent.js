'use strict';

const express = require('express');
const router = express.Router();
const faker = require('faker');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json([{"id":"MR","code":"<MR>","description":"Management Review","displaySequence":1,"category":"PRL"},{"id":"PS","code":"<PS>","description":"Program Start","displaySequence":2,"category":"PRL"},{"id":"PSC","code":"<PSC>","description":"Program Strategy Confirmed","displaySequence":3,"category":"PRL"},{"id":"PPMRA","code":"PPMR#A","description":"TBD","displaySequence":4,"category":"PRL"},{"id":"PTC","code":"<PTC>","description":"Program Target Compatibility","displaySequence":5,"category":"PRL"},{"id":"PA","code":"<PA>","description":"Program Approval","displaySequence":6,"category":"PRL"},{"id":"PPMRB","code":"PPMR#B","description":"TBD","displaySequence":7,"category":"PRL"},{"id":"J1","code":"<J1> / Final Pricing","description":"Job 1 / Final Pricing","displaySequence":8,"category":"PRL"},{"id":"OPR","code":"Other Pre-Launch","description":"Other Pre-Launch","displaySequence":9,"category":"PRL"},{"id":"MRO","code":"Mix & Rates Changes only","description":"N/A","displaySequence":10,"category":"POL"},{"id":"PR","code":"Pricing Changes only","description":"N/A","displaySequence":11,"category":"POL"},{"id":"PD","code":"Product Definition Changes only","description":"N/A","displaySequence":12,"category":"POL"},{"id":"MC","code":"Multiple Changes","description":"N/A","displaySequence":13,"category":"POL"},{"id":"OPL","code":"Other Post-Launch","description":"N/A","displaySequence":14,"category":"POL"}]);
});

module.exports = router;
