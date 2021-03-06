'use strict';

var Evented = require('../../node_modules/mapbox-gl/js/util/evented');
var util = require('../../node_modules/mapbox-gl/js/util/util');
var SouthAmerica = require('../fixtures/south-america.json');
var formatNumber = require('../lib/format_number');
var fpsRunner = require('../lib/fps');
var DragMouse = require('../lib/mouse_drag');

var START = {
  x: 431,
  y: 278
}

module.exports = function(options) {
    var evented = util.extend({}, Evented);

    var out = options.createMap({width:1024});

    var progressDiv = document.getElementById('progress');
    out.map.on('progress', function(e) {
      progressDiv.style.width = e.done+"%";
    });

    var dragMouse = DragMouse(START, out.map);

    out.map.on('load', function() {
      out.draw.add(SouthAmerica);

      setTimeout(function() {
        evented.fire('log', {message: 'normal - 43fps'});
        var FPSControl = fpsRunner();
        FPSControl.start();
        dragMouse(function() {
          var fps = FPSControl.stop();
          if (fps < 55) {
            evented.fire('fail', {message: formatNumber(fps)+' fps - expected 55fps or better'});
          }
          else {
            evented.fire('pass', {message: formatNumber(fps)+' fps'});
          }
        });
      }, 2000);
    });

    return evented;
};


