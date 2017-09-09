const test = require('tape');
const fs = require('fs');
const path = require('path');
const { isString } = require('lodash/fp/lang');

const NFL_FIXTURE_PATH = path.join(__dirname, 'fixtures', 'NFL.xml');

const readNFLXMLFile = next => {
  fs.readFile(NFL_FIXTURE_PATH, 'utf-8', next);
};

test('Can properly load xml file', assert => {
  readNFLXMLFile((err, data) => {
    assert.ok(isString(data), 'loaded xml data should be a string');
    assert.end();
  });
});
