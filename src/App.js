import './App.css';


import React, { Component } from 'react'

export default class App extends Component {
  state = {
    hour: 0,
    minute: 0,
    second: 0,
    interval: "",
    disabled: false,
    intervals: [],
  };
  startCount = () => {
    let a = setInterval(() => {
      const { hour, minute, second } = this.state;
      if (second === 59) {
        if (minute === 59) {
          this.setState({
            hour: hour + 1,
            minute: 0,
          });
        } else {
          this.setState({
            minute: minute + 1,
            second: 0,
          });
        }
      } else {
        this.setState({
          second: second + 1,
        });
      }
    }, 100);
    this.setState({
      interval: a,
      disabled: true,
    });
  };
  stopCount = () => {
    clearInterval(this.state.interval);
    this.setState({
      disabled: false,
    });
  };
  resetCount = () => {
    clearInterval(this.state.interval);
    this.setState({
      second: 0,
      minute: 0,
      hour: 0,
      disabled: false,
    });
  };
  saveInterval = () => {
    const { second, minute, hour, intervals } = this.state;
    intervals.push(hour + " : " + minute + " : " + second);
    this.setState({
      intervals,
    });
  };
  render() {
    const { hour, minute, second, disabled, intervals } = this.state;
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 offset-3">
            <div className="card">
              <div className="card-header">
                <h1 className="text-center">Stopwatch</h1>
              </div>
              <div className="card-body">
                <h2 className="text-center">
                  {hour}:{minute}:{second}
                </h2>
              </div>
              <div className="card-footer text-center">
                <button
                  className="btn btn-primary m-2"
                  onClick={this.startCount}
                  disabled={disabled}
                >
                  start
                </button>
                <button className="btn btn-danger m-2" onClick={this.stopCount}>
                  stop
                </button>
                <button className="btn btn-info m-2" onClick={this.resetCount}>
                  reset
                </button>
                <button
                  className="btn btn-success m-2"
                  onClick={this.saveInterval}
                >
                  interval
                </button>
              </div>
              {intervals.map((item, index) => {
                return (
                  <div key={index}>
                    <p className="m-2 text-center text-success fs-4">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

