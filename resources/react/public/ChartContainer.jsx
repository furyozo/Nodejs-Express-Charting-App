import React from 'react';
import ReactDOM from 'react-dom';

import Chart from './Chart.jsx';

export default class ChartContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.ws = new WebSocket('ws://localhost:8080');
  }

  // connect to the web sockets server
  // WSSend(str) {
  //   console.log
  //   // event emmited when connected
  //   this.ws.onopen = function () {
  //     console.log('websocket is connected ...')
  //     // sending a send event to websocket server
  //     ws.send(str)
  //   }
  //   // event emmited when receiving message
  //   this.ws.onmessage = function (ev) {
  //     console.log(ev);
  //   }
  // }

  handleSubmit(e) {
    e.preventDefault();
    console.log("got here");
    // this.WSSend("connected");
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
              <div className="panel-heading">Stock info ...</div>
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
                <button className="btn btn-default btn-xs pull-right">
                  <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
              </div>
              <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input className="form-control" placeholder="Stock code ..." type="text" value={this.state.CodeValue}/>
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
