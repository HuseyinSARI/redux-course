import { createSlice , createEntityAdapter} from '@reduxjs/toolkit'

export const cardsAdapter = createEntityAdapter();

const initialState = cardsAdapter.getInitialState();
export const cardsSelectors = cardsAdapter.getSelectors(state => state.cards);


export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCards : cardsAdapter.addMany,
    updateCard: cardsAdapter.updateOne,
    updateCards: cardsAdapter.updateMany,
  },
  extraReducers:{

  }
})

// Action creators are generated for each case reducer function
export const { addCards,updateCard,updateCards } = cardsSlice.actions

export default cardsSlice.reducer