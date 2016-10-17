import React, { Component, PropTypes } from 'react';
import GridComponent from './grid.js';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      rows: 20,
      cols: 20
    };
    this.handleRowsChange = this.handleRowsChange.bind(this);
    this.handleColsChange = this.handleColsChange.bind(this);
    this.generate = this.generate.bind(this);
    this.clear = this.clear.bind(this);
  }

  generate() {

  }

  clear() {
    this.setState({
      rows: 20,
      cols: 20
    });
  }

  handleRowsChange(event) {
    this.setState({rows: event.target.value});
  }

  handleColsChange(event) {
    this.setState({cols: event.target.value});
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-6">
            No of Rows :-
            <input type="text" value={this.state.rows} onChange={this.handleRowsChange} />
          </div>
          <div className="col-xs-6">
            No of Columns :-
            <input type="text" value={this.state.cols} onChange={this.handleColsChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            <input type="button" className="btn btn-primary" value="Generate" onClick={this.generate} />
            <input type="button" className="btn btn-primary" value="Clear" onClick={this.clear} />
          </div>
        </div>
        <GridComponent rows={this.state.rows} cols={this.state.cols} />
      </div>
    )
  }
}
export default App;
