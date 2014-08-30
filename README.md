# Feed Titles

## Installation

```bash
$ npm install feedtitles
```

## Usage

```javascript

var Titles = require('feedtitles');

var titles = new Titles('http://feeds.reuters.com/Reuters/worldNews');

titles.on('title', function(title){
  // string title
});

titles.on('titles', function(titleArray){
  console.log(titleArray);
  // a list of title node text from the rss feed
});

// give me moar!
// calling `Titles#feed` will load up a new feed and spit things out again
titles.feed('http://feeds.reuters.com/Reuters/domesticNews');
```

## Tests

Tests use [mocha](/visionmedia/mocha)

```bash
$ npm test
```
