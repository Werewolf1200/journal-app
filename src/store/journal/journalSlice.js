import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        setNotes: (state, action) => {
            
        },
        setSaving: (state, action) => {
            
        },
        updateNote: (state, action) => {
            
        },
        deleteNote: (state, action) => {
            
        },
    }
})

export const { addNewNote, setActiveNote, setNotes, setSaving, updateNote, deleteNote, savingNewNote } = journalSlice.actions;