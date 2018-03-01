var yahooFinance = require('yahoo-finance');
var mongoose = require('mongoose');

var Stock = require('../models/Stock.js')

module.exports = class WS {

  /**
   * runs the web socket server at  specified port
   */
  static run(port) {
    var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: port})
    wss.on('connection', function (ws) {
      ws.on('message', function (message) {
        console.log('received: %s', message)

        yahooFinance.historical({
          symbol: message,
          from: '2015-01-01',
          to: new Date().toISOString().slice(0,10),
          period: 'm'
          // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
        }, function (err, quotes) {
          if (err) console.error(err);
          else if (quotes.length === 0) console.error("stock does not exist");
          else {
            Stock.add(message, function(err, stock) {
              if (err) console.error(err);
            })
            console.log(quotes);
          }
        });

      })
      // setInterval(
      //   () => ws.send(`${new Date()}`),
      //   1000
      // )
    })
  }

}
