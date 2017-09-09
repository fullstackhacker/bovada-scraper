'use strict';

const { xml2json } = require('xml-js');

const convertXMLStringToJSObject = xmlData => JSON.parse(xml2json(xmlData, { compact: true }));
const getDateObjects = jsonResponse => jsonResponse.Schedule.EventType.Date;

module.exports = {
  convertXMLStringToJSObject,
  getDateObjects
};
