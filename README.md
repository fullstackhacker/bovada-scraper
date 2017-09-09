# Bovada

> Bovada is a registered trademark. All rights reserved.

## Overview

A data converter from Bovada's XML APIs to JSON. Stil under active development.
Currently only supports NFL lines.

V1 Goals:
 * [x] NFL
 * [ ] NBA

## API

### getNFLLines(cb)

Gets all currently live NFL lines from Bovada. The callback takes two args:

| Field    | Type   | Description                                                       | Default |
|----------|--------|-------------------------------------------------------------------|---------|
| err      | Object | Error while processing NFL Lines                                  | null    |
| nflGames | Array  | List of JS objects whose data is normalized from Bovada's XML API | []      |

```javascript

const { getNFLLines } = require('bovada');

getNFLLines((err, nflGames) => {
  // magic
});

```
