'use strict';

const { xml2json } = require('xml-js');

const convertXMLStringToJSObject = xmlData => JSON.parse(xml2json(xmlData, { compact: true }));
const getDateObjects = jsonResponse => jsonResponse.Schedule.EventType.Date;
const getGamesFromDateObjects = dateObjects =>
  dateObjects.reduce((games, dateObject) => games.concat(dateObject.Event), []);

const normalizeGames = games => games.map(normalizeGame);

const normalizeGame = game => {
  const [homeTeam, awayTeam] = game.Competitor.map(normalizeTeamLine);
  const timestamp = Number(game.Time._attributes.TS);
  const [over, under] = game.Line.Choice.map(normalizeScoreLine);

  return {
    homeTeam,
    awayTeam,
    timestamp,
    scoreLine: {
      over,
      under
    }
  };
};

const normalizeTeamLine = team => {
  const [pointSpreadData, moneyLineData] = team.Line;

  const pointSpread = {
    line: pointSpreadData.Choice._attributes.NUMBER,
    vig: pointSpreadData.Choice.Odds._attributes.Line
  };

  const moneyLine = moneyLineData.Choice.Odds._attributes.Line;

  return { pointSpread, moneyLine };
};

const normalizeScoreLine = scoreLine => ({
  line: scoreLine._attributes.NUMBER,
  vig: scoreLine.Odds._attributes.Line
});

module.exports = {
  convertXMLStringToJSObject,
  getDateObjects,
  getGamesFromDateObjects,
  normalizeGames
};
