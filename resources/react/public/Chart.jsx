import React from 'react';
import ReactDOM from 'react-dom';
import Chartjs from 'chart.js';

export default class Chart extends React.Component {

  constructor(props) {
    super(props);
  }

  // connect to the web sockets server
  WSConnect() {
    var ws = new WebSocket('ws://localhost:8080');
    // event emmited when connected
    ws.onopen = function () {
      console.log('websocket is connected ...')
      // sending a send event to websocket server
      ws.send('connected')
    }
    // event emmited when receiving message
    ws.onmessage = function (ev) {
      console.log(ev);
    }
  }

  // gets called after the componnent was mounted
  componentDidMount() {

    new Chartjs(document.getElementById("chart"), {
      type: 'line',
      data: {
        labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
        datasets: [{
          data: [86,114,106,106,107,111,133,221,783,2478],
          label: "Africa",
          borderColor: "#3e95cd",
          fill: false
        }, {
          data: [282,350,411,502,635,809,947,1402,3700,5267],
          label: "Asia",
          borderColor: "#8e5ea2",
          fill: false
        }, {
          data: [168,170,178,190,203,276,408,547,675,734],
          label: "Europe",
          borderColor: "#3cba9f",
          fill: false
        }, {
          data: [40,20,10,16,24,38,74,167,508,784],
          label: "Latin America",
          borderColor: "#e8c3b9",
          fill: false
        }, {
          data: [6,3,2,2,7,26,82,172,312,433],
          label: "North America",
          borderColor: "#c45850",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'World population per region (in millions)'
      }
    }
  });

  this.WSConnect();

}

render() {
  return(
    <canvas id="chart"></canvas>
  );
}

}
