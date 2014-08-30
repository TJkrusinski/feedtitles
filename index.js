'use strict';

var events = require('events');
var request = require('request');
var sax = require('sax');
var inherit = require('util').inherits;

inherit(Titles, events.EventEmitter);

/**
 *  Expose `Titles`
 */

module.exports = Titles;

/**
 *  Ask me how much I care how ugly this is
 *
 *  @param {String} url - feed url
 */

function Titles (url) {
  return this.feed(url);
};

Titles.prototype.feed = function(url) {
  var parser = sax.createStream();
  var current = false;
  var titles = [];
  var self = this;

  parser.on('opentag', onOpen);
  parser.on('text', onText);
  parser.on('closetag', onClose);
  parser.on('error', onError);
  parser.on('end', done);

  /**
   *  Pipe request into the parser
   */

  request(url).pipe(parser);

  /**
   *  If we are in a title node then push on the text
   *
   *  @param {String} text
   */

  function onText (text) {
    if (!current || !text) return;
    titles.push(text);
    self.emit('title', text);
  };

  /**
   *  If we find a title node, the say we are in one
   *
   *  @param {Object} tag
   */
   
  function onOpen(tag){
    if (tag.name != 'TITLE') {
      current = false;
      return;
    };

    current = true;
  };

  /**
   *  End of node happened, close us out not matter what  
   */

  function onClose(){
    current = false;
  };

  /**
   *  Emit an error
   */

  function onError(err) {
    self.emit('error', err);
  };

  /**
   *  We are done
   */

  function done() {
    self.emit('titles', titles);
  };
};
