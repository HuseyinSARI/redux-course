import { createSlice} from '@reduxjs/toolkit'

import { cardList } from '../data/data';

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    items: cardList,
    compareArea: [],
    score: 0,
  },
  reducers: {
    openCard: (state, action) => {
      let selectedId = action.payload.id;
      let selectedCard = state.items.find(item => item.id === selectedId)

      let isAlreadyArea = state.compareArea.find(item => item.id === selectedCard.id)
      if (!isAlreadyArea && state.compareArea.length < 2 && !selectedCard.isMatch) {
        selectedCard.isOpen = true;
        state.compareArea.push(selectedCard);
      }
    },
    compare: (state, action) => {
      let cardFirst = state.compareArea[0];
      let cardSecond = state.compareArea[1];

      let itemFirst = state.items.find(item => item.id === cardFirst.id);
      let itemSecond = state.items.find(item => item.id === cardSecond.id);

      if (cardFirst.name === cardSecond.name) {
        itemFirst.isMatch = true;
        itemSecond.isMatch = true;
        state.score += 50;
      } else {
        itemFirst.isOpen = false;
        itemSecond.isOpen = false;
        state.score -= 10;
      }
      state.compareArea = [];

    },
    close: (state, action) => {
      let selectedId = action.payload.id;
      let selectedCard = state.items.find(item => item.id === selectedId)

      selectedCard.isOpen = false;
    }
  }
})

export const { compare, openCard, close } = cardsSlice.actions

export default cardsSlice.reducer