import React, { Component, PropTypes } from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import s from './css/grid.scss';

class GridComponent extends Component {

  constructor(props) {
    super(props);
    this.initGrid = this.initGrid.bind(this);
    this.generate = this.generate.bind(this);
    this.stop = this.stop.bind(this);
    this.clickableGrid = this.clickableGrid.bind(this);
    this.gridArr = [];
    this.generateTimeout = null;
  }

  initGrid(rows, columns) {
    var newRows = parseInt(rows, 10);
    var newCols = parseInt(columns, 10);
    if(!newRows || !newCols){
      return;
    }
    this.gridArr = [];
    var grid = this.clickableGrid(newRows,newCols);
    var existingGrid = document.getElementById('grid');
    if(existingGrid) {
      existingGrid.remove();
    }
    document.body.appendChild(grid); 
  }

  clickableGrid( rows, cols, callback ){
    
    // storage in grids [ [0,1,2,3], [0,1,2,3] ]
    var grid = document.createElement('table');
    grid.className = 'grid';
    grid.id = 'grid';
    for (var row = 0; row < rows; ++row){
      this.gridArr[row] = [];
        var tr = grid.appendChild(document.createElement('tr'));
        for (var col = 0; col < cols; ++col){
            this.gridArr[row][col] = 0; // by default set as 0 , if clicked set as 1
            
            var td = document.createElement('td');
            td.id = "cell" + row + "" + col;
            var cell = tr.appendChild(td);
            var self = this;
            cell.addEventListener('click',(function(row,col){
                return function(event){
                  event.target.className = event.target.className === 'clicked' ? 'unclicked' : 'clicked';
                  self.gridArr[row][col] = self.gridArr[row][col] === 1 ? 0 : 1;
                  console.log(self.gridArr);
                }
            })(row,col));
        }
    }
    return grid;
  }

  componentDidMount() {
    this.initGrid(20, 20);
  }

  componentWillReceiveProps(props) {
    console.log(props);
    this.initGrid(props.rows, props.cols);
  }

  generate() {
    
    var oldGridArr = this.gridArr.slice();
    for(var i=0;i<oldGridArr.length;i++) {
      var gridRow = this.gridArr[i];
      for(var j=0;j<gridRow.length;j++) {
        
        // conway logic
        // 1. If the cell is alive, then it stays alive if it has either 2 or 3 live neighbors
        // 2. If the cell is dead, then it springs to life only in the case that it has 3 live neighbors
        // find cell adjacent values;
        var adjacentCells = ['oldGridArr[i][j+1]', 'oldGridArr[i][j-1]', 'oldGridArr[i+1][j]', 'oldGridArr[i+1][j+1]','oldGridArr[i+1][j-1]', 'oldGridArr[i-1][j]', 'oldGridArr[i-1][j-1]', 'oldGridArr[i-1][j+1]'];

        var adjacentValues = [];
        for(var k=0;k<adjacentCells.length;k++) {
          try {
            var adjacentVal = eval(adjacentCells[k]);
            if(adjacentVal) {
              adjacentValues.push(adjacentVal);
            }
          }catch(e) {
          }
        }
        
        var neighbourCellAlive = adjacentValues.length;
        if(oldGridArr[i][j]) {
          this.gridArr[i][j] = neighbourCellAlive == 2 || neighbourCellAlive == 3 ? 1 : 0; // 1st condition
        } else {
          this.gridArr[i][j] = neighbourCellAlive == 3 ? 1 : 0;
        }

        var elem = document.getElementById("cell" + i + "" + j);
        if(this.gridArr[i][j]) {  
          elem.className = 'clicked';
        } else {
          elem.className = 'unclicked';
        }

      }
      
    }

    // settimeout 2000 to see the effect
    this.generateTimeout = setTimeout(function() {
      console.log('Waiting for next generation');
      this.generate();
    }.bind(this), 3000);
  }

  stop() {
    clearTimeout(this.generateTimeout);
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-6">
          <input type="button" className="btn btn-primary" value="Stop" onClick={this.stop} />
          <input type="button" className="btn btn-primary" value="Generate" onClick={this.generate} />
        </div>
      </div>
    )
  }
};

export default GridComponent;
