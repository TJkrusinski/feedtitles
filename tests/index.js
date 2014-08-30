'use strict';

var Titles = require('..');
var assert = require('chai').assert;

describe('reuters()', function(){
  this.timeout(5000);
  it('gets an array of headlines', function(d){
    var once = 0;
    var url = 'http://feeds.reuters.com/Reuters/worldNews';
    var instance = new Titles(url).on('titles', function(titles){
      assert.isArray(titles);
      titles.forEach(assert.isString);
      once++;
      if (once == 2) d();
    });

    instance.feed('http://feeds.reuters.com/Reuters/domesticNews');
  });
});
