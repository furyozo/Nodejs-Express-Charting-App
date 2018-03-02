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

  static isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  /**
   * runs the web socket server at  specified port
   */
  static run(port) {
    var WS = this;
    const WebSocket = require('ws');
    const wss = new WebSocket.Server({ port: 8080 });

    // Broadcast to all.
    wss.broadcast = function broadcast(data) {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    };

    wss.on('connection', function connection(ws) {
      ws.on('message', function incoming(message) {
        // Broadcast to everyone else.
        wss.clients.forEach(function each(client) {
          console.log('received: ' + message);
          if (!WS.isJsonString(message)) {
            console.error(message + " is not a JSON string");
            return;
          }
          message = JSON.parse(message);
          if (message.type === "stock/all/get")
            WS.getStocks(ws);
          else if (message.type === "stock/add")
            WS.addCode(ws, message.value);
          else if (message.type === "stock/remove")
            WS.removeCode(ws, message.value);
          else
            WS.getStocks(ws);
        });
      });
      ws.on('error', (err) => console.log(err));
    });


  }

}
