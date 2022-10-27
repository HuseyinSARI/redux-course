import {configureStore} from "@reduxjs/toolkit"

import charactersSlice from "./charactersSlice";
import quotesSlice from "./quotesSlice";
import deathsSlice from "./deathsSlice";

export const store = configureStore({
    reducer:{
        characters: charactersSlice,
        quotes: quotesSlice,
        deaths: deathsSlice,
    }
});