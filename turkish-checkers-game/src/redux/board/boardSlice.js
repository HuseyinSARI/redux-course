import { createSlice, current } from '@reduxjs/toolkit'

export const boardSlice = createSlice({
    name: "board",
    initialState: {
        board: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
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
            const { x, y } = action.payload.lastLocation
            const newMovementArea = state.stonesMovementAreas.map((row, rowIndex) => {
                return row.map((value, colIndex) => {

                    if (rowIndex >= y - 1 &&
                        rowIndex <= y + 1 &&
                        colIndex >= x - 1 &&
                        colIndex <= x + 1) {
                        value = 1
                    } else {
                        value = 0
                    }

                    return value;
                })
            });
            state.stonesMovementAreas = newMovementArea;
        },
    },
})


const moveEverywhere = ({board}) => {
    console.log(board);
}

export default boardSlice.reducer;
export const { click } = boardSlice.actions;