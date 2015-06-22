

/*************************************

split the board into new lines
and use map to split each row
into an array of characters,
then use map to convert the characters 
to integers

*************************************/

parseBoard = function(board) {
  return board.split('\n').map(function(row) {
    return row.split('').map(function(num) {
      return +num;
    });
  });
};

/*************************************

look for any value of zero and save 
it to an array.

*************************************/

saveEmptySquares = function(board) {
  //create an empty array to hold the positions
  var emptySquares = [];

  //check every square for a zero
  for (var i = 0; i < board.length; i++) {
    for (var z = 0; z < board.length; z++) {
      //if a zero is found, save it's position in the board
      if(board[i][z] === 0) {
        emptySquares.push([i, z]);
      }
    };
  };
  //return the positions
  return emptySquares;
};

checkRow = function(board, row, value) {
  // Iterate through every value in the row
  for(var i = 0; i < board[row].length; i++) {
    // If a match is found, return false
    if(board[row][i] === value) {
      return false;
    }
  }
  // If no match was found, return true
  return true;
};

//iterate through each column checking for zero
checkColumn = function(board, column, value) {
  for (var i = 0; i < board.length; i++) {

    //if a match is found, return false
    if(board[i][column] === value) {
      return false;
    }
  }
  //if no match is found return true
  return true;
};

/*************************************

figure out the bounds of the 3x3 square
and test each of it's values

*************************************/

check3Square = function(board, column, row, value) {
  //save upper left corner
  var columnCorner = 0,
    rowCorner = 0,
    squareSize = 3;

    //find the left-most column
    while(column >= columnCorner + squareSize) {
      columnCorner += squareSize;
    }

    //find the upper-most row
    while(row >= rowCorner + squareSize) {
      rowCorner += squareSize;
    }

    //iterate through each row
    for(var i = rowCorner; i < rowCorner + squareSize; i++) {
      //iterate through each column
      for(var j = columnCorner; j < columnCorner + squareSize; j++) {
        //return false if a match is found
        if(board[i][j] === value) {
          return false;
        };
      };
    };
    //if no match is found, return true
    return true;
};

/*************************************

combine checkRow, checkColumn, and 
check3Square to see if a value is
valid for a given position

*************************************/

checkValue = function(board, column, row, value) {
  if(this.checkRow(board, row, value) &&
    this.checkColumn(board, column, value) &&
    this.check3Square(board, column, row, value)) {
    return true;
  } else {
    return false;
  }
};

/*************************************

code to solve the test puzzle

*************************************/

solvePuzzle = function(board, emptySquares) {
  //variable to track our position in the solver
  var limit = 9, row, column, value, found;
  for(i = 0; i < emptySquares.length;) {
    row = emptySquares[i][0];
    column = emptySquares[i][1];
    //try next value
    value = board[row][column] + 1;
    //find something?
    found = false;
    /* keep trying new values untile either the limit 
    is reached or we actually find a valid value */
    while(!found && value <= limit) {
      /* if a valid value is found, mark found as true,
      set the position to the value, and move to the next spot */
      if(this.checkValue(board, column, row, value)) {
        found = true;
        board[row][column] = value;
        i++;
      } else {
        value++;
      }
    };
    /* if no valid value is found and the limit
    is reached, move back to the previous position */
    if(!found) {
      board[row][column] = 0;
      i--;
    }
  };
  //if solution is found, log it!
  board.forEach(function(row) {
    console.log(row.join());
  });
  return board;
};

solveSudoku = function(board) {
  var parsedBoard = this.parseBoard(board);
  var emptyPositions = this.saveEmptySquares(parsedBoard);

  return this.solvePuzzle(parsedBoard, emptySquares);
};
