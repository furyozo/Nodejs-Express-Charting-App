import React from 'react';
import ReactDOM from 'react-dom';

import Chart from './Chart.jsx';

export default class ChartContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {inputCount: 3};
    this.inputarr = [];
    for (var i = 0; i < this.state.inputCount; i++) {
      this.inputarr.push(1);
    }
  }

  componentDidMount() {
    document.getElementById("chart").innerHTML = "zop";
  }

  inputChange() {
    var inputs = document.getElementsByClassName('poll-input');
    var counter = 0;
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value) {
        counter++;
      }
    }
    if (counter === this.state.inputCount) {
      this.inputarr.push(1);
      this.setState({ inputCount: this.state.inputCount+1 });
    }
  }

  render() {
    return(
      <div>
        {/* chart react element */}
        <Chart />
        {/* input a new stock */}
        <form action="/stock/add" method="post" acceptCharset="UTF-8" role="form">
          <div className="form-group">
            <input className="form-control" placeholder="Stock code ..." name="name" type="text" />
          </div>
          <div className="form-group">
            <button className="btn btn-lg btn-default" type="submit" name="button">Add</button>
          </div>
        </form>
      </div>
    );
  }

}

var target = document.getElementById('app');
if (target) {
  ReactDOM.render(<ChartContainer />,  document.getElementById('app'));
}
