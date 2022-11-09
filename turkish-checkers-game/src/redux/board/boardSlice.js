/* eslint-disable array-callback-return */
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
  let eatenStone = null

  if (lastX === newX) {
    if (lastY > newY) [lastY, newY] = [newY, lastY];
    for (let index = lastY + 1; index < newY; index++) {
      if (board[index][lastX] !== 0) {
        eatenStone = {
          stone: board[index][lastX],
          x: lastX,
          y: index,
        }
      }
      newBoard[index][lastX] = 0;
    }
  } else {
    if (lastX > newX) [lastX, newX] = [newX, lastX];
    for (let index = lastX + 1; index < newX; index++) {

      if (board[lastY][index] !== 0) {
        eatenStone = {
          stone: board[lastY][index],
          x: index,
          y: lastY,
        }
      }

      newBoard[lastY][index] = 0;
    }
  }
  return { newBoard, eatenStone };
};


const calculateMoveArea = ({ board, location, turn }) => {
  const { x, y } = location;
  const stone = board[y][x];
  let newMoveArea = Array.from(Array(8), _ => Array(8).fill(0));

  if (turn === "white") {
    if (stone === 1) {
      newMoveArea = standardMove({ board, moveArea: newMoveArea, location })
      newMoveArea = standardEatMove({ board, moveArea: newMoveArea, location })
    }
    if (stone === 3) {
      return true;
    }
  }

  if (turn === "black") {
    if (stone === 2) {
      newMoveArea = standardMove({ board, moveArea: newMoveArea, location })
      newMoveArea = standardEatMove({ board, moveArea: newMoveArea, location })
    }
    if (stone === 4) {
      return true;
    }
  }

  // console.log(newMoveArea);

  return newMoveArea;
}

const isForcedMoveExist = ({ board, turn }) => {
  let allStoneMoves = [];

  board.map((row, rowIndex) => {
    row.map((item, colIndex) => {
      let location = { x: colIndex, y: rowIndex }

      if (turn === "white")
        if (item === 1 || item === 3)
          allStoneMoves.push(calculateMoveArea({ board, location, turn }))

      if (turn === "black")
        if (item === 2 || item === 4)
          allStoneMoves.push(calculateMoveArea({ board, location, turn }))

    })
  })

  let forcedMoves = [];

  allStoneMoves.map((first) => {
    first.map((row, rowIndex) => {
      row.map((item, colIndex) => {
        if (item === 2)
          forcedMoves.push({ x: colIndex, y: rowIndex })
      })
    })
  })

  return forcedMoves;

  // console.log(allStoneMoves);
}

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    board: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 2, 0, 0, 0, 0],
      [0, 0, 0, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
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
    turn: "white",
    forcedMoves: [],
    isForced: false,
  },
  reducers: {
    startGame: (state, action) => { },
    click: (state, action) => {
      const location = action.payload.lastLocation;

      state.stonesMovementAreas = calculateMoveArea({
        board: state.board,
        location,
        turn: state.turn
      });

      state.forcedMoves = isForcedMoveExist({
        board: state.board,
        turn: state.turn
      })

      console.log(state.forcedMoves);

      // console.log("board");
      // console.log(current(state.board));
      // console.log("move area");
      // console.log(state.stonesMovementAreas);

    },
    changeBoardLocation: (state, action) => {

      const { lastLocation, newLocation } = action.payload;
      const board = state.board;
      const turn = state.turn;
      state.board = changeLocation({ lastLocation, newLocation, board });

      let { newBoard, eatenStone } = eatStone({ lastLocation, newLocation, board, turn })
      state.board = newBoard

      state.forcedMoves = isForcedMoveExist({
        board: state.board,
        turn: state.turn
      })
      console.log("eaten stone:", eatenStone);

      if (!eatenStone)
        state.turn = state.turn === "white" ? "black" : "white"

      console.log(state.forcedMoves);

      // console.log("board");
      // console.log(state.board);
      // console.log("move area");
      // console.log(current(state.stonesMovementAreas));
      state.stonesMovementAreas = Array.from(Array(8), _ => Array(8).fill(0))
    },
  },
});

export default boardSlice.reducer;
export const { click, changeBoardLocation } = boardSlice.actions;
