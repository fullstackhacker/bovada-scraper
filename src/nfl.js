'use strict';

const { xml2json } = require('xml-js');

const convertXMLStringToJSObject = xmlData => JSON.parse(xml2json(xmlData, { compact: true }));
const getDateObjects = jsonResponse => jsonResponse.Schedule.EventType.Date;
const getGamesFromDateObjects = dateObjects =>
  dateObjects.reduce((games, dateObject) => games.concat(dateObject.Event), []);

const normalizeGames = games => games.map(normalizeGame);

const normalizeGame = game => {
  const [homeTeam, awayTeam] = game.Competitor.map(normalizeTeamLines);
  const timestamp = Number(game.Time._attributes.TS);
  return {
    homeTeam,
    awayTeam,
    timestamp
  };
};

const normalizeTeamLines = team => {
  const [pointSpreadData, moneyLineData] = team.Line;

  const pointSpread = {
    line: pointSpreadData.Choice._attributes.NUMBER,
    vig: pointSpreadData.Choice.Odds._attributes.Line
  };

  const moneyLine = moneyLineData.Choice.Odds._attributes.Line;

  return { pointSpread, moneyLine };
};

module.exports = {
  convertXMLStringToJSObject,
  getDateObjects,
  getGamesFromDateObjects,
  normalizeGames
};
