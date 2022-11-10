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

const kingMove = ({ board, moveArea, location }) => {
  const { x, y } = location;
  let newMoveArea = [...moveArea];
  const stone = board[y][x];
  let stonesOnWay = [];

  for (let index = y - 1; index >= 0; index--) {
    const stoneOnBoard = board[index][x];
    if (stoneOnBoard > 0) {
      stonesOnWay.push({
        direction: "up",
        stone:
        {
          type: stoneOnBoard,
          x: x,
          y: index
        }
      })
      break;
    }
    newMoveArea[index][x] = 1;
  }
  for (let index = y + 1; index <= 7; index++) {
    const stoneOnBoard = board[index][x];
    if (stoneOnBoard > 0) {
      stonesOnWay.push({
        direction: "down",
        stone:
        {
          type: stoneOnBoard,
          x: x,
          y: index
        }
      })
      break;
    }
    newMoveArea[index][x] = 1;
  }
  for (let index = x - 1; index >= 0; index--) {
    const stoneOnBoard = board[y][index];
    if (stoneOnBoard > 0) {
      stonesOnWay.push({
        direction: "left",
        stone:
        {
          type: stoneOnBoard,
          x: index,
          y: y
        }
      })
      break;
    }
    newMoveArea[y][index] = 1;
  }
  for (let index = x + 1; index <= 7; index++) {
    const stoneOnBoard = board[y][index];
    if (stoneOnBoard > 0) {
      stonesOnWay.push({
        direction: "right",
        stone:
        {
          type: stoneOnBoard,
          x: index,
          y: y
        }
      })
      break;
    }
    newMoveArea[y][index] = 1;
  }

  return { newMoveArea, stonesOnWay };
}

const kingEatMove = ({ board, moveArea, location, stonesOnWay }) => {
  const { x, y } = location;
  let newMoveArea = [...moveArea];
  const stone = board[y][x];
  let newStonesOnWay = [...stonesOnWay]
  let stoneColor;
  if (stone === 1 || stone === 3)
    stoneColor = "white";
  if (stone === 2 || stone === 4)
    stoneColor = "black"

  newStonesOnWay = newStonesOnWay.filter(item => {
    // console.log("item.stone.type",item.stone.type);
    let stoneOnWayColor;
    if (item.stone.type % 2 === 1) {
      stoneOnWayColor = "white"
    } else {
      stoneOnWayColor = "black"
    }
    if (stoneOnWayColor !== stoneColor)
      return item;
  })

  newStonesOnWay.map((stoneOnWay) => {
    switch (stoneOnWay.direction) {
      case "up":
        if (stoneOnWay.stone.y - 1 >= 0) {
          for (let index = stoneOnWay.stone.y - 1; index >= 0; index--) {
            if (board[index][stoneOnWay.stone.x] === 0)
              newMoveArea[index][stoneOnWay.stone.x] = 2
            else
              break
          }
        }
        break;
      case "down":
        if (stoneOnWay.stone.y + 1 <= 7) {
          for (let index = stoneOnWay.stone.y + 1; index <= 7; index++) {
            if (board[index][stoneOnWay.stone.x] === 0)
              newMoveArea[index][stoneOnWay.stone.x] = 2
            else
              break
          }
        }
        break;
      case "left":
        if (stoneOnWay.stone.x - 1 >= 0) {
          for (let index = stoneOnWay.stone.x - 1; index >= 0; index--) {
            if (board[stoneOnWay.stone.y][index] === 0)
              newMoveArea[stoneOnWay.stone.y][index] = 2
            else
              break
          }
        }
        break;
      case "right":
        if (stoneOnWay.stone.x + 1 <= 7) {
          for (let index = stoneOnWay.stone.x + 1; index <= 7; index++) {
            if (board[stoneOnWay.stone.y][index] === 0)
              newMoveArea[stoneOnWay.stone.y][index] = 2
            else
              break
          }
        }
        break;


      default:
        break;
    }
  })

  return newMoveArea;
}


