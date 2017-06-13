'use strict';

const express = require('express');
const router = express.Router();
const faker = require('faker');

router.get('/', function(req, res, next) {
  let jsonResponse = [];
  for (let i = 0; i < 10; i++) {
    jsonResponse.push({
      id: faker.random.number({min: 999999999, max: 10000000000}),
      name: faker.random.arrayElement(['CAP 2015 Great Britain', 'TTA 2018 USA']),
      mmView: { 
        id: faker.random.number({min: 999999999, max: 10000000000}),
        name: faker.random.arrayElement(['CAP 2015 Great Britain MM', 'TTA 2018 USA MM']),
        programCode: faker.random.arrayElement(['C214', 'C481', 'M582']),
        ptvl: 'CAP 2015',
        modelYear: '2015',
        versioned: faker.random.boolean()
      },
      marketFeatureCode: null,
      marketFeatureName: null,
      mktGrpView: {
        marketGroupName: 'UNITED KINGDOM', 
        marketGroupCodes: [faker.random.arrayElement(['GREAT BRITAIN (WAEGB)', 'GREAT BRITAIN (WAEGN)'])]
      },
      versioned: faker.random.boolean()
    });
  }
  res.json(jsonResponse);
});

module.exports = router;
