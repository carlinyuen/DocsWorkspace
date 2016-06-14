'use strict';

$(function() {
  $('iframe').resizable({
    start: function(event, ui) {
      $('iframe').css('pointer-events','none');
    },
    stop: function(event, ui) {
      $('iframe').css('pointer-events','auto');
    }
  });
});
