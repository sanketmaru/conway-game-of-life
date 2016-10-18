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

        el.className= el.className === 'clicked' ? 'unclicked' : 'clicked';

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
        for (var row = 0; row < rows; ++row){
            var tr = grid.appendChild(document.createElement('tr'));
            for (var col = 0; col < cols; ++col){
                var td = document.createElement('td');
                td.id = row + "" + col;

                // pseudo code :-

                // 1. From current row select the parent row and the next row and each cell will have a unique id.
                // 2. From the id , deduct the no of cols to reach to its adjacent top , -1 to left top diagonal , +1 to right top diagonal.
                // 3. Frm the id in #1 , add the no of cols to reach to its adj btm , -1 to left btm diag, +1 to right btm diag.
                // 4. repeat this process for all the cells at the same time and generate a new board and remove the existing one.
                // 4.a store the existing one in pouchdb so history of generations can be shown , from pouch store to couch. // offline storeage.
                
                var parentArr = [];
                var siblingsArr = [];
                var childrensArr = [];
                var parentRow, childRow;

                if(row > 0) {
                  parentRow = row - 1;
                  childRow = row + 1;
                }

                for(var i=0 ;i<=col;i++) {

                }

                var neighbours = {
                  parent : [], // diagonal , top
                  siblings : [], // sides
                  childrens : [] // diagonal , bottom
                }
                var cell = tr.appendChild(td);
                ++i;
                cell.addEventListener('click',(function(el,row,col,i){
                    return function(){
                        callback(el,row,col,i);
                    }
                })(cell,row,col,i),false);
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
