import { createSlice, current } from '@reduxjs/toolkit'

const moveEverywhere = ({ board, moveArea, location }) => {
    const { x, y } = location;
    const newMoveArea = moveArea.map((row, rowIndex) => {
        return row.map((value, colIndex) => {

            value = 0;
            const isStone = board[rowIndex][colIndex];
            if (!isStone) {
                if (rowIndex === y) value = 1;
                if (colIndex === x) value = 1
            }
            return value;
        })
    });
    return newMoveArea;
}

const standardMove = ({ board, moveArea, location }) => {
    const { x, y } = location;
    let newMoveArea = [...moveArea];
    const stone = board[y][x];

    if (stone === 1)
        if (board[y - 1]?.[x] !== undefined && board[y - 1][x] === 0) newMoveArea[y - 1][x] = 1;
    if (stone === 2)
        if (board[y + 1]?.[x] !== undefined && board[y + 1][x] === 0) newMoveArea[y + 1][x] = 1;
    if (board[y]?.[x - 1] !== undefined && board[y][x - 1] === 0) newMoveArea[y][x - 1] = 1;
    if (board[y]?.[x + 1] !== undefined && board[y][x + 1] === 0) newMoveArea[y][x + 1] = 1;

    console.log(newMoveArea);

    return newMoveArea;
}

// bir taşı bir yerden siler, diğer yere ekler
const changeLocation = ({ lastLocation, newLocation, board }) => {
    const { x: lastX, y: lastY } = lastLocation;
    const { x: newX, y: newY } = newLocation;
    const stone = board[lastY][lastX]
    let newBoard = [...board];

    newBoard[lastY][lastX] = 0;
    newBoard[newY][newX] = stone;

    // console.log(newBoard);

    return newBoard;
}

const removeOnBoard = ({ location, board }) => {
    const { x, y } = location;
    const newBoard = [...board];
    return newBoard[y][x] = 0;
}

// iki konum arasındaki bütün taşları yer. geriye yeni board döndürür
const eatStone = ({ lastLocation, newLocation, board }) => {

    let { x: lastX, y: lastY } = lastLocation;
    let { x: newX, y: newY } = newLocation;
    const newBoard = [...board];

    if (lastX === newX) {
        if (lastY > newY) [lastY, newY] = [newY, lastY]
        for (let index = lastY + 1; index < newY; index++) {
            newBoard[index][lastX] = 0
        }
    } else {
        if (lastX > newX) [lastX, newX] = [newX, lastX]
        for (let index = lastX + 1; index < newX; index++) {
            newBoard[lastY][index] = 0
        }
    }
    return newBoard;
}

export const boardSlice = createSlice({
    name: "board",
    initialState: {
        board: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
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
        ]
    },
    reducers: {
        startGame: (state, action) => {

        },
        click: (state, action) => {
            const location = action.payload.lastLocation
            state.stonesMovementAreas = standardMove({ board: state.board, moveArea: state.stonesMovementAreas, location });

            // state.stonesMovementAreas = moveEverywhere({ board: state.board, moveArea: state.stonesMovementAreas, location });
        },
        changeBoardLocation: (state, action) => {
            const { lastLocation, newLocation } = action.payload;
            const board = state.board;
            state.board = changeLocation({ lastLocation, newLocation, board });
            state.stonesMovementAreas = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]
        }
    },
})

export default boardSlice.reducer;
export const { click, changeBoardLocation } = boardSlice.actions;


// const newMovementArea = state.stonesMovementAreas.map((row, rowIndex) => {
//     return row.map((value, colIndex) => {

//         if (rowIndex >= y - 1 &&
//             rowIndex <= y + 1 &&
//             colIndex >= x - 1 &&
//             colIndex <= x + 1) {
//             value = 1
//         } else {
//             value = 0
//         }

//         return value;
//     })
// });
// state.stonesMovementAreas = newMovementArea;