import React from 'react';
import ReactDOM from 'react-dom';
import Chartjs from 'chart.js';

export default class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.chart;
  }

  renderChart() {

    var stocks = this.props.stocks;
    console.log("chart itself: ");
    console.log(stocks);
    console.log("/chart itself: ");

    var canvas = document.getElementById("chart");
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chartjs(canvas, {
      type: 'line',
      data: {
        labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
        datasets: stocks
      },
      options: {
        title: {
          display: true,
          text: 'Stock data of selected companies'
        }
      }
    });

  }

  componentDidUpdate() {
    this.renderChart();
  }

  handleClick() {
    console.log(this.props.stocks);
    this.renderChart();
  }

  // gets called after the componnent was mounted
  componentDidMount() {
    var Chart = this;
    window.onresize = function(event) {
      Chart.renderChart();
    };
    this.renderChart();
  }

render() {
  return(
    <div>
      <canvas id="chart"></canvas>
      {/*<button onClick={this.handleClick}>asd</button>*/}
    </div>
  );
}

}
