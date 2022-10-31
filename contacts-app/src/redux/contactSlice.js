import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

export const contactAdaptor = createEntityAdapter();
const initialState = contactAdaptor.getInitialState();

const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        addContact: contactAdaptor.addOne,
        addContacts: contactAdaptor.addMany,
    }
})

export const { addContact, addContacts } = contactSlice.actions;

export default contactSlice.reducer;