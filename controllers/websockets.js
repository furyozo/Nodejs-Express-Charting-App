var yahooFinance = require('yahoo-finance');
var mongoose = require('mongoose');

var Stock = require('../models/Stock.js')

module.exports = class WS {

  /**
   * adds a new code to the databse and sends the new dataset to frotnend
   */
  static addCode(ws, value) {
    Stock.add(value, function(err, stock) {
      if (err) console.error(err);
      Stock.getChartableStocks(function(arr) {
        // console.log(arr);
        ws.send(JSON.stringify(arr));
      });
    })
  }

  /**
   * removes a stock and sends the new dataset to frotnend
   */
  static removeCode(ws, value) {
    Stock.remove({name: value}, function(err, stock) {
      if (err) console.error(err);
      Stock.getChartableStocks(function(arr) {
        // console.log(arr);
        ws.send(JSON.stringify(arr));
      });
    })
  }

  /**
   * returns all the stocks by formatted stock objects
   */
  static getStocks(ws) {
    Stock.getChartableStocks(function(arr) {
      ws.send(JSON.stringify(arr));
    });
  }

  /**
   * runs the web socket server at  specified port
   */
  static run(port) {
    var WS = this;
    var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: port})
    wss.on('connection', function (ws) {
      ws.on('message', function (message) {
        console.log('received: ' + message);
        message = JSON.parse(message);

        if (message.type === "stock/all/get")
          WS.getStocks(ws);
        else if (message.type === "stock/add")
          WS.addCode(ws, message.value);
        else if (message.type === "stock/remove")
          WS.removeCode(ws, message.value);

      })
    })
  }

}
