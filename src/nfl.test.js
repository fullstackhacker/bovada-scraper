const test = require('tape');
const fs = require('fs');
const path = require('path');
const { isString, isObject } = require('lodash/fp/lang');

const { convertXMLStringToJSObject } = require('./nfl');

const NFL_FIXTURE_PATH = path.join(__dirname, 'fixtures', 'NFL.xml');
const readNFLXMLFile = next => {
  fs.readFile(NFL_FIXTURE_PATH, 'utf-8', next);
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
    assert.ok(isObject(jsObject));
    assert.end();
  });
});
