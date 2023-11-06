/**
 * @fileoverview Game helper functions
 * functions to build the connect four logic
 */

function createBoard(column, rows) {
  const board = [];

  for (let i = 1; i <= column; i++) {
    board.push(new Array(rows).fill(null));
  }

  return board;
}

/**
 * Returns the index of the first available row in the specified column of the board.
 * @param {Array} board - The game board represented as a 2D array of numbers.
 * @param {number} column - The index of the column to check for available rows.
 * @returns {?number} - The index of the first available row in the column, or null if the column is full.
 */
function getAvailableRow(board, column) {
  for (let i = board.length - 1; i >= 1; i--) {
    if (!board[i][column]) {
      return i;
    }
  }

  return null;
}

function checkForWin(board) {
  // Check for horizontal wins
  for (let i = 0; i < board.length; i++) {
    const row = board[i];

    for (let j = 0; j < row.length - 3; j++) {
      const cell = row[j];

      if (cell && cell === row[j + 1] && cell === row[j + 2] && cell === row[j + 3]) {
        return cell;
      }
    }
  }

  // Check for vertical wins
  for (let i = 0; i < board.length - 3; i++) {
    const row = board[i];

    for (let j = 0; j < row.length; j++) {
      const cell = row[j];

      if (cell && cell === board[i + 1][j] && cell === board[i + 2][j] && cell === board[i + 3][j]) {
        return cell;
      }
    }
  }

  // Check for diagonal wins
  for (let i = 0; i < board.length - 3; i++) {
    const row = board[i];

    for (let j = 0; j < row.length - 3; j++) {
      const cell = row[j];

      if (cell && cell === board[i + 1][j + 1] && cell === board[i + 2][j + 2] && cell === board[i + 3][j + 3]) {
        return cell;
      }
    }
  }

  for (let i = 0; i < board.length - 3; i++) {
    const row = board[i];

    for (let j = 3; j < row.length; j++) {
      const cell = row[j];

      if (cell && cell === board[i + 1][j - 1] && cell === board[i + 2][j - 2] && cell === board[i + 3][j - 3]) {
        return cell;
      }
    }
  }

  return null;
}

export {
  createBoard,
  getAvailableRow,
  checkForWin,
};