'use strict';

const { xml2json } = require('xml-js');

const convertXMLStringToJSObject = xmlData => JSON.parse(xml2json(xmlData, { compact: true }));
const getDateObjects = jsonResponse => jsonResponse.Schedule.EventType.Date;
const getGamesFromDateObjects = dateObjects =>
  dateObjects.reduce((games, dateObject) => games.concat(dateObject.Event), []);

module.exports = {
  convertXMLStringToJSObject,
  getDateObjects,
  getGamesFromDateObjects
};
