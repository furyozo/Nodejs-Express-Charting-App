import React from 'react';
import ReactDOM from 'react-dom';

import Chart from './Chart.jsx';

export default class ChartContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inputValue = '';
    // this.ws = new WebSocket('ws://localhost:8080');
  }

  // connect to the web sockets server
  WSConnect() {
    var ws = new WebSocket('ws://localhost:8080');
    var message = this.inputValue;
    // event emmited when connected
    ws.onopen = function () {
      console.log('websocket is connected ...')
      // sending a send event to websocket server
      ws.send(message)
    }
    // event emmited when receiving message
    ws.onmessage = function (ev) {
      console.log(ev);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.inputValue);
    this.WSConnect();
    // this.WSSend("connected");
  }

  handleChange(e) {
    this.inputValue = e.target.value;
  }

  render() {
    return(
      <div>
        {/* chart react element */}
        <Chart />
        {/* input a new stock */}
        <div className="row">
          <div className="col-xs-12 col-sm-6">

            <br/>
            <div className="panel panel-default">
              <div className="panel-heading">
                Stock info ...
                <button className="btn btn-default btn-xs pull-right panel-button">
                  <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
              </div>
              <div className="panel-body">
                random data ...
              </div>
            </div>

          </div>
          <div className="col-xs-12 col-sm-6">

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
