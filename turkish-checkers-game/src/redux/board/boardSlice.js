import { createSlice, current } from "@reduxjs/toolkit";

const moveEverywhere = ({ board, moveArea, location }) => {
  const { x, y } = location;
  const newMoveArea = moveArea.map((row, rowIndex) => {
    return row.map((value, colIndex) => {
      value = 0;
      const isStone = board[rowIndex][colIndex];
      if (!isStone) {
        if (rowIndex === y) value = 1;
        if (colIndex === x) value = 1;
      }
      return value;
    });
  });
  return newMoveArea;
};

const standardMove = ({ board, moveArea, location }) => {
  const { x, y } = location;
  let newMoveArea = [...moveArea];
  const stone = board[y][x];

  if (stone === 1)
    if (board[y - 1]?.[x] !== undefined && board[y - 1][x] === 0)
      newMoveArea[y - 1][x] = 1;
  if (stone === 2)
    if (board[y + 1]?.[x] !== undefined && board[y + 1][x] === 0)
      newMoveArea[y + 1][x] = 1;
  if (board[y]?.[x - 1] !== undefined && board[y][x - 1] === 0)
    newMoveArea[y][x - 1] = 1;
  if (board[y]?.[x + 1] !== undefined && board[y][x + 1] === 0)
    newMoveArea[y][x + 1] = 1;

  return newMoveArea;
};

const standardEatMove = ({ board, moveArea, location }) => {
  const { x, y } = location;
  const stone = board[y][x];
  let newMoveArea = [...moveArea];

  if (stone === 1) {
    if (board[y - 1]?.[x] !== undefined && board[y - 1][x] === 2)
      if (board[y - 2]?.[x] !== undefined && board[y - 2][x] === 0)
        newMoveArea[y - 2][x] = 2;

    if (board[y]?.[x - 1] !== undefined && board[y][x - 1] === 2)
      if (board[y]?.[x - 2] !== undefined && board[y][x - 2] === 0)
        newMoveArea[y][x - 2] = 2;

    if (board[y]?.[x + 1] !== undefined && board[y][x + 1] === 2)
      if (board[y]?.[x + 2] !== undefined && board[y][x + 2] === 0)
        newMoveArea[y][x + 2] = 2;
  }


  if (stone === 2) {
    if (board[y + 1]?.[x] !== undefined && board[y + 1][x] === 1)
      if (board[y + 2]?.[x] !== undefined && board[y + 2][x] === 0)
        newMoveArea[y + 2][x] = 2;

    if (board[y]?.[x - 1] !== undefined && board[y][x - 1] === 1)
      if (board[y]?.[x - 2] !== undefined && board[y][x - 2] === 0)
        newMoveArea[y][x - 2] = 2;

    if (board[y]?.[x + 1] !== undefined && board[y][x + 1] === 1)
      if (board[y]?.[x + 2] !== undefined && board[y][x + 2] === 0)
        newMoveArea[y][x + 2] = 2;
  }

  return newMoveArea;
}

// bir taşı bir yerden siler, diğer yere ekler  -- return newBoard
const changeLocation = ({ lastLocation, newLocation, board }) => {
  const { x: lastX, y: lastY } = lastLocation;
  const { x: newX, y: newY } = newLocation;
  const stone = board[lastY][lastX];
  let newBoard = [...board];

  newBoard[lastY][lastX] = 0;
  newBoard[newY][newX] = stone;

  return newBoard;
};

// verilen locasyondaki taşı siler -- return newBoard
const removeOnBoard = ({ location, board }) => {
  const { x, y } = location;
  const newBoard = [...board];
  newBoard[y][x] = 0
  return newBoard;
};

// iki konum arasındaki bütün taşları yer. return newBoard
const eatStone = ({ lastLocation, newLocation, board }) => {
  let { x: lastX, y: lastY } = lastLocation;
  let { x: newX, y: newY } = newLocation;
  const newBoard = [...board];

  if (lastX === newX) {
    if (lastY > newY) [lastY, newY] = [newY, lastY];
    for (let index = lastY + 1; index < newY; index++) {
      newBoard[index][lastX] = 0;
    }
  } else {
    if (lastX > newX) [lastX, newX] = [newX, lastX];
    for (let index = lastX + 1; index < newX; index++) {
      newBoard[lastY][index] = 0;
    }
  }
  return newBoard;
};


const calculateMoveArea = ({ board, location }) => {
  const { x, y } = location;
  const stone = board[y][x];
  let newMoveArea = Array.from(Array(8), _ => Array(8).fill(0));

  if (stone === 1 || stone === 2) {
    newMoveArea = standardMove({ board, moveArea: newMoveArea, location })
    newMoveArea = standardEatMove({ board, moveArea: newMoveArea, location })
  }

  if (stone === 3) {
    return true
  }

  if (stone === 4) {
    return true
  }

  console.log(newMoveArea);

  return newMoveArea;
}


export const boardSlice = createSlice({
  name: "board",
  initialState: {
    board: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 2, 0, 0, 0, 0],
      [0, 0, 0, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    stonesMovementAreas: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  reducers: {
    startGame: (state, action) => { },
    click: (state, action) => {
      const location = action.payload.lastLocation;

      state.stonesMovementAreas = calculateMoveArea({
        board: state.board,
        location,
      });

      // state.stonesMovementAreas = moveEverywhere({ board: state.board, moveArea: state.stonesMovementAreas, location });
    },
    changeBoardLocation: (state, action) => {

      const { lastLocation, newLocation } = action.payload;
      const board = state.board;
      state.board = changeLocation({ lastLocation, newLocation, board });
      state.board = eatStone  ({ lastLocation, newLocation, board })

    },
  },
});

export default boardSlice.reducer;
export const { click, changeBoardLocation } = boardSlice.actions;
