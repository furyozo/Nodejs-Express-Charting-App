module.exports = class WS {

  /**
   * runs the web socket server at  specified port
   */
  static run (port) {
    var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: port})
    wss.on('connection', function (ws) {
      ws.on('message', function (message) {
        console.log('received: %s', message)
      })
      // setInterval(
      //   () => ws.send(`${new Date()}`),
      //   1000
      // )
    })
  }

}
