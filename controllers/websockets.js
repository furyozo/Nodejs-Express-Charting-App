var yahooFinance = require('yahoo-finance');
var mongoose = require('mongoose');

var Stock = require('../models/Stock.js')

module.exports = class WS {

  /**
   * runs the web socket server at  specified port
   */
  static run(port) {
    var WS = this;
    var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: port})
    wss.on('connection', function (ws) {
      ws.on('message', function (message) {
        console.log('received: %s', message)

        Stock.add(message, function(err, stock) {
          if (err) console.error(err);
          Stock.getChartableStocks(function(arr) {
            console.log(arr);
            ws.send(JSON.stringify(arr));
          });
        })

      })
      // setInterval(
      //   () => ws.send(`${new Date()}`),
      //   1000
      // )
    })
  }

}
