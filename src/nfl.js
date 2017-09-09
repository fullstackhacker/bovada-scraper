'use strict';

const { xml2json } = require('xml-js');

const convertXMLStringToJSObject = xmlData => JSON.parse(xml2json(xmlData, { compact: true }));

module.exports = {
  convertXMLStringToJSObject
};
