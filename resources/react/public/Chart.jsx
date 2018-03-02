import React from 'react';
import ReactDOM from 'react-dom';
import Chartjs from 'chart.js';

export default class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.props.stocks);
  }

  // gets called after the componnent was mounted
  componentDidMount() {

    var stocks = this.props.stocks;
    console.log(stocks);

    var container = document.getElementById("chart");
    container.innerHTML = "";
    new Chartjs(container, {
      type: 'line',
      data: {
        labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
        datasets: [{
          data: [86,114,106,106,107,111,133,221,783,2478, 1],
          label: "Africa",
          borderColor: "#3e95cd",
          fill: false
        }, {
          data: [282,350,411,502,635,809,947,1402,3700,5267, 2],
          label: "Asia",
          borderColor: "#8e5ea2",
          fill: false
        }
      ]},
      options: {
        title: {
          display: true,
          text: 'Stock data of selected companies'
        }
      }
    });

  }

render() {
  return(
    <div>
      <canvas id="chart"></canvas>
      <button onClick={this.handleClick}>asd</button>
    </div>
  );
}

}
