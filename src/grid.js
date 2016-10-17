import React, { Component, PropTypes } from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import s from './css/grid.scss';

class GridComponent extends Component {

  constructor(props) {
    super(props);
    this.initGrid = this.initGrid.bind(this);
  }

  initGrid(rows, columns) {
    var newRows = parseInt(rows, 10);
    var newCols = parseInt(columns, 10);
    if(!newRows || !newCols){
      return;
    }
    var lastClicked;
    var grid = clickableGrid(newRows,newCols,function(el,row,col,i){
        console.log("You clicked on element:",el);
        console.log("You clicked on row:",row);
        console.log("You clicked on col:",col);
        console.log("You clicked on item #:",i);

        el.className='clicked';

        lastClicked = el;
    });
    var existingGrid = document.getElementById('grid');
    if(existingGrid) {
      existingGrid.remove();
    }
    document.body.appendChild(grid);


    function clickableGrid( rows, cols, callback ){
        var i=0;
        var grid = document.createElement('table');
        grid.className = 'grid';
        grid.id = 'grid';
        for (var r=0;r<rows;++r){
            var tr = grid.appendChild(document.createElement('tr'));
            for (var c=0;c<cols;++c){
                var cell = tr.appendChild(document.createElement('td'));
                ++i;
                cell.addEventListener('click',(function(el,r,c,i){
                    return function(){
                        callback(el,r,c,i);
                    }
                })(cell,r,c,i),false);
            }
        }
        return grid;
    }
  }

  componentDidMount() {
    this.initGrid(20, 20);
  }

  componentWillReceiveProps(props) {
    console.log(props);
    this.initGrid(props.rows, props.cols);
  }

  render() {
    return (
        false
    )
  }
};

export default GridComponent;
