const test = require('tape');
const fs = require('fs');
const path = require('path');
const { isString, isObject } = require('lodash/fp/lang');
const { map } = require('lodash/fp/collection');

const {
  convertXMLStringToJSObject,
  getDateObjects,
  getGamesFromDateObjects,
  normalizeGames
} = require('./nfl');

const NFL_XML_FIXTURE_PATH = path.join(__dirname, 'fixtures', 'NFL.xml');
const readNFLXMLFile = next => {
  fs.readFile(NFL_XML_FIXTURE_PATH, 'utf-8', next);
};

test('Can properly load xml file', assert => {
  readNFLXMLFile((err, xmlData) => {
    assert.ok(isString(xmlData), 'loaded xml data should be a string');
    assert.end();
  });
});

test('Can convert xml string to js object', assert => {
  readNFLXMLFile((err, xmlData) => {
    const jsObject = convertXMLStringToJSObject(xmlData);
    assert.ok(isObject(jsObject), 'xml string can be converted to an xml object');
    assert.end();
  });
});

test('Can grab date elements', assert => {
  readNFLXMLFile((err, xmlData) => {
    const jsObject = convertXMLStringToJSObject(xmlData);
    const dateObjects = getDateObjects(jsObject);
    const attributes = map('_attributes')(dateObjects);
    map(obj => assert.ok(obj.hasOwnProperty('TS'), 'each date object has a timestamp'))(attributes);
    assert.end();
  });
});

test('Can compile a list of all games from date objects', assert => {
  // load fixture
  const nflGamesFixture = require(path.join(__dirname, 'fixtures', 'nflGames'));

  readNFLXMLFile((err, xmlData) => {
    const jsObject = convertXMLStringToJSObject(xmlData);
    const dateObjects = getDateObjects(jsObject);
    const games = getGamesFromDateObjects(dateObjects);

    assert.deepEqual(games, nflGamesFixture, 'should compile a list of all upcoming/available games');
    assert.end();
  });
});

test('Can normalize game info for pointspread, moneyline, and timestamps', assert => {
  const nflGamesNormalizedFixture = require(path.join(__dirname, 'fixtures', 'nflGamesNormalized'));

  readNFLXMLFile((err, xmlData) => {
    const jsObject = convertXMLStringToJSObject(xmlData);
    const dateObjects = getDateObjects(jsObject);
    const games = getGamesFromDateObjects(dateObjects);
    const normalizedGames = normalizeGames(games);

    assert.deepEqual(
      normalizedGames,
      nflGamesNormalizedFixture,
      'should normalize all games into relevant data'
    );
    assert.end();
  });
});
