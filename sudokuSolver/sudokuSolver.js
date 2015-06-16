var board = '090000006\n' + 
            '000960485\n' +
            '000581000\n' +
            '004000000\n' +
            '517200900\n' +
            '602000370\n' +
            '100804020\n' +
            '706000810\n' +
            '300090000';

/* ***********************************

split the board into new lines
and use map to split each row
into an array of characters,
then use map to convert the characters 
to integers

 ************************************/

parseBoard = function(board) {
  return board.split('\n').map(function(row) {
    return row.split('').map(function(num) {
      return +num;
    });
  });
};

/* ***********************************

look for any value of zero and save 
it to an array.

 ************************************/

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
    }
  }
  //return the positions
  return emptySquares;
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

 ************************************/

check3Square = function(board, column, row, value) {
  //save upper left corner
  var columnCorner = 0,
    row corner = 0,
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
        }
      }
    }
    //if no match is found, return true
    return true;
}




