import React from 'react';
import ReactDOM from 'react-dom';

import Chart from './Chart.jsx';

export default class ChartContainer extends React.Component {

  // chart container constructor
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeStock = this.removeStock.bind(this);
    this.stocks = [];
    this.inputValue = '';
  }

  // ask the server for new data every 5 seconds to synchronize charts across all clients
  getStockData() {
    var ws = new WebSocket('ws://localhost:8080');
    // event emmited when connected
    ws.onopen = function () {
      console.log('websocket is connected ...');
      // sending a send event to websocket server
      ws.send(JSON.stringify({
        type: "stock/all/get"
      }));
    }
    // event emmited when receiving message
    var React = this;
    ws.onmessage = function (ev) {
      var stocks = JSON.parse(ev.data);
      React.stocks = stocks;
      React.forceUpdate();
    }
  }

  // connect to the web sockets server and get stock data before mounting
  componentWillMount() {
    var ws = new WebSocket('ws://localhost:8080');
    // event emmited when connected
    ws.onopen = function () {
      console.log('websocket is connected ...');
      // sending a send event to websocket server
      ws.send(JSON.stringify({
        type: "stock/all/get"
      }));
    }
    // event emmited when receiving message
    var React = this;
    ws.onmessage = function (ev) {
      var stocks = JSON.parse(ev.data);
      React.stocks = stocks;
      React.forceUpdate();
    }
  }

  // connect to the web sockets server and get new stock data on update
  handleSubmit(e) {
    e.preventDefault();
    var ws = new WebSocket('ws://localhost:8080');
    var input = this.inputValue;
    // event emmited when connected
    ws.onopen = function () {
      console.log('websocket is connected ...')
      // sending a send event to websocket server
      ws.send(JSON.stringify({
        type: "stock/add",
        value: input
      }));
    }
    // event emmited when receiving message
    var React = this;
    ws.onmessage = function (ev) {
      var stocks = JSON.parse(ev.data);
      React.stocks = stocks;
      React.forceUpdate();
    }
  }

  // on input change, save the input text value as ChartContainer component attribute
  handleChange(e) {
    this.inputValue = e.target.value;
  }

  // remove stock from the server using web sockets
  removeStock(code) {
    var ws = new WebSocket('ws://localhost:8080');
    // event emmited when connected
    ws.onopen = function () {
      console.log('websocket is connected ...');
      // sending a send event to websocket server
      ws.send(JSON.stringify({
        type: "stock/remove",
        value: code
      }));
    }
    // event emmited when receiving message
    var React = this;
    ws.onmessage = function (ev) {
      var stocks = JSON.parse(ev.data);
      React.stocks = stocks;
      React.forceUpdate();
    }
  }

  // ChartContainer render method
  render() {
    return(
      <div>
        {/* chart react element */}
        <Chart stocks={this.stocks}/>
        {/* input a new stock */}
        <div className="row">

          {this.stocks.map(function(obj, i) {
            return (
              <div className="col-xs-12 col-sm-6 col-md-4" key={i}>
                <br/>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    {obj.label}
                    <button className="btn btn-default btn-xs pull-right panel-button" onClick={() => this.removeStock(obj.code)}>
                      <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </button>
                  </div>
                  <div className="panel-body">
                    <p>
                      <b>Current value: </b>
                      {obj.data[obj.data.length-2]}
                    </p>
                    <p>
                      <b>Code: </b>
                      {obj.code}
                    </p>
                  </div>
                </div>
              </div>
            )
          },this)}

          <div className="col-xs-12 col-sm-6 col-md-4">
            <br/>
            <div className="panel panel-default">
              <div className="panel-heading">
                Add a new stock by code
              </div>
              <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input className="form-control" placeholder="Stock code ..." type="text" onChange={this.handleChange} value={this.state.CodeValue}/>
                  </div>
                  <button className="btn btn-default">Add</button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

}

var target = document.getElementById('app');
if (target) {
  ReactDOM.render(<ChartContainer />,  document.getElementById('app'));
}
