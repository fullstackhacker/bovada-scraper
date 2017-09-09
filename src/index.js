'use strict';

const request = require('request');
const { NFL_URL } = require('./constants');
const { normalizeNFLResponse } = require('./nfl');

const getNFLLines = next => {
  request(NFL_URL, (err, response, xmlBody) => {
    if (err) {
      next(err, false);
    }
    return next(null, normalizeNFLResponse(xmlBody));
  });
};

module.exports = { getNFLLines };