// bir taşı bir yerden siler, diğer yere ekler  -- return newBoard
const changeLocation = ({ lastLocation, newLocation, board }) => {
  const { x: lastX, y: lastY } = lastLocation;
  const { x: newX, y: newY } = newLocation;
  const stone = board[lastY][lastX];
  let newBoard = [...board];

  newBoard[lastY][lastX] = 0;

  // console.log(newY, newX);

  if ((newY === 0 || newY === 7) && (stone === 1 || stone === 2)) {
    if (stone === 1 && newY === 0)
      newBoard[newY][newX] = 3;

    if (stone === 2 && newY === 7)
      newBoard[newY][newX] = 4;
  } else {
    newBoard[newY][newX] = stone;
  }

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
      newMoveArea = kingMove({ board, moveArea: newMoveArea, location }).newMoveArea
      let stonesOnWay = kingMove({ board, moveArea: newMoveArea, location }).stonesOnWay

      newMoveArea = kingEatMove({ board, moveArea: newMoveArea, location, stonesOnWay })
    }
  }

  if (turn === "black") {
    if (stone === 2) {
      newMoveArea = standardMove({ board, moveArea: newMoveArea, location })
      newMoveArea = standardEatMove({ board, moveArea: newMoveArea, location })
    }
    if (stone === 4) {
      newMoveArea = kingMove({ board, moveArea: newMoveArea, location }).newMoveArea

      let stonesOnWay = kingMove({ board, moveArea: newMoveArea, location }).stonesOnWay

      newMoveArea = kingEatMove({ board, moveArea: newMoveArea, location, stonesOnWay })
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
}

const isForcedMoveExistForOneStone = ({ board, turn, location }) => {
  const stone = board[location.y][location.x];
  let stoneMoves = []
  if (turn === "white")
    if (stone === 1 || stone === 3)
      stoneMoves = calculateMoveArea({ board, location, turn })

  if (turn === "black")
    if (stone === 2 || stone === 4)
      stoneMoves = calculateMoveArea({ board, location, turn })

  let forcedMoves = [];

  stoneMoves.map((row, rowIndex) => {
    row.map((item, colIndex) => {
      if (item === 2)
        forcedMoves.push({ x: colIndex, y: rowIndex })
    })
  })

  return forcedMoves;
}



export const boardSlice = createSlice({
  name: "board",
  initialState: {
    board: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
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
    isStoneEaten: false,
    locationLastMovingStone: {},
  },
  reducers: {
    test: (state, action) => {
      // kingMove({board:state.board,moveArea:state.stonesMovementAreas,location})
    },
    startGame: (state, action) => { },
    click: (state, action) => {
      const location = action.payload.lastLocation;

      state.stonesMovementAreas = calculateMoveArea({
        board: state.board,
        location,
        turn: state.turn
      });

      if (state.isStoneEaten) {
        state.forcedMoves = isForcedMoveExistForOneStone({ board: state.board, turn: state.turn, location: state.locationLastMovingStone })
      } else {
        state.forcedMoves = isForcedMoveExist({ board: state.board, turn: state.turn })
      }

      // console.log("forcedMoves", state.forcedMoves);

    },
    changeBoardLocation: (state, action) => {

      const { lastLocation, newLocation } = action.payload;
      const board = state.board;
      const turn = state.turn;
      state.board = changeLocation({ lastLocation, newLocation, board });
      state.locationLastMovingStone = newLocation;

      let { newBoard, eatenStone } = eatStone({ lastLocation, newLocation, board, turn })
      state.board = newBoard

      if (eatenStone) {
        state.forcedMoves = isForcedMoveExistForOneStone({ board, turn, location: newLocation })
        state.isStoneEaten = true;
      } else {
        state.forcedMoves = isForcedMoveExist({ board: state.board, turn: state.turn })
        state.isStoneEaten = false;
      }


      console.log("eatenStone", eatenStone);
      console.log("forcedMoves", state.forcedMoves);
      if (!eatenStone || state.forcedMoves.length === 0){
        state.turn = state.turn === "white" ? "black" : "white"
        state.isStoneEaten = false;
      }

    },
  },
});

export default boardSlice.reducer;
export const { click, changeBoardLocation, test } = boardSlice.actions;


